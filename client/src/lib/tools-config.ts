import React from "react";
import { 
  FileX2, Scissors, Trash2, RotateCw, Droplets, 
  Minimize, Maximize, Shield, FileText, File, 
  FileImage, FileSpreadsheet, Image, BookOpen,
  Zap, Palette, Files
} from "lucide-react";

export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  acceptedFiles: string;
  category: 'core' | 'converter';
}

export const toolsConfig: Record<string, ToolConfig> = {
  'merge-pdf': {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    icon: 'Files',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100 group-hover:bg-blue-200',
    path: '/merge-pdf',
    metaTitle: 'Merge PDF Files Online - Free PDF Merger | PDFo',
    metaDescription: 'Combine multiple PDF files into one document easily. Free online PDF merger tool with drag-and-drop support.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'split-pdf': {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    icon: 'Scissors',
    iconColor: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100 group-hover:bg-orange-200',
    path: '/split-pdf',
    metaTitle: 'Split PDF Files Online - Free PDF Splitter | PDFo',
    metaDescription: 'Split PDF documents into separate pages or extract specific pages. Fast and secure online PDF splitter.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'delete-pdf-pages': {
    id: 'delete-pdf-pages',
    title: 'Delete PDF Pages',
    description: 'Remove unwanted pages from your PDF documents quickly and easily.',
    icon: 'Trash2',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100 group-hover:bg-red-200',
    path: '/delete-pdf-pages',
    metaTitle: 'Delete PDF Pages Online - Remove PDF Pages | PDFo',
    metaDescription: 'Remove unwanted pages from PDF documents. Select and delete specific pages from your PDF files online.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'rotate-pdf': {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
    icon: 'RotateCw',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100 group-hover:bg-purple-200',
    path: '/rotate-pdf',
    metaTitle: 'Rotate PDF Online - Free PDF Rotator | PDFo',
    metaDescription: 'Rotate PDF pages clockwise or counterclockwise. Fix orientation of PDF documents online for free.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'watermark-pdf': {
    id: 'watermark-pdf',
    title: 'Watermark PDF',
    description: 'Add watermarks to your PDF documents to protect your intellectual property.',
    icon: 'Droplets',
    iconColor: 'text-teal-600',
    bgColor: 'bg-teal-50 hover:bg-teal-100 group-hover:bg-teal-200',
    path: '/watermark-pdf',
    metaTitle: 'Add Watermark to PDF Online - PDF Watermarker | PDFo',
    metaDescription: 'Add text or image watermarks to PDF documents. Protect your PDFs with custom watermarks online.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'page-numbers-pdf': {
    id: 'page-numbers-pdf',
    title: 'Page Numbers',
    description: 'Add page numbers to your PDF documents for better organization.',
    icon: 'Palette',
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50 hover:bg-indigo-100 group-hover:bg-indigo-200',
    path: '/page-numbers-pdf',
    metaTitle: 'Add Page Numbers to PDF Online - PDF Page Numbering | PDFo',
    metaDescription: 'Add page numbers to PDF documents with custom formatting. Number PDF pages online for free.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'pdf-editor': {
    id: 'pdf-editor',
    title: 'PDF Editor',
    description: 'Add text, images, shapes, and annotations to your PDF documents.',
    icon: 'Zap',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100 group-hover:bg-green-200',
    path: '/pdf-editor',
    metaTitle: 'Edit PDF Online - Free PDF Editor | PDFo',
    metaDescription: 'Edit PDF documents online. Add text, images, shapes, and annotations to your PDF files.',
    acceptedFiles: '.pdf',
    category: 'core',
  },
  'pdf-to-jpg': {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    icon: 'FileImage',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50 hover:bg-yellow-100 group-hover:bg-yellow-200',
    path: '/pdf-to-jpg',
    metaTitle: 'Convert PDF to JPG Online - PDF to Image Converter | PDFo',
    metaDescription: 'Convert PDF pages to JPG images online. Extract images from PDF documents with high quality.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-png': {
    id: 'pdf-to-png',
    title: 'PDF to PNG',
    description: 'Convert PDF pages to high-quality PNG images with transparency support.',
    icon: 'Image',
    iconColor: 'text-pink-600',
    bgColor: 'bg-pink-50 hover:bg-pink-100 group-hover:bg-pink-200',
    path: '/pdf-to-png',
    metaTitle: 'Convert PDF to PNG Online - PDF to PNG Converter | PDFo',
    metaDescription: 'Convert PDF pages to PNG images with transparency support. High-quality PDF to PNG conversion online.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-tiff': {
    id: 'pdf-to-tiff',
    title: 'PDF to TIFF',
    description: 'Convert PDF documents to high-quality TIFF image format.',
    icon: 'FileImage',
    iconColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50 hover:bg-cyan-100 group-hover:bg-cyan-200',
    path: '/pdf-to-tiff',
    metaTitle: 'Convert PDF to TIFF Online - PDF to TIFF Converter | PDFo',
    metaDescription: 'Convert PDF documents to TIFF images online. High-quality PDF to TIFF conversion with multiple pages support.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-json': {
    id: 'pdf-to-json',
    title: 'PDF to JSON',
    description: 'Extract structured data from PDF documents in JSON format.',
    icon: 'Zap',
    iconColor: 'text-slate-600',
    bgColor: 'bg-slate-50 hover:bg-slate-100 group-hover:bg-slate-200',
    path: '/pdf-to-json',
    metaTitle: 'Convert PDF to JSON Online - Extract PDF Data | PDFo',
    metaDescription: 'Extract structured data from PDF documents in JSON format. Convert PDF content to machine-readable JSON.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-word': {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Convert PDF files into editable Word documents. The best quality PDF to Word conversion.',
    icon: 'FileText',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100 group-hover:bg-blue-200',
    path: '/pdf-to-word',
    metaTitle: 'Convert PDF to Word Online - PDF to DOC Converter | PDFo',
    metaDescription: 'Convert PDF files to editable Word documents online. Best quality PDF to Word conversion with formatting preserved.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-ppt': {
    id: 'pdf-to-ppt',
    title: 'PDF to PPT',
    description: 'Turn your PDF files into editable PowerPoint presentations.',
    icon: 'File',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50 hover:bg-red-100 group-hover:bg-red-200',
    path: '/pdf-to-ppt',
    metaTitle: 'Convert PDF to PowerPoint Online - PDF to PPT Converter | PDFo',
    metaDescription: 'Convert PDF files to PowerPoint presentations online. Transform PDF documents into editable PPT slides.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-txt': {
    id: 'pdf-to-txt',
    title: 'PDF to TXT',
    description: 'Extract text content from PDF documents as plain text files.',
    icon: 'FileText',
    iconColor: 'text-gray-600',
    bgColor: 'bg-gray-50 hover:bg-gray-100 group-hover:bg-gray-200',
    path: '/pdf-to-txt',
    metaTitle: 'Convert PDF to Text Online - PDF to TXT Converter | PDFo',
    metaDescription: 'Extract text from PDF documents online. Convert PDF content to plain text files for easy editing.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'pdf-to-excel': {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Convert PDF files to Excel spreadsheets. Perfect for data analysis.',
    icon: 'FileSpreadsheet',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100 group-hover:bg-green-200',
    path: '/pdf-to-excel',
    metaTitle: 'Convert PDF to Excel Online - PDF to XLS Converter | PDFo',
    metaDescription: 'Convert PDF files to Excel spreadsheets online. Extract tables and data from PDF to Excel format.',
    acceptedFiles: '.pdf',
    category: 'converter',
  },
  'png-to-pdf': {
    id: 'png-to-pdf',
    title: 'PNG to PDF',
    description: 'Convert PNG images to PDF documents. Combine multiple images into one PDF.',
    icon: 'File',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100 group-hover:bg-purple-200',
    path: '/png-to-pdf',
    metaTitle: 'Convert PNG to PDF Online - Image to PDF Converter | PDFo',
    metaDescription: 'Convert PNG images to PDF documents online. Combine multiple PNG files into a single PDF.',
    acceptedFiles: '.png',
    category: 'converter',
  },
  'word-to-pdf': {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF format while preserving the original formatting.',
    icon: 'BookOpen',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100 group-hover:bg-blue-200',
    path: '/word-to-pdf',
    metaTitle: 'Convert Word to PDF Online - DOC to PDF Converter | PDFo',
    metaDescription: 'Convert Word documents to PDF online. Transform DOC and DOCX files to PDF with original formatting.',
    acceptedFiles: '.doc,.docx',
    category: 'converter',
  },
};

export const getToolConfig = (toolType: string): ToolConfig | undefined => {
  return toolsConfig[toolType];
};

export const getAllTools = (): ToolConfig[] => {
  return Object.values(toolsConfig);
};

export const getToolsByCategory = (category: 'core' | 'converter'): ToolConfig[] => {
  return Object.values(toolsConfig).filter(tool => tool.category === category);
};

export const getToolIcon = (toolId: string, colorClass: string) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'merge-pdf': Files,
    'split-pdf': Scissors,
    'delete-pdf-pages': Trash2,
    'rotate-pdf': RotateCw,
    'watermark-pdf': Droplets,
    'compress-pdf': Minimize,
    'crop-pdf': Maximize,
    'protect-pdf': Shield,
    'page-numbers-pdf': Palette,
    'pdf-editor': Zap,
    'pdf-to-jpg': FileImage,
    'pdf-to-png': Image,
    'pdf-to-tiff': FileImage,
    'pdf-to-json': Zap,
    'pdf-to-word': FileText,
    'pdf-to-ppt': File,
    'pdf-to-txt': FileText,
    'pdf-to-excel': FileSpreadsheet,
    'png-to-pdf': File,
    'word-to-pdf': BookOpen,
  };
  
  const IconComponent = iconMap[toolId] || File;
  return React.createElement(IconComponent, { className: `h-8 w-8 ${colorClass}` });
};
