import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Unlock, AlertCircle } from "lucide-react";

interface UnlockOptionsProps {
  options: {
    password: string;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function UnlockOptions({ options, onOptionsChange, className }: UnlockOptionsProps) {
  const handlePasswordChange = (password: string) => {
    onOptionsChange({
      ...options,
      password
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Unlock className="h-5 w-5 text-green-600" />
          Unlock PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password */}
        <div>
          <Label htmlFor="unlock-password" className="text-sm font-medium mb-2 block">
            Current Password
          </Label>
          <Input
            id="unlock-password"
            type="password"
            placeholder="Enter current password to unlock"
            value={options.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Enter the password that was used to lock this PDF
          </p>
        </div>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Note:</strong> This will remove all password protection and restrictions from the PDF.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}