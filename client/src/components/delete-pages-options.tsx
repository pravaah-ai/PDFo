import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, FileText, AlertCircle } from "lucide-react";

interface DeletePagesOptionsProps {
  options: {
    pagesToDelete: string;
    parsedPages: number[];
  };
  totalPages: number;
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function DeletePagesOptions({ options, totalPages, onOptionsChange, className }: DeletePagesOptionsProps) {
  const handlePagesChange = (value: string) => {
    const parsedPages = parsePageNumbers(value, totalPages);
    onOptionsChange({
      ...options,
      pagesToDelete: value,
      parsedPages
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

  const clearPages = () => {
    onOptionsChange({
      ...options,
      pagesToDelete: '',
      parsedPages: []
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trash2 className="h-5 w-5 text-red-600" />
          Delete Pages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="pages-to-delete" className="text-sm font-medium mb-2 block">
            Pages to Delete
          </Label>
          <div className="flex gap-2">
            <Input
              id="pages-to-delete"
              placeholder="e.g., 1,3,5-7,10"
              value={options.pagesToDelete}
              onChange={(e) => handlePagesChange(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="sm" onClick={clearPages}>
              Clear
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Use commas for individual pages and hyphens for ranges
          </p>
        </div>

        {/* Page Preview */}
        {options.parsedPages.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Pages to be deleted:</Label>
            <div className="flex flex-wrap gap-2">
              {options.parsedPages.map((pageNum) => (
                <span
                  key={pageNum}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-xs"
                >
                  <FileText className="h-3 w-3" />
                  Page {pageNum}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Validation Message */}
        {options.pagesToDelete && options.parsedPages.length === 0 && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              No valid pages found in the input. Please check your format.
            </p>
          </div>
        )}
        
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>Warning:</strong> Deleted pages cannot be recovered. The remaining pages will be renumbered.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}