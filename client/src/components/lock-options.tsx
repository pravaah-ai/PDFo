import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Lock, Eye, Edit, Printer } from "lucide-react";

interface LockOptionsProps {
  options: {
    password: string;
    confirmPassword: string;
    requirePasswordToOpen: boolean;
    restrictEditing: boolean;
    restrictPrinting: boolean;
  };
  onOptionsChange: (options: any) => void;
  className?: string;
}

export function LockOptions({ options, onOptionsChange, className }: LockOptionsProps) {
  const handlePasswordChange = (password: string) => {
    onOptionsChange({
      ...options,
      password
    });
  };

  const handleConfirmPasswordChange = (confirmPassword: string) => {
    onOptionsChange({
      ...options,
      confirmPassword
    });
  };

  const handleRequirePasswordChange = (requirePasswordToOpen: boolean) => {
    onOptionsChange({
      ...options,
      requirePasswordToOpen
    });
  };

  const handleRestrictEditingChange = (restrictEditing: boolean) => {
    onOptionsChange({
      ...options,
      restrictEditing
    });
  };

  const handleRestrictPrintingChange = (restrictPrinting: boolean) => {
    onOptionsChange({
      ...options,
      restrictPrinting
    });
  };

  const passwordsMatch = options.password === options.confirmPassword;
  const passwordValid = options.password.length >= 4;

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lock className="h-5 w-5 text-red-600" />
          Lock PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password */}
        <div>
          <Label htmlFor="password" className="text-sm font-medium mb-2 block">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={options.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {options.password && !passwordValid && (
            <p className="text-sm text-red-500 mt-1">
              Password must be at least 4 characters long
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirm-password" className="text-sm font-medium mb-2 block">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            value={options.confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          />
          {options.confirmPassword && !passwordsMatch && (
            <p className="text-sm text-red-500 mt-1">
              Passwords do not match
            </p>
          )}
          {options.confirmPassword && passwordsMatch && passwordValid && (
            <p className="text-sm text-green-500 mt-1">
              Passwords match ✓
            </p>
          )}
        </div>

        <Separator />

        {/* Security Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-600" />
              <div>
                <Label htmlFor="require-password" className="font-medium">Require Password to Open</Label>
                <p className="text-sm text-gray-500">Users must enter password to view the PDF</p>
              </div>
            </div>
            <Switch
              id="require-password"
              checked={options.requirePasswordToOpen}
              onCheckedChange={handleRequirePasswordChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-orange-600" />
              <div>
                <Label htmlFor="restrict-editing" className="font-medium">Restrict Editing</Label>
                <p className="text-sm text-gray-500">Prevent modifications to the PDF content</p>
              </div>
            </div>
            <Switch
              id="restrict-editing"
              checked={options.restrictEditing}
              onCheckedChange={handleRestrictEditingChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Printer className="h-4 w-4 text-purple-600" />
              <div>
                <Label htmlFor="restrict-printing" className="font-medium">Restrict Printing</Label>
                <p className="text-sm text-gray-500">Prevent printing of the PDF</p>
              </div>
            </div>
            <Switch
              id="restrict-printing"
              checked={options.restrictPrinting}
              onCheckedChange={handleRestrictPrintingChange}
            />
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            <strong>Important:</strong> Keep your password safe. Lost passwords cannot be recovered.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}