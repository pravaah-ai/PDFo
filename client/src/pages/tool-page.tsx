import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { ToolFooter } from "@/components/tool-footer";
import { ToolHero } from "@/components/tool-hero";
import { UploadSection } from "@/components/upload-section";
import { ProcessingStates } from "@/components/processing-states";
import { BatchProcessing } from "@/components/batch-processing";
import { DonateButton } from "@/components/donate-button";
import { AdSenseAd } from "@/components/adsense-ad";
import { PrivacyNotice } from "@/components/privacy-notice";
import { SplitOptions } from "@/components/split-options";
import { MergeOptions } from "@/components/merge-options";
import { ReorderOptions } from "@/components/reorder-options";
import { DeletePagesOptions } from "@/components/delete-pages-options";
import { RotateOptions } from "@/components/rotate-options";
import { PageNumbersOptions } from "@/components/page-numbers-options";
import { MetadataOptions } from "@/components/metadata-options";
import { WatermarkOptions } from "@/components/watermark-options";
import { LockOptions } from "@/components/lock-options";
import { UnlockOptions } from "@/components/unlock-options";
import { CompressOptions } from "@/components/compress-options";

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
  const [splitOptions, setSplitOptions] = useState({
    splitType: "all", // "all", "range", "specific"
    pageRange: { start: 1, end: 1 },
    specificPages: "",
    outputFormat: "zip" // "zip", "separate"
  });

  const [mergeOptions, setMergeOptions] = useState({
    keepBookmarks: true,
    fileOrder: [] as number[]
  });

  const [reorderOptions, setReorderOptions] = useState({
    pageOrder: [] as number[]
  });

  const [deleteOptions, setDeleteOptions] = useState({
    pagesToDelete: "",
    parsedPages: [] as number[]
  });

  const [rotateOptions, setRotateOptions] = useState({
    rotationAngle: 90,
    pagesToRotate: "",
    parsedPages: [] as number[],
    rotateAll: true
  });

  const [pageNumbersOptions, setPageNumbersOptions] = useState({
    position: "bottom-center",
    startFrom: 1,
    fontSize: 12,
    color: "black"
  });

  const [metadataOptions, setMetadataOptions] = useState({
    title: "",
    author: "",
    subject: "",
    keywords: "",
    clearExisting: false
  });

  const [watermarkOptions, setWatermarkOptions] = useState({
    type: "text" as 'text' | 'image',
    text: "",
    image: null as File | null,
    position: "center",
    opacity: 50,
    rotation: 0,
    fontSize: 24,
    color: "gray"
  });

  const [lockOptions, setLockOptions] = useState({
    password: "",
    confirmPassword: "",
    requirePasswordToOpen: true,
    restrictEditing: false,
    restrictPrinting: false
  });

  const [unlockOptions, setUnlockOptions] = useState({
    password: ""
  });

  const [compressOptions, setCompressOptions] = useState({
    compressionLevel: "medium" as 'low' | 'medium' | 'high',
    estimatedSize: 0,
    originalSize: 0
  });

  
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
    setBatchMode(selectedFiles.length > 1 && toolType !== 'merge-pdf');
    setBatchJobs([]);
    
    // Initialize file order for merge options
    if (toolType === "merge-pdf") {
      setMergeOptions(prev => ({
        ...prev,
        fileOrder: selectedFiles.map((_, index) => index)
      }));
    }
    
    // Initialize compression options with original size
    if (toolType === "compress-pdf" && selectedFiles.length > 0) {
      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      setCompressOptions(prev => ({
        ...prev,
        originalSize: totalSize,
        estimatedSize: totalSize * 0.6 // Default medium compression
      }));
    }
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
      console.log(`Processing ${files.length} files for tool: ${toolType}`);
      trackEvent('process_start', 'pdf_tool', toolType);
      
      // For merge-pdf, always use single job mode even with multiple files
      if (toolType === 'merge-pdf' || (!batchMode || files.length === 1)) {
        // Single job processing (merge-pdf combines all files into one job)
        const jobResponse = await createPdfJob(toolType, files, splitOptions);
        setJobId(jobResponse.jobId);
        console.log('Job created with ID:', jobResponse.jobId);

        // Start polling for job status
        pollJobStatus(
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
      } else {
        // Batch processing mode
        const jobResponses = await createBatchPdfJobs(toolType, files, splitOptions);
        const initialJobs: BatchJob[] = jobResponses.map((response, index) => ({
          jobId: response.jobId,
          fileName: files[index].name,
          status: response.status as BatchJob["status"],
          progress: 0,
        }));
        
        setBatchJobs(initialJobs);
        
        // Start polling for batch job status
        const jobIds = jobResponses.map(response => response.jobId);
        pollBatchJobsStatus(
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
      }
    } catch (error) {
      setProcessingState("error");
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
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
      a.download = `PDFo_${toolType}_${jobId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      trackEvent('download_success', 'pdf_tool', toolType);
    } catch (error) {
      console.error('Download failed:', error);
      trackEvent('download_error', 'pdf_tool', toolType);
    }
  };

  const handleDownloadAll = async () => {
    try {
      for (const job of batchJobs) {
        if (job.status === 'completed') {
          const blob = await downloadPdfFile(job.jobId);
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `PDFo_${toolType}_${job.jobId}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      trackEvent('batch_download_success', 'pdf_tool', toolType);
    } catch (error) {
      console.error('Batch download failed:', error);
      trackEvent('batch_download_error', 'pdf_tool', toolType);
    }
  };

  const handleReset = () => {
    setProcessingState("idle");
    setProgress(0);
    setErrorMessage("");
    setJobId("");
    setBatchJobs([]);
    setFiles([]);

  };

  const handleRetry = () => {
    if (files.length > 0) {
      handleProcess();
    }
  };

  if (!toolConfig) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tool Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The requested tool could not be found.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Tools Button */}
        <div className="mb-6">
          <Link href="/#tools">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>

        {/* Tool Hero Section */}
        <ToolHero
          toolId={toolConfig.id}
          title={toolConfig.title}
          description={toolConfig.description}
          iconColor={toolConfig.iconColor}
          bgColor={toolConfig.bgColor}
        />

        {/* Upload Section */}
        <div className="mt-8">
          <UploadSection
            acceptedFileTypes={toolConfig.acceptedFiles.split(',')}
            onFilesSelected={handleFilesSelected}
          />
        </div>

        {/* Tool-specific options */}
        {toolType === 'split-pdf' && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <SplitOptions
              options={splitOptions}
              onOptionsChange={setSplitOptions}
            />
          </div>
        )}

        {toolType === "merge-pdf" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <MergeOptions
              options={mergeOptions}
              files={files}
              onOptionsChange={setMergeOptions}
              onReorderFiles={(newOrder) => setMergeOptions(prev => ({ ...prev, fileOrder: newOrder }))}
            />
          </div>
        )}

        {toolType === "reorder-pages" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <ReorderOptions
              options={reorderOptions}
              totalPages={10} // This would be dynamically set based on PDF analysis
              onOptionsChange={setReorderOptions}
            />
          </div>
        )}

        {toolType === "delete-pages" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <DeletePagesOptions
              options={deleteOptions}
              totalPages={10} // This would be dynamically set based on PDF analysis
              onOptionsChange={setDeleteOptions}
            />
          </div>
        )}

        {toolType === "rotate-pdf" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <RotateOptions
              options={rotateOptions}
              totalPages={10} // This would be dynamically set based on PDF analysis
              onOptionsChange={setRotateOptions}
            />
          </div>
        )}

        {toolType === "add-page-numbers" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <PageNumbersOptions
              options={pageNumbersOptions}
              onOptionsChange={setPageNumbersOptions}
            />
          </div>
        )}

        {toolType === "edit-metadata" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <MetadataOptions
              options={metadataOptions}
              onOptionsChange={setMetadataOptions}
            />
          </div>
        )}

        {toolType === "watermark-pdf" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <WatermarkOptions
              options={watermarkOptions}
              onOptionsChange={setWatermarkOptions}
            />
          </div>
        )}

        {toolType === "lock-pdf" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <LockOptions
              options={lockOptions}
              onOptionsChange={setLockOptions}
            />
          </div>
        )}

        {toolType === "unlock-pdf" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <UnlockOptions
              options={unlockOptions}
              onOptionsChange={setUnlockOptions}
            />
          </div>
        )}

        {toolType === "compress-pdf" && files.length > 0 && processingState === "idle" && (
          <div className="mt-6">
            <CompressOptions
              options={compressOptions}
              onOptionsChange={setCompressOptions}
            />
          </div>
        )}

        {/* Process Button */}
        {files.length > 0 && processingState === "idle" && (
          <div className="mt-6 text-center space-y-4">
            <Button 
              onClick={handleProcess}
              size="lg"
              className="bg-pdfo-blue hover:bg-pdfo-blue-dark"
            >
              <WandSparkles className="h-5 w-5 mr-2" />
              Process {files.length} File{files.length > 1 ? 's' : ''}
            </Button>
            
            {/* Coffee Support Button */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Love PDFo? <Coffee className="inline h-4 w-4 mx-1" /> Support us with a coffee!
              </p>
              <DonateButton variant="outline" size="sm" />
            </div>
          </div>
        )}
        
        {/* Processing States */}
        <div className="mt-6">
          <ProcessingStates
            state={processingState}
            progress={progress}
            errorMessage={errorMessage}
            onDownload={handleDownload}
            onRetry={handleRetry}
            onReset={handleReset}
          />
        </div>

        {/* Coffee Support Button - Show after successful processing */}
        {processingState === "success" && (
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Love PDFo? <Coffee className="inline h-4 w-4 mx-1" /> Support us with a coffee!
            </p>
            <DonateButton variant="outline" size="sm" />
          </div>
        )}
        
        {/* Batch Processing Results */}
        {batchJobs.length > 0 && (
          <div className="mt-6">
            <BatchProcessing
              jobs={batchJobs}
              onDownloadAll={handleDownloadAll}
              onReset={handleReset}
            />
            
            {/* Coffee Support Button - Show after batch processing */}
            <div className="mt-4 text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Love PDFo? <Coffee className="inline h-4 w-4 mx-1" /> Support us with a coffee!
              </p>
              <DonateButton variant="outline" size="sm" />
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-8">
          <PrivacyNotice />
        </div>


      </main>
      
      <ToolFooter />

    </div>
  );
}