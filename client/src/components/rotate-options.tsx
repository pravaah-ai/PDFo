import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { RotateCw, RotateCcw, FileText } from "lucide-react";

interface RotateOptionsProps {
  options: {
    rotationAngle: number;
    pagesToRotate: string;
    parsedPages: number[];
    rotateAll: boolean;
  };
  totalPages: number;
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function RotateOptions({ options, totalPages, onOptionsChange, className }: RotateOptionsProps) {
  const handleRotationChange = (angle: string) => {
    onOptionsChange({
      ...options,
      rotationAngle: parseInt(angle)
    });
  };

  const handlePagesChange = (value: string) => {
    const parsedPages = parsePageNumbers(value, totalPages);
    onOptionsChange({
      ...options,
      pagesToRotate: value,
      parsedPages,
      rotateAll: false
    });
  };

  const handleRotateAllChange = (rotateAll: boolean) => {
    onOptionsChange({
      ...options,
      rotateAll,
      pagesToRotate: rotateAll ? '' : options.pagesToRotate,
      parsedPages: rotateAll ? [] : options.parsedPages
    });
  };

  const parsePageNumbers = (input: string, maxPages: number): number[] => {
    const pages: number[] = [];
    const parts = input.replace(/\s/g, '').split(',');
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(num => parseInt(num));
        if (!isNaN(start) && !isNaN(end)) {
          const rangeStart = Math.max(1, Math.min(start, maxPages));
          const rangeEnd = Math.max(rangeStart, Math.min(end, maxPages));
          for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
          }
        }
      } else {
        const pageNum = parseInt(part);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= maxPages) {
          pages.push(pageNum);
        }
      }
    }
    
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <RotateCw className="h-5 w-5 text-pdfo-blue" />
          Rotate Pages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rotation Angle */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Rotation Angle</Label>
          <RadioGroup value={options.rotationAngle.toString()} onValueChange={handleRotationChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="90" id="rotate-90" />
              <Label htmlFor="rotate-90" className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                90° Clockwise
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="-90" id="rotate-neg90" />
              <Label htmlFor="rotate-neg90" className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                90° Counter-clockwise
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="180" id="rotate-180" />
              <Label htmlFor="rotate-180" className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                180° (Upside down)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Page Selection */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Pages to Rotate</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="rotate-all"
                checked={options.rotateAll}
                onChange={(e) => handleRotateAllChange(e.target.checked)}
              />
              <Label htmlFor="rotate-all">All pages</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="rotate-specific"
                checked={!options.rotateAll}
                onChange={(e) => handleRotateAllChange(!e.target.checked)}
              />
              <Label htmlFor="rotate-specific">Specific pages</Label>
            </div>
            
            {!options.rotateAll && (
              <Input
                placeholder="e.g., 1,3,5-7,10"
                value={options.pagesToRotate}
                onChange={(e) => handlePagesChange(e.target.value)}
                className="ml-6"
              />
            )}
          </div>
        </div>

        {/* Preview */}
        {!options.rotateAll && options.parsedPages.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Pages to be rotated:</Label>
            <div className="flex flex-wrap gap-2">
              {options.parsedPages.map((pageNum) => (
                <span
                  key={pageNum}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                >
                  <FileText className="h-3 w-3" />
                  Page {pageNum}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Pages will be rotated {options.rotationAngle > 0 ? 'clockwise' : 'counter-clockwise'} by {Math.abs(options.rotationAngle)}°.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}