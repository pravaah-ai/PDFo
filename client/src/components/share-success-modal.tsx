import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SocialShare } from "@/components/social-share";
import { Share2, X } from "lucide-react";

interface ShareSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  fileName?: string;
}

export function ShareSuccessModal({ 
  isOpen, 
  onClose, 
  toolName, 
  fileName 
}: ShareSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-pdfo-blue" />
            Great job! Share your success
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <p className="text-gray-600 mb-6 text-sm">
            You've successfully processed your PDF! Let others know about PDFo's amazing tools.
          </p>
          
          <SocialShare
            toolName={toolName}
            fileName={fileName}
            className="border-0 shadow-none"
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="text-gray-600"
            >
              <X className="h-4 w-4 mr-2" />
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}