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
    <div className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upload Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upload PDF Files
          </h2>
          <p className="text-gray-600">
            Select multiple PDF files to process them
          </p>
        </div>

        {/* File Upload Component */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors bg-white">
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