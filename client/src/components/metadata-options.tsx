import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Tag, Hash } from "lucide-react";

interface MetadataOptionsProps {
  options: {
    title: string;
    author: string;
    subject: string;
    keywords: string;
    clearExisting: boolean;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function MetadataOptions({ options, onOptionsChange, className }: MetadataOptionsProps) {
  const handleFieldChange = (field: string, value: string) => {
    onOptionsChange({
      ...options,
      [field]: value
    });
  };

  const handleClearExistingChange = (clearExisting: boolean) => {
    onOptionsChange({
      ...options,
      clearExisting
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-pdfo-blue" />
          Edit Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Title
          </Label>
          <Input
            id="title"
            placeholder="Document title"
            value={options.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
        </div>

        {/* Author */}
        <div>
          <Label htmlFor="author" className="text-sm font-medium mb-2 block flex items-center gap-2">
            <User className="h-4 w-4" />
            Author
          </Label>
          <Input
            id="author"
            placeholder="Author name"
            value={options.author}
            onChange={(e) => handleFieldChange('author', e.target.value)}
          />
        </div>

        {/* Subject */}
        <div>
          <Label htmlFor="subject" className="text-sm font-medium mb-2 block flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="Document subject"
            value={options.subject}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
          />
        </div>

        {/* Keywords */}
        <div>
          <Label htmlFor="keywords" className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Keywords
          </Label>
          <Textarea
            id="keywords"
            placeholder="Enter keywords separated by commas"
            value={options.keywords}
            onChange={(e) => handleFieldChange('keywords', e.target.value)}
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple keywords with commas
          </p>
        </div>

        <Separator />

        {/* Clear Existing Metadata */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="clear-existing" className="font-medium">Clear Existing Metadata</Label>
            <p className="text-sm text-gray-500">Remove all existing metadata before adding new values</p>
          </div>
          <Switch
            id="clear-existing"
            checked={options.clearExisting}
            onCheckedChange={handleClearExistingChange}
          />
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Only filled fields will be updated. Empty fields will be ignored.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}