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
    <div className={`space-y-8 ${className}`}>
      {/* Upload Section Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-pdfo-dark-grey mb-2">
          Upload PDF Files
        </h2>
        <p className="text-gray-600">
          Select multiple PDF files to process them
        </p>
      </div>

      {/* File Upload Component */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-pdfo-blue transition-colors">
        <CardContent className="p-8">
          <FileUpload
            acceptedFileTypes={acceptedFileTypes}
            onFilesSelected={onFilesSelected}
            className="border-none p-0"
          />
        </CardContent>
      </Card>
    </div>
  );
}