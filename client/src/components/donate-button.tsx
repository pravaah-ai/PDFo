import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

interface DonateButtonProps {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function DonateButton({ 
  variant = "default", 
  size = "default",
  className 
}: DonateButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={`bg-pdfo-warning hover:bg-amber-600 text-white ${className}`}
    >
      <a
        href="https://buymeacoffee.com/pravaah"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Coffee className="mr-2 h-4 w-4" />
        Buy me a coffee
      </a>
    </Button>
  );
}
