import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Droplets, Type, Image, RotateCw } from "lucide-react";

interface WatermarkOptionsProps {
  options: {
    type: 'text' | 'image';
    text: string;
    image: File | null;
    position: string;
    opacity: number;
    rotation: number;
    fontSize: number;
    color: string;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function WatermarkOptions({ options, onOptionsChange, className }: WatermarkOptionsProps) {
  const handleTypeChange = (type: 'text' | 'image') => {
    onOptionsChange({
      ...options,
      type
    });
  };

  const handleTextChange = (text: string) => {
    onOptionsChange({
      ...options,
      text
    });
  };

  const handleImageChange = (file: File | null) => {
    onOptionsChange({
      ...options,
      image: file
    });
  };

  const handlePositionChange = (position: string) => {
    onOptionsChange({
      ...options,
      position
    });
  };

  const handleOpacityChange = (opacity: number[]) => {
    onOptionsChange({
      ...options,
      opacity: opacity[0]
    });
  };

  const handleRotationChange = (rotation: number[]) => {
    onOptionsChange({
      ...options,
      rotation: rotation[0]
    });
  };

  const handleFontSizeChange = (fontSize: string) => {
    onOptionsChange({
      ...options,
      fontSize: parseInt(fontSize) || 24
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
          <Droplets className="h-5 w-5 text-pdfo-blue" />
          Watermark Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Watermark Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Watermark Type</Label>
          <RadioGroup value={options.type} onValueChange={handleTypeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text-watermark" />
              <Label htmlFor="text-watermark" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Text Watermark
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="image" id="image-watermark" />
              <Label htmlFor="image-watermark" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Image Watermark
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Text Input */}
        {options.type === 'text' && (
          <div>
            <Label htmlFor="watermark-text" className="text-sm font-medium mb-2 block">
              Watermark Text
            </Label>
            <Input
              id="watermark-text"
              placeholder="Enter watermark text"
              value={options.text}
              onChange={(e) => handleTextChange(e.target.value)}
            />
          </div>
        )}

        {/* Image Upload */}
        {options.type === 'image' && (
          <div>
            <Label htmlFor="watermark-image" className="text-sm font-medium mb-2 block">
              Upload Image
            </Label>
            <Input
              id="watermark-image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
            {options.image && (
              <p className="text-sm text-gray-500 mt-1">
                Selected: {options.image.name}
              </p>
            )}
          </div>
        )}

        {/* Position */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Position</Label>
          <Select value={options.position} onValueChange={handlePositionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="top-left">Top Left</SelectItem>
              <SelectItem value="top-center">Top Center</SelectItem>
              <SelectItem value="top-right">Top Right</SelectItem>
              <SelectItem value="bottom-left">Bottom Left</SelectItem>
              <SelectItem value="bottom-center">Bottom Center</SelectItem>
              <SelectItem value="bottom-right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Text-specific options */}
        {options.type === 'text' && (
          <>
            <div>
              <Label className="text-sm font-medium mb-2 block">Font Size</Label>
              <Select value={options.fontSize.toString()} onValueChange={handleFontSizeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12pt (Small)</SelectItem>
                  <SelectItem value="16">16pt</SelectItem>
                  <SelectItem value="20">20pt</SelectItem>
                  <SelectItem value="24">24pt (Default)</SelectItem>
                  <SelectItem value="28">28pt</SelectItem>
                  <SelectItem value="32">32pt (Large)</SelectItem>
                  <SelectItem value="36">36pt</SelectItem>
                  <SelectItem value="48">48pt (Extra Large)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Color</Label>
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
          </>
        )}

        {/* Opacity */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Opacity: {options.opacity}%
          </Label>
          <Slider
            value={[options.opacity]}
            onValueChange={handleOpacityChange}
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
        </div>

        {/* Rotation */}
        <div>
          <Label className="text-sm font-medium mb-2 block flex items-center gap-2">
            <RotateCw className="h-4 w-4" />
            Rotation: {options.rotation}°
          </Label>
          <Slider
            value={[options.rotation]}
            onValueChange={handleRotationChange}
            max={360}
            min={0}
            step={15}
            className="w-full"
          />
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Preview:</strong> {options.type === 'text' ? `"${options.text}"` : 'Image'} watermark will appear at {options.position} with {options.opacity}% opacity.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}