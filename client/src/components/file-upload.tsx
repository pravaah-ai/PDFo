import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, FileText } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  acceptedFileTypes = ['.pdf'],
  maxFileSize = 50 * 1024 * 1024,
  maxFiles = 10,
  onFilesSelected,
  className,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    files,
    handleFileInput,
    handleDrop,
    handleDragOver,
    removeFile,
    clearFiles,
  } = useFileUpload({
    acceptedFileTypes,
    maxFileSize,
    maxFiles,
    onFilesSelected,
  });

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className="border-2 border-dashed border-gray-300 hover:border-pdfo-blue transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleButtonClick}
      >
        <CardContent className="p-12 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-pdfo-dark-grey mb-2">
            Drop your files here
          </h3>
          <p className="text-gray-600 mb-4">
            or click to browse
          </p>
          <Button
            type="button"
            className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white"
          >
            Select Files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes.join(',')}
            multiple={maxFiles > 1}
            onChange={handleFileInput}
            className="hidden"
          />
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-pdfo-dark-grey">
              Selected Files ({files.length})
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFiles}
              className="text-gray-500 hover:text-red-600"
            >
              Clear All
            </Button>
          </div>
          
          {files.map((file, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <FileText className="h-8 w-8 text-red-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-pdfo-dark-grey truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
