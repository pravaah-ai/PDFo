import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { ShareSuccessModal } from "@/components/share-success-modal";

interface ShareButtonProps {
  toolName: string;
  fileName?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function ShareButton({ 
  toolName, 
  fileName, 
  variant = "outline", 
  size = "sm",
  className 
}: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setShowModal(true)}
        className={`${className}`}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
      
      <ShareSuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        toolName={toolName}
        fileName={fileName}
      />
    </>
  );
}