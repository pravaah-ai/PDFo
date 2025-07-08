import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FileText, Scissors, Hash } from "lucide-react";

interface SplitOptionsProps {
  options: {
    splitType: string;
    pageRange: { start: number; end: number };
    specificPages: string;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function SplitOptions({ options, onOptionsChange, className }: SplitOptionsProps) {
  const handleSplitTypeChange = (value: string) => {
    onOptionsChange({
      ...options,
      splitType: value
    });
  };

  const handlePageRangeChange = (field: 'start' | 'end', value: string) => {
    const numValue = parseInt(value) || 1;
    onOptionsChange({
      ...options,
      pageRange: {
        ...options.pageRange,
        [field]: numValue
      }
    });
  };

  const handleSpecificPagesChange = (value: string) => {
    onOptionsChange({
      ...options,
      specificPages: value
    });
  };

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Scissors className="h-5 w-5 text-pdfo-blue" />
          Split Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={options.splitType} onValueChange={handleSplitTypeChange}>
          {/* Split All Pages */}
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <RadioGroupItem value="all" id="split-all" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="split-all" className="flex items-center gap-2 font-medium cursor-pointer">
                <FileText className="h-4 w-4 text-blue-600" />
                Split into Individual Pages
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Extract each page as a separate PDF file
              </p>
            </div>
          </div>

          {/* Split Page Range */}
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <RadioGroupItem value="range" id="split-range" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="split-range" className="flex items-center gap-2 font-medium cursor-pointer">
                <Hash className="h-4 w-4 text-green-600" />
                Split Page Range
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                Extract a specific range of pages
              </p>
              {options.splitType === 'range' && (
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="start-page" className="text-sm">From:</Label>
                    <Input
                      id="start-page"
                      type="number"
                      min="1"
                      value={options.pageRange.start}
                      onChange={(e) => handlePageRangeChange('start', e.target.value)}
                      className="w-20"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="end-page" className="text-sm">To:</Label>
                    <Input
                      id="end-page"
                      type="number"
                      min="1"
                      value={options.pageRange.end}
                      onChange={(e) => handlePageRangeChange('end', e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Split Specific Pages */}
          <div className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
            <RadioGroupItem value="specific" id="split-specific" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="split-specific" className="flex items-center gap-2 font-medium cursor-pointer">
                <Scissors className="h-4 w-4 text-purple-600" />
                Split Specific Pages
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
                Extract specific pages (e.g., 1,3,5-7,10)
              </p>
              {options.splitType === 'specific' && (
                <div className="mt-2">
                  <Input
                    placeholder="e.g., 1,3,5-7,10"
                    value={options.specificPages}
                    onChange={(e) => handleSpecificPagesChange(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Use commas for individual pages and hyphens for ranges
                  </p>
                </div>
              )}
            </div>
          </div>
        </RadioGroup>

        <Separator />
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Each selected page or range will be saved as a separate PDF file. 
            You'll receive a zip file containing all the split PDFs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}