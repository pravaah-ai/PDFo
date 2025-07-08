import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, RotateCcw, FileText } from "lucide-react";

interface ReorderOptionsProps {
  options: {
    pageOrder: number[];
  };
  totalPages: number;
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function ReorderOptions({ options, totalPages, onOptionsChange, className }: ReorderOptionsProps) {
  const movePage = (fromIndex: number, toIndex: number) => {
    const newOrder = [...options.pageOrder];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    onOptionsChange({
      ...options,
      pageOrder: newOrder
    });
  };

  const resetOrder = () => {
    onOptionsChange({
      ...options,
      pageOrder: Array.from({ length: totalPages }, (_, i) => i + 1)
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowUpDown className="h-5 w-5 text-pdfo-blue" />
          Reorder Pages
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Page Order</span>
          <Button variant="outline" size="sm" onClick={resetOrder}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Order
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
          {options.pageOrder.map((pageNum, index) => (
            <div key={pageNum} className="relative">
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Page {pageNum}</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => movePage(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => movePage(index, Math.min(options.pageOrder.length - 1, index + 1))}
                  disabled={index === options.pageOrder.length - 1}
                >
                  ↓
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Tip:</strong> Use the arrow buttons to reorder pages. The new order will be reflected in the final PDF.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}