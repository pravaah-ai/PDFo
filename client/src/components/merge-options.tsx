import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, ArrowUpDown, Bookmark } from "lucide-react";

interface MergeOptionsProps {
  options: {
    keepBookmarks: boolean;
    fileOrder: number[];
  };
  files: File[];
  onOptionsChange: (options: any) => void;
  onReorderFiles: (newOrder: number[]) => void;
  className?: string;
}

export function MergeOptions({ options, files, onOptionsChange, onReorderFiles, className }: MergeOptionsProps) {
  const handleBookmarkChange = (keepBookmarks: boolean) => {
    onOptionsChange({
      ...options,
      keepBookmarks
    });
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newOrder = [...options.fileOrder];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    onReorderFiles(newOrder);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-pdfo-blue" />
          Merge Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Reordering */}
        <div>
          <Label className="text-sm font-medium mb-3 block">File Order</Label>
          <div className="space-y-2">
            {options.fileOrder.map((fileIndex, index) => (
              <div key={fileIndex} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm truncate">{files[fileIndex]?.name}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveFile(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                  >
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveFile(index, Math.min(files.length - 1, index + 1))}
                    disabled={index === files.length - 1}
                  >
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bookmark Options */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-blue-600" />
            <Label htmlFor="keep-bookmarks" className="font-medium">Keep Bookmarks</Label>
          </div>
          <Switch
            id="keep-bookmarks"
            checked={options.keepBookmarks}
            onCheckedChange={handleBookmarkChange}
          />
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Bookmarks from all PDFs will be preserved and combined in the merged document.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}