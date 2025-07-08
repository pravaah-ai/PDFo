import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Download, RotateCcw } from "lucide-react";


interface ProcessingStatesProps {
  state: "idle" | "processing" | "success" | "error";
  progress?: number;
  errorMessage?: string;
  onDownload?: () => void;
  onRetry?: () => void;
  onReset?: () => void;
}

export function ProcessingStates({
  state,
  progress = 0,
  errorMessage,
  onDownload,
  onRetry,
  onReset,
}: ProcessingStatesProps) {
  if (state === "idle") {
    return null;
  }

  if (state === "processing") {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pdfo-blue"></div>
            <span className="text-base font-medium text-pdfo-dark-grey">
              Processing your files...
            </span>
          </div>
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-600 mt-2">{progress}% complete</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3 mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-pdfo-dark-grey mb-2">
            Files processed successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Your processed file is ready for download.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onDownload}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              className="border-gray-300 text-pdfo-dark-grey hover:bg-gray-50"
            >
              Process Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "error") {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4 mx-auto">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-pdfo-dark-grey mb-2">
            Processing failed
          </h3>
          <p className="text-gray-600 mb-6">
            {errorMessage || "Something went wrong. Please try again."}
          </p>
          <Button
            onClick={onRetry}
            className="bg-pdfo-blue hover:bg-pdfo-blue-light text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}
