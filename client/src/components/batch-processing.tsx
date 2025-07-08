import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Download, RotateCw, FileText, Archive } from "lucide-react";
import { downloadPdfFile } from "@/lib/pdf-api";
import { useToast } from "@/hooks/use-toast";
import type { PdfJobResponse } from "@shared/schema";

interface BatchJob {
  jobId: string;
  fileName: string;
  status: PdfJobResponse["status"];
  progress: number;
  errorMessage?: string;
}

interface BatchProcessingProps {
  jobs: BatchJob[];
  onDownloadAll?: () => void;
  onReset?: () => void;
}

export function BatchProcessing({ jobs, onDownloadAll, onReset }: BatchProcessingProps) {
  const [downloadingJobs, setDownloadingJobs] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const completedJobs = jobs.filter(job => job.status === 'completed');
  const failedJobs = jobs.filter(job => job.status === 'failed');
  const processingJobs = jobs.filter(job => job.status === 'processing' || job.status === 'pending');
  
  const overallProgress = jobs.length > 0 ? (completedJobs.length + failedJobs.length) / jobs.length * 100 : 0;

  const handleDownloadSingle = async (jobId: string, fileName: string) => {
    if (downloadingJobs.has(jobId)) return;

    setDownloadingJobs(prev => new Set(prev).add(jobId));
    
    try {
      const blob = await downloadPdfFile(jobId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.replace(/\.[^/.]+$/, '') + '_processed.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download failed",
        description: `Failed to download ${fileName}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setDownloadingJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const getStatusIcon = (status: BatchJob["status"]) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <X className="h-4 w-4 text-red-600" />;
      case 'processing':
        return <RotateCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'pending':
        return <RotateCw className="h-4 w-4 text-gray-400" />;
      default:
        return <RotateCw className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: BatchJob["status"]) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Batch Processing Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallProgress} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{completedJobs.length + failedJobs.length} of {jobs.length} files processed</span>
              <span>{Math.round(overallProgress)}% complete</span>
            </div>
            
            {/* Summary */}
            <div className="flex gap-4 text-sm">
              {completedJobs.length > 0 && (
                <span className="text-green-600 font-medium">
                  ✓ {completedJobs.length} completed
                </span>
              )}
              {failedJobs.length > 0 && (
                <span className="text-red-600 font-medium">
                  ✗ {failedJobs.length} failed
                </span>
              )}
              {processingJobs.length > 0 && (
                <span className="text-blue-600 font-medium">
                  ⟳ {processingJobs.length} processing
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Job Status */}
      <Card>
        <CardHeader>
          <CardTitle>File Processing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.jobId} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{job.fileName}</p>
                    {job.errorMessage && (
                      <p className="text-xs text-red-600 mt-1">{job.errorMessage}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(job.status)}
                    {getStatusBadge(job.status)}
                  </div>
                </div>
                
                {job.status === 'completed' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadSingle(job.jobId, job.fileName)}
                    disabled={downloadingJobs.has(job.jobId)}
                    className="ml-3"
                  >
                    {downloadingJobs.has(job.jobId) ? (
                      <RotateCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Download
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {completedJobs.length > 1 && onDownloadAll && (
          <Button onClick={onDownloadAll} size="lg" className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-5 w-5" />
            Download All ({completedJobs.length} files)
          </Button>
        )}
        
        {(completedJobs.length > 0 || failedJobs.length > 0) && onReset && (
          <Button onClick={onReset} variant="outline" size="lg">
            Process New Files
          </Button>
        )}
      </div>
    </div>
  );
}