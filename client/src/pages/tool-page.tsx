import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { ToolFooter } from "@/components/tool-footer";
import { FileUpload } from "@/components/file-upload";
import { ProcessingStates } from "@/components/processing-states";
import { DonateButton } from "@/components/donate-button";
import { Button } from "@/components/ui/button";
import { getToolConfig } from "@/lib/tools-config";
import { createPdfJob, pollJobStatus, downloadPdfFile } from "@/lib/pdf-api";
import { trackPageView, trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { WandSparkles, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface ToolPageProps {
  toolType: string;
}

export default function ToolPage({ toolType }: ToolPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [processingState, setProcessingState] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [jobId, setJobId] = useState<string>("");
  
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

      // Cleanup polling on component unmount
      return () => stopPolling();
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
  };

  if (!toolConfig) {
    return <div>Tool not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-6 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Tools Button */}
          <div className="mb-12">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-gray-50">
                <ArrowLeft className="h-4 w-4" />
                Back to Tools
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pdfo-dark-grey mb-4">
              {toolConfig.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {toolConfig.description}
            </p>
          </div>

          <FileUpload
            acceptedFileTypes={toolConfig.acceptedFiles.split(',')}
            onFilesSelected={handleFilesSelected}
            className="mb-8"
          />

          {files.length > 0 && processingState === "idle" && (
            <div className="text-center mb-8">
              <Button
                onClick={handleProcess}
                size="lg"
                className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white px-8 py-4 text-lg"
              >
                <WandSparkles className="mr-2 h-5 w-5" />
                {toolConfig.title}
              </Button>
            </div>
          )}

          <ProcessingStates
            state={processingState}
            progress={progress}
            errorMessage={errorMessage}
            onDownload={handleDownload}
            onRetry={handleRetry}
            onReset={handleReset}
          />

          {/* Donate Section */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Found this tool helpful?</p>
            <DonateButton />
          </div>
        </div>
      </main>
      <ToolFooter />
    </div>
  );
}
