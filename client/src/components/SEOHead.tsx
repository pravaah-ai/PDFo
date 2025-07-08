import { Helmet } from "react-helmet-async";
import { SEOData, generateCanonicalUrl, generateOGImageUrl } from "@/lib/seo-data";

interface SEOHeadProps {
  data: SEOData;
  structuredData?: object;
}

export function SEOHead({ data, structuredData }: SEOHeadProps) {
  const canonicalUrl = generateCanonicalUrl(data.path);
  const ogImageUrl = data.ogImage || generateOGImageUrl(data.path.replace("/", ""));

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{data.title} - PDFo | Fast & Secure PDF Tools</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={`${data.title} - PDFo`} />
      <meta property="og:description" content={data.purpose} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="PDFo" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={`${data.title} - PDFo`} />
      <meta name="twitter:description" content={data.purpose} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="PDFo" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0066cc" />
      <meta name="msapplication-TileColor" content="#0066cc" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Website structured data for homepage
export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PDFo",
  "url": "https://pdfo.replit.app",
  "description": "Free online PDF tools to merge, split, compress, convert, edit, and manipulate PDF files.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pdfo.replit.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PDFo",
    "url": "https://pdfo.replit.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://pdfo.replit.app/favicon-32x32.png"
    }
  }
};

// Software Application structured data for tool pages
export const generateToolStructuredData = (toolData: SEOData) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": toolData.title,
  "description": toolData.description,
  "url": `https://pdfo.replit.app${toolData.path}`,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PDFo",
    "url": "https://pdfo.replit.app"
  }
});

// Breadcrumb structured data for tool pages
export const generateBreadcrumbStructuredData = (toolData: SEOData) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://pdfo.replit.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "PDF Tools",
      "item": "https://pdfo.replit.app/#tools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": toolData.title,
      "item": `https://pdfo.replit.app${toolData.path}`
    }
  ]
});

// FAQ structured data for tool pages
export const generateFAQStructuredData = (toolName: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": `How do I use ${toolName} tool?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Simply upload your PDF file, configure the settings, and click process. Your file will be processed quickly and securely.`
      }
    },
    {
      "@type": "Question",
      "name": `Is ${toolName} free to use?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, ${toolName} is completely free to use. No registration required and no watermarks added to your files.`
      }
    },
    {
      "@type": "Question",
      "name": `Is my data secure when using ${toolName}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Yes, all files are processed securely and automatically deleted after processing. We don't store your files permanently.`
      }
    }
  ]
});