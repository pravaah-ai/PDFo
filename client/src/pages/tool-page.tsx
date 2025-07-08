import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { ToolFooter } from "@/components/tool-footer";
import { ToolHero } from "@/components/tool-hero";
import { UploadSection } from "@/components/upload-section";
import { ProcessingStates } from "@/components/processing-states";
import { BatchProcessing } from "@/components/batch-processing";
import { DonateButton } from "@/components/donate-button";
import { AdSenseAd } from "@/components/adsense-ad";
import { Button } from "@/components/ui/button";
import { getToolConfig } from "@/lib/tools-config";
import { createPdfJob, createBatchPdfJobs, pollJobStatus, pollBatchJobsStatus, downloadPdfFile } from "@/lib/pdf-api";
import { trackPageView, trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { WandSparkles, ArrowLeft, Coffee } from "lucide-react";
import { Link } from "wouter";

interface ToolPageProps {
  toolType: string;
}

interface BatchJob {
  jobId: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  errorMessage?: string;
}

export default function ToolPage({ toolType }: ToolPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processingState, setProcessingState] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  const [batchMode, setBatchMode] = useState(false);
  const [batchJobs, setBatchJobs] = useState<BatchJob[]>([]);
  
  const { toast } = useToast();
  const toolConfig = getToolConfig(toolType);

  useEffect(() => {
    if (toolConfig) {
      // Update meta tags for SEO
      document.title = toolConfig.metaTitle;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', toolConfig.metaDescription);
      }

      // Track page view
      trackPageView(toolConfig.path);
    }
  }, [toolConfig]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setProcessingState("idle");
    setBatchMode(selectedFiles.length > 1);
    setBatchJobs([]);
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to process.",
        variant: "destructive",
      });
      return;
    }

    setProcessingState("processing");
    setProgress(0);
    setErrorMessage("");

    try {
      // Track processing start
      trackEvent('process_start', 'pdf_tool', toolType);
      
      if (batchMode && files.length > 1) {
        // Batch processing mode
        const jobResponses = await createBatchPdfJobs(toolType, files);
        const initialJobs: BatchJob[] = jobResponses.map((response, index) => ({
          jobId: response.jobId,
          fileName: files[index].name,
          status: response.status as BatchJob["status"],
          progress: 0,
        }));
        
        setBatchJobs(initialJobs);
        
        // Start polling for batch job status
        const jobIds = jobResponses.map(response => response.jobId);
        const stopPolling = pollBatchJobsStatus(
          jobIds,
          (jobId, status) => {
            setBatchJobs(prevJobs => 
              prevJobs.map(job => 
                job.jobId === jobId 
                  ? { 
                      ...job, 
                      status: status.status as BatchJob["status"], 
                      progress: status.status === 'completed' ? 100 : job.progress + 10,
                      errorMessage: status.errorMessage 
                    }
                  : job
              )
            );
          },
          (results) => {
            setProcessingState("success");
            trackEvent('batch_process_success', 'pdf_tool', toolType);
          },
          (error) => {
            setProcessingState("error");
            setErrorMessage(error.message);
            trackEvent('batch_process_error', 'pdf_tool', toolType);
          }
        );

        return () => stopPolling();
      } else {
        // Single file processing mode
        const jobResponse = await createPdfJob(toolType, files);
        setJobId(jobResponse.jobId);

        // Start polling for job status
        const stopPolling = pollJobStatus(
          jobResponse.jobId,
          (status) => {
            // Update progress (simulate progress for better UX)
            setProgress(prev => Math.min(prev + 10, 90));
          },
          (result) => {
            if (result.status === 'completed') {
              setProcessingState("success");
              setProgress(100);
              trackEvent('process_success', 'pdf_tool', toolType);
            } else if (result.status === 'failed') {
              setProcessingState("error");
              setErrorMessage(result.errorMessage || "Processing failed");
              trackEvent('process_error', 'pdf_tool', toolType);
            }
          },
          (error) => {
            setProcessingState("error");
            setErrorMessage(error.message);
            trackEvent('process_error', 'pdf_tool', toolType);
          }
        );

        return () => stopPolling();
      }
    } catch (error) {
      setProcessingState("error");
      setErrorMessage(error instanceof Error ? error.message : "Processing failed");
      trackEvent('process_error', 'pdf_tool', toolType);
    }
  };

  const handleDownload = async () => {
    if (!jobId) return;

    try {
      const blob = await downloadPdfFile(jobId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${toolType}-${jobId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      trackEvent('download_success', 'pdf_tool', toolType);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the processed file. Please try again.",
        variant: "destructive",
      });
      trackEvent('download_error', 'pdf_tool', toolType);
    }
  };

  const handleRetry = () => {
    setProcessingState("idle");
    setProgress(0);
    setErrorMessage("");
    setJobId("");
  };

  const handleReset = () => {
    setFiles([]);
    setProcessingState("idle");
    setProgress(0);
    setErrorMessage("");
    setJobId("");
    setBatchMode(false);
    setBatchJobs([]);
  };

  const handleDownloadAll = async () => {
    const completedJobs = batchJobs.filter(job => job.status === 'completed');
    
    try {
      for (const job of completedJobs) {
        const blob = await downloadPdfFile(job.jobId);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = job.fileName.replace(/\.[^/.]+$/, '') + '_processed.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      trackEvent('download_all_success', 'pdf_tool', toolType);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download some files. Please try downloading individual files.",
        variant: "destructive",
      });
      trackEvent('download_all_error', 'pdf_tool', toolType);
    }
  };

  if (!toolConfig) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Back to Tools Button */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-1.5 text-sm hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <ToolHero 
        toolId={toolConfig.id}
        title={toolConfig.title}
        description={toolConfig.description}
        iconColor={toolConfig.iconColor}
        bgColor={toolConfig.bgColor}
      />
      
      {/* Upload Section */}
      <UploadSection
        acceptedFileTypes={toolConfig.acceptedFiles.split(',')}
        onFilesSelected={handleFilesSelected}
      />
      
      {/* Processing Button Section */}
      {files.length > 0 && processingState === "idle" && (
        <div className="bg-white py-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-3">
              {batchMode && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                  <p className="text-blue-800 font-medium text-sm mb-1">
                    🎯 Batch Processing Mode
                  </p>
                  <p className="text-blue-700 text-xs">
                    You've selected {files.length} files. They will be processed individually and you can download each result separately.
                  </p>
                </div>
              )}
              
              <Button
                onClick={handleProcess}
                size="lg"
                className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white px-6 py-3 text-base"
              >
                <WandSparkles className="mr-2 h-4 w-4" />
                {batchMode ? `Process ${files.length} Files` : toolConfig.title}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <main className="pt-4 pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {batchMode && processingState !== "idle" ? (
            <BatchProcessing
              jobs={batchJobs}
              onDownloadAll={handleDownloadAll}
              onReset={handleReset}
            />
          ) : (
            <ProcessingStates
              state={processingState}
              progress={progress}
              errorMessage={errorMessage}
              onDownload={handleDownload}
              onRetry={handleRetry}
              onReset={handleReset}
            />
          )}

        </div>
      </main>
      
      <ToolFooter />
    </div>
  );
}
