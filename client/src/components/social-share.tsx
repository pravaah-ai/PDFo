import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Share2, 
  Copy,
  Check,
  Mail
} from "lucide-react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaWhatsapp,
  FaTelegram,
  FaReddit 
} from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  toolName: string;
  fileName?: string;
  className?: string;
}

export function SocialShare({ toolName, fileName, className }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = window.location.href;
  const shareTitle = `I just used PDFo to ${toolName.toLowerCase()} my PDF file${fileName ? ` "${fileName}"` : ''}!`;
  const shareText = `Check out PDFo - free online PDF tools! I just processed my PDF with their ${toolName} tool. ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const socialLinks = [
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(shareText)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      color: "bg-blue-400 hover:bg-blue-500",
    },
    {
      name: "Reddit",
      icon: FaReddit,
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText)}`,
      color: "bg-gray-600 hover:bg-gray-700",
    },
  ];

  const handleShare = (url: string, platform: string) => {
    window.open(url, '_blank', 'width=600,height=400');
    
    // Track share event with analytics
    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'share', {
          method: platform,
          content_type: 'pdf_tool',
          content_id: toolName,
        });
      }
      
      // Also track with our internal analytics
      console.log(`Social share: ${platform} - ${toolName}`);
    } catch (error) {
      console.log('Analytics tracking failed:', error);
    }
  };

  return (
    <Card className={`border-gray-200 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Share2 className="h-5 w-5 text-pdfo-blue mr-2" />
          <h3 className="text-lg font-semibold text-pdfo-dark-grey">
            Share your success!
          </h3>
        </div>
        
        <p className="text-gray-600 mb-6 text-sm">
          Let others know about PDFo's amazing PDF tools
        </p>

        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="sm"
                onClick={() => handleShare(social.url, social.name.toLowerCase())}
                className={`${social.color} text-white border-0 hover:opacity-90 transition-opacity`}
              >
                <social.icon className="h-4 w-4 mr-2" />
                {social.name}
              </Button>
            ))}
          </div>

          {/* Copy Link Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share Statistics */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Join thousands of users who love PDFo's free PDF tools
          </p>
        </div>
      </CardContent>
    </Card>
  );
}