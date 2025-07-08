import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hash, Palette, Type } from "lucide-react";

interface PageNumbersOptionsProps {
  options: {
    position: string;
    startFrom: number;
    fontSize: number;
    color: string;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function PageNumbersOptions({ options, onOptionsChange, className }: PageNumbersOptionsProps) {
  const handlePositionChange = (position: string) => {
    onOptionsChange({
      ...options,
      position
    });
  };

  const handleStartFromChange = (value: string) => {
    const startFrom = parseInt(value) || 1;
    onOptionsChange({
      ...options,
      startFrom
    });
  };

  const handleFontSizeChange = (value: string) => {
    const fontSize = parseInt(value) || 12;
    onOptionsChange({
      ...options,
      fontSize
    });
  };

  const handleColorChange = (color: string) => {
    onOptionsChange({
      ...options,
      color
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="h-5 w-5 text-pdfo-blue" />
          Page Numbers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Position */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Position</Label>
          <Select value={options.position} onValueChange={handlePositionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-center">Bottom Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start From */}
        <div>
          <Label htmlFor="start-from" className="text-sm font-medium mb-2 block">
            Start From Page
          </Label>
          <Input
            id="start-from"
            type="number"
            min="1"
            value={options.startFrom}
            onChange={(e) => handleStartFromChange(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Font Size */}
        <div>
          <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Type className="h-4 w-4" />
            Font Size
          </Label>
          <Select value={options.fontSize.toString()} onValueChange={handleFontSizeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select font size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8pt (Small)</SelectItem>
              <SelectItem value="10">10pt</SelectItem>
              <SelectItem value="12">12pt (Default)</SelectItem>
              <SelectItem value="14">14pt</SelectItem>
              <SelectItem value="16">16pt (Large)</SelectItem>
              <SelectItem value="18">18pt</SelectItem>
              <SelectItem value="20">20pt (Extra Large)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Color */}
        <div>
          <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Color
          </Label>
          <Select value={options.color} onValueChange={handleColorChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="white">White</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Preview:</strong> Page numbers will appear at {options.position.replace('-', ' ')} in {options.color} color, starting from page {options.startFrom}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}