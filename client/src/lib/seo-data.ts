export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  path: string;
  purpose: string;
  ogImage?: string;
}

export const toolsData: Record<string, SEOData> = {
  "merge-pdf": {
    title: "Merge PDF",
    description: "Merge PDF tool lets you combine multiple PDF files into one for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "merge pdf, combine pdf, join pdf files, pdf merger tool",
    path: "/merge-pdf",
    purpose: "Combine multiple PDF files into one document",
    ogImage: "/images/tools/merge-pdf.png"
  },
  "split-pdf": {
    title: "Split PDF",
    description: "Split PDF tool lets you split one PDF into multiple pages for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "split pdf, separate pdf, divide pdf, extract pdf pages",
    path: "/split-pdf",
    purpose: "Split one PDF into multiple pages or documents",
    ogImage: "/images/tools/split-pdf.png"
  },
  "compress-pdf": {
    title: "Compress PDF",
    description: "Compress PDF tool lets you reduce PDF size while maintaining quality for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "compress pdf, reduce pdf size, optimize pdf, pdf compressor",
    path: "/compress-pdf",
    purpose: "Reduce PDF file size while maintaining quality",
    ogImage: "/images/tools/compress-pdf.png"
  },
  "pdf-to-word": {
    title: "PDF to Word",
    description: "PDF to Word tool lets you convert PDF into editable Word format for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "pdf to word, pdf to docx, convert pdf to word, pdf converter",
    path: "/pdf-to-word",
    purpose: "Convert PDF documents into editable Word format",
    ogImage: "/images/tools/pdf-to-word.png"
  },
  "word-to-pdf": {
    title: "Word to PDF",
    description: "Word to PDF tool lets you convert Word document to PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "word to pdf, docx to pdf, convert word to pdf, document converter",
    path: "/word-to-pdf",
    purpose: "Convert Word documents to PDF format",
    ogImage: "/images/tools/word-to-pdf.png"
  },
  "pdf-to-jpg": {
    title: "PDF to JPG",
    description: "PDF to JPG tool lets you convert PDF pages to high quality images for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "pdf to jpg, pdf to jpeg, convert pdf to image, pdf image converter",
    path: "/pdf-to-jpg",
    purpose: "Convert PDF pages to high quality JPG images",
    ogImage: "/images/tools/pdf-to-jpg.png"
  },
  "jpg-to-pdf": {
    title: "JPG to PDF",
    description: "JPG to PDF tool lets you convert images to single PDF file for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "jpg to pdf, image to pdf, photo to pdf, convert jpg to pdf",
    path: "/jpg-to-pdf",
    purpose: "Convert JPG images to PDF format",
    ogImage: "/images/tools/jpg-to-pdf.png"
  },
  "edit-pdf": {
    title: "Edit PDF",
    description: "Edit PDF tool lets you add or delete text/images in PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "edit pdf, modify pdf, pdf editor, add text to pdf",
    path: "/edit-pdf",
    purpose: "Add or delete text and images in PDF files",
    ogImage: "/images/tools/edit-pdf.png"
  },
  "sign-pdf": {
    title: "Sign PDF",
    description: "Sign PDF tool lets you add digital signature to a PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "sign pdf, digital signature, e-sign pdf, pdf signature",
    path: "/sign-pdf",
    purpose: "Add digital signatures to PDF documents",
    ogImage: "/images/tools/sign-pdf.png"
  },
  "protect-pdf": {
    title: "Protect PDF",
    description: "Protect PDF tool lets you add password protection to PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "protect pdf, password protect pdf, lock pdf, secure pdf",
    path: "/protect-pdf",
    purpose: "Add password protection to PDF documents",
    ogImage: "/images/tools/protect-pdf.png"
  },
  "unlock-pdf": {
    title: "Unlock PDF",
    description: "Unlock PDF tool lets you remove password from PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "unlock pdf, remove password pdf, decrypt pdf, unlock protected pdf",
    path: "/unlock-pdf",
    purpose: "Remove password protection from PDF documents",
    ogImage: "/images/tools/unlock-pdf.png"
  },
  "ocr-pdf": {
    title: "OCR PDF",
    description: "OCR PDF tool lets you convert scanned PDF to searchable text for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "ocr pdf, pdf text recognition, searchable pdf, scan to text",
    path: "/ocr-pdf",
    purpose: "Convert scanned PDF to searchable text using OCR",
    ogImage: "/images/tools/ocr-pdf.png"
  },
  "rearrange-pdf": {
    title: "Rearrange PDF",
    description: "Rearrange PDF tool lets you change the order of PDF pages for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "rearrange pdf, reorder pdf pages, organize pdf, sort pdf pages",
    path: "/rearrange-pdf",
    purpose: "Change the order of pages in PDF documents",
    ogImage: "/images/tools/rearrange-pdf.png"
  },
  "rotate-pdf": {
    title: "Rotate PDF",
    description: "Rotate PDF tool lets you rotate pages inside a PDF file for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "rotate pdf, turn pdf pages, flip pdf, rotate pdf pages",
    path: "/rotate-pdf",
    purpose: "Rotate pages inside PDF documents",
    ogImage: "/images/tools/rotate-pdf.png"
  },
  "delete-pages": {
    title: "Delete PDF Pages",
    description: "Delete PDF Pages tool lets you delete selected pages from PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "delete pdf pages, remove pdf pages, extract pdf pages",
    path: "/delete-pages",
    purpose: "Delete selected pages from PDF documents",
    ogImage: "/images/tools/delete-pages.png"
  },
  "add-page-numbers": {
    title: "Add Page Numbers",
    description: "Add Page Numbers tool lets you automatically add page numbers for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "add page numbers, number pdf pages, pdf page numbering",
    path: "/add-page-numbers",
    purpose: "Automatically add page numbers to PDF documents",
    ogImage: "/images/tools/add-page-numbers.png"
  },
  "add-watermark": {
    title: "Add Watermark",
    description: "Add Watermark tool lets you watermark your PDF document for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "add watermark, watermark pdf, pdf watermark, brand pdf",
    path: "/add-watermark",
    purpose: "Add watermarks to PDF documents",
    ogImage: "/images/tools/add-watermark.png"
  },
  "extract-pages": {
    title: "Extract PDF Pages",
    description: "Extract PDF Pages tool lets you extract selected pages to a new file for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "extract pdf pages, extract pdf, pdf page extractor",
    path: "/extract-pages",
    purpose: "Extract selected pages to create new PDF files",
    ogImage: "/images/tools/extract-pages.png"
  },
  "pdf-to-excel": {
    title: "PDF to Excel",
    description: "PDF to Excel tool lets you extract tables from PDF to Excel for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "pdf to excel, pdf to xlsx, convert pdf to excel, extract tables",
    path: "/pdf-to-excel",
    purpose: "Extract tables from PDF to Excel format",
    ogImage: "/images/tools/pdf-to-excel.png"
  },
  "excel-to-pdf": {
    title: "Excel to PDF",
    description: "Excel to PDF tool lets you convert spreadsheet to PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "excel to pdf, xlsx to pdf, convert excel to pdf, spreadsheet to pdf",
    path: "/excel-to-pdf",
    purpose: "Convert Excel spreadsheets to PDF format",
    ogImage: "/images/tools/excel-to-pdf.png"
  },
  "pdf-to-ppt": {
    title: "PDF to PPT",
    description: "PDF to PPT tool lets you convert PDF slides to PowerPoint for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "pdf to ppt, pdf to powerpoint, convert pdf to ppt, pdf presentation",
    path: "/pdf-to-ppt",
    purpose: "Convert PDF slides to PowerPoint format",
    ogImage: "/images/tools/pdf-to-ppt.png"
  },
  "ppt-to-pdf": {
    title: "PPT to PDF",
    description: "PPT to PDF tool lets you convert presentation to PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "ppt to pdf, powerpoint to pdf, convert ppt to pdf, presentation to pdf",
    path: "/ppt-to-pdf",
    purpose: "Convert PowerPoint presentations to PDF format",
    ogImage: "/images/tools/ppt-to-pdf.png"
  },
  "html-to-pdf": {
    title: "HTML to PDF",
    description: "HTML to PDF tool lets you convert HTML content/webpages to PDF for free. No signup, watermark-free. Fast, secure & easy.",
    keywords: "html to pdf, webpage to pdf, convert html to pdf, web to pdf",
    path: "/html-to-pdf",
    purpose: "Convert HTML content and webpages to PDF format",
    ogImage: "/images/tools/html-to-pdf.png"
  }
};

export const pagesData: Record<string, SEOData> = {
  "home": {
    title: "Free PDF Tools Online - PDFo",
    description: "Free online PDF tools to merge, split, compress, convert, edit, and manipulate PDF files. No signup required, watermark-free, fast and secure.",
    keywords: "PDF tools, compress PDF, merge PDF, edit PDF, convert PDF, free pdf tools online",
    path: "/",
    purpose: "Free online PDF tools for all your document needs"
  },
  "about": {
    title: "About PDFo - Free PDF Tools",
    description: "Learn about PDFo, your trusted source for free online PDF tools. We provide secure, fast, and easy-to-use PDF processing tools without watermarks.",
    keywords: "about PDFo, company info, pdf tools company, free pdf software",
    path: "/about",
    purpose: "Learn about PDFo and our mission to provide free PDF tools"
  },
  "contact": {
    title: "Contact PDFo - Get Help with PDF Tools",
    description: "Contact PDFo for support, feedback, or questions about our PDF tools. We're here to help you with all your PDF processing needs.",
    keywords: "contact us PDF tool, pdf support, help with pdf tools, customer service",
    path: "/contact",
    purpose: "Get in touch with PDFo for support and assistance"
  },
  "blog": {
    title: "PDF Tips, Guides, and Tutorials - PDFo Blog",
    description: "Learn how to work with PDFs effectively. Get tips, guides, and tutorials for PDF editing, conversion, compression, and more.",
    keywords: "pdf tutorials, how to pdf, pdf guides, pdf tips, pdf help",
    path: "/blog",
    purpose: "Learn how to work with PDFs through our helpful guides and tutorials"
  },
  "terms": {
    title: "Terms of Service - PDFo",
    description: "Read PDFo's Terms of Service to understand the terms and conditions for using our free PDF tools and services.",
    keywords: "pdf legal terms, terms of service, pdf tool terms, legal agreement",
    path: "/terms",
    purpose: "Terms and conditions for using PDFo services"
  },
  "privacy": {
    title: "Privacy Policy - PDFo",
    description: "Learn about PDFo's privacy policy and how we protect your data when using our free PDF tools. Your privacy is our priority.",
    keywords: "privacy policy, data protection, pdf privacy, secure pdf tools",
    path: "/privacy",
    purpose: "Information about how PDFo protects your privacy and data"
  }
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = "https://pdfo.replit.app";
  return `${baseUrl}${path}`;
};

export const generateOGImageUrl = (toolName: string): string => {
  return `https://pdfo.replit.app/images/tools/${toolName}.png`;
};