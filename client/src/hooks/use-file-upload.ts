import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadState {
  files: File[];
  isUploading: boolean;
  progress: number;
}

interface UseFileUploadOptions {
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    acceptedFileTypes = [],
    maxFileSize = 50 * 1024 * 1024, // 50MB default
    maxFiles = 10,
    onFilesSelected,
  } = options;

  const { toast } = useToast();
  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    progress: 0,
  });

  const validateFile = useCallback((file: File): boolean => {
    // Check file type
    if (acceptedFileTypes.length > 0) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isValidType = acceptedFileTypes.some(type => 
        type === fileExtension || type === file.type
      );
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `Please select files with the following types: ${acceptedFileTypes.join(', ')}`,
          variant: "destructive",
        });
        return false;
      }
    }

    // Check file size
    if (file.size > maxFileSize) {
      toast({
        title: "File too large",
        description: `File size must be less than ${Math.round(maxFileSize / 1024 / 1024)}MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [acceptedFileTypes, maxFileSize, toast]);

  const addFiles = useCallback((newFiles: File[]) => {
    const validFiles = newFiles.filter(validateFile);
    
    setState(prev => {
      const totalFiles = prev.files.length + validFiles.length;
      if (totalFiles > maxFiles) {
        toast({
          title: "Too many files",
          description: `You can only upload up to ${maxFiles} files`,
          variant: "destructive",
        });
        return prev;
      }

      const updatedFiles = [...prev.files, ...validFiles];
      onFilesSelected?.(updatedFiles);
      
      return {
        ...prev,
        files: updatedFiles,
      };
    });

    if (validFiles.length > 0) {
      toast({
        title: "Files added",
        description: `${validFiles.length} file(s) added successfully`,
      });
    }
  }, [validateFile, maxFiles, onFilesSelected, toast]);

  const removeFile = useCallback((index: number) => {
    setState(prev => {
      const updatedFiles = prev.files.filter((_, i) => i !== index);
      onFilesSelected?.(updatedFiles);
      return {
        ...prev,
        files: updatedFiles,
      };
    });
  }, [onFilesSelected]);

  const clearFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      files: [],
    }));
    onFilesSelected?.([]);
  }, [onFilesSelected]);

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      addFiles(Array.from(files));
    }
  }, [addFiles]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      addFiles(Array.from(files));
    }
  }, [addFiles]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return {
    files: state.files,
    isUploading: state.isUploading,
    progress: state.progress,
    addFiles,
    removeFile,
    clearFiles,
    handleFileInput,
    handleDrop,
    handleDragOver,
  };
}
