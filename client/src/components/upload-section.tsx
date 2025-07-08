import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { Upload } from "lucide-react";

interface UploadSectionProps {
  acceptedFileTypes: string[];
  onFilesSelected: (files: File[]) => void;
  className?: string;
}

export function UploadSection({ acceptedFileTypes, onFilesSelected, className }: UploadSectionProps) {
  return (
    <div className={`bg-gray-50 py-8 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upload Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500 mb-3">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Upload PDF Files
          </h2>
          <p className="text-gray-600 text-sm">
            Select multiple PDF files to process them
          </p>
          <p className="text-xs text-blue-600 mt-1 font-medium">
            💡 Upload multiple files for batch processing
          </p>
        </div>

        {/* File Upload Component */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors bg-white rounded-xl">
          <CardContent className="p-8">
            <FileUpload
              acceptedFileTypes={acceptedFileTypes}
              onFilesSelected={onFilesSelected}
              className="border-none p-0"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}