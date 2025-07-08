import { apiRequest } from "./queryClient";
import type { PdfJobResponse } from "@shared/schema";

export async function createPdfJob(toolType: string, files: File[], splitOptions?: any): Promise<PdfJobResponse> {
  const formData = new FormData();
  formData.append('toolType', toolType);
  
  if (splitOptions) {
    formData.append('splitOptions', JSON.stringify(splitOptions));
  }
  
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await apiRequest('POST', '/api/pdf/process', formData);
  return response.json();
}

export async function createBatchPdfJobs(toolType: string, files: File[], splitOptions?: any): Promise<PdfJobResponse[]> {
  const formData = new FormData();
  formData.append('toolType', toolType);
  formData.append('batchMode', 'true');
  
  if (splitOptions) {
    formData.append('splitOptions', JSON.stringify(splitOptions));
  }
  
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await apiRequest('POST', '/api/pdf/batch-process', formData);
  return response.json();
}

export async function getPdfJobStatus(jobId: string): Promise<PdfJobResponse> {
  const response = await apiRequest('GET', `/api/pdf/job/${jobId}`);
  return response.json();
}

export async function downloadPdfFile(jobId: string): Promise<Blob> {
  const response = await apiRequest('GET', `/api/pdf/download/${jobId}`);
  return response.blob();
}

export function pollJobStatus(
  jobId: string,
  onUpdate: (status: PdfJobResponse) => void,
  onComplete: (result: PdfJobResponse) => void,
  onError: (error: Error) => void
): () => void {
  const interval = setInterval(async () => {
    try {
      const status = await getPdfJobStatus(jobId);
      onUpdate(status);
      
      if (status.status === 'completed' || status.status === 'failed') {
        clearInterval(interval);
        onComplete(status);
      }
    } catch (error) {
      clearInterval(interval);
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, 1000);

  return () => clearInterval(interval);
}

export function pollBatchJobsStatus(
  jobIds: string[],
  onUpdate: (jobId: string, status: PdfJobResponse) => void,
  onComplete: (results: { jobId: string; result: PdfJobResponse }[]) => void,
  onError: (error: Error) => void
): () => void {
  const completedJobs = new Set<string>();
  const allResults: { jobId: string; result: PdfJobResponse }[] = [];

  const interval = setInterval(async () => {
    try {
      const promises = jobIds.map(async (jobId) => {
        if (completedJobs.has(jobId)) return null;
        
        const status = await getPdfJobStatus(jobId);
        onUpdate(jobId, status);
        
        if (status.status === 'completed' || status.status === 'failed') {
          completedJobs.add(jobId);
          allResults.push({ jobId, result: status });
        }
        
        return status;
      });

      await Promise.all(promises);
      
      if (completedJobs.size === jobIds.length) {
        clearInterval(interval);
        onComplete(allResults);
      }
    } catch (error) {
      clearInterval(interval);
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, 1000);

  return () => clearInterval(interval);
}
