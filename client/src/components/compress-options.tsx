import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Archive, FileText, Gauge } from "lucide-react";

interface CompressOptionsProps {
  options: {
    compressionLevel: 'low' | 'medium' | 'high';
    estimatedSize: number;
    originalSize: number;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function CompressOptions({ options, onOptionsChange, className }: CompressOptionsProps) {
  const handleCompressionLevelChange = (level: 'low' | 'medium' | 'high') => {
    // Estimate compression ratios
    const compressionRatios = {
      low: 0.8,    // 20% reduction
      medium: 0.6, // 40% reduction
      high: 0.4    // 60% reduction
    };
    
    const estimatedSize = options.originalSize * compressionRatios[level];
    
    onOptionsChange({
      ...options,
      compressionLevel: level,
      estimatedSize
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSavingsPercentage = (): number => {
    if (options.originalSize === 0) return 0;
    return Math.round(((options.originalSize - options.estimatedSize) / options.originalSize) * 100);
  };

  const getQualityDescription = (level: string): string => {
    switch (level) {
      case 'low':
        return 'Minimal compression, maintains high quality';
      case 'medium':
        return 'Balanced compression and quality';
      case 'high':
        return 'Maximum compression, some quality loss';
      default:
        return '';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Archive className="h-5 w-5 text-pdfo-blue" />
          Compress PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Compression Level */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Compression Level</Label>
          <RadioGroup value={options.compressionLevel} onValueChange={handleCompressionLevelChange}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="low" id="low-compression" />
                <div className="flex-1">
                  <Label htmlFor="low-compression" className="font-medium">Low Compression</Label>
                  <p className="text-sm text-gray-500">Minimal compression, maintains high quality</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600">~20% smaller</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="medium" id="medium-compression" />
                <div className="flex-1">
                  <Label htmlFor="medium-compression" className="font-medium">Medium Compression</Label>
                  <p className="text-sm text-gray-500">Balanced compression and quality</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-600">~40% smaller</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="high" id="high-compression" />
                <div className="flex-1">
                  <Label htmlFor="high-compression" className="font-medium">High Compression</Label>
                  <p className="text-sm text-gray-500">Maximum compression, some quality loss</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-orange-600">~60% smaller</div>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* File Size Estimation */}
        {options.originalSize > 0 && (
          <div className="space-y-3">
            <Label className="text-sm font-medium block">Estimated Output Size</Label>
            
            <div className="flex items-center justify-between text-sm">
              <span>Original Size:</span>
              <span className="font-medium">{formatFileSize(options.originalSize)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Estimated Size:</span>
              <span className="font-medium text-green-600">{formatFileSize(options.estimatedSize)}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Space Saved:</span>
              <span className="font-medium text-blue-600">{getSavingsPercentage()}%</span>
            </div>
            
            <Progress value={getSavingsPercentage()} className="w-full" />
          </div>
        )}
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-blue-600" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Selected:</strong> {options.compressionLevel.charAt(0).toUpperCase() + options.compressionLevel.slice(1)} compression - {getQualityDescription(options.compressionLevel)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}