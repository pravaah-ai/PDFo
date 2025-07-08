# PDFo - Free Online PDF Tools

## Overview

PDFo is a comprehensive full-stack web application that provides a suite of free online PDF tools. The application allows users to merge, split, rotate, convert, and manipulate PDF files directly in their browser. Built with a modern tech stack, it offers a responsive, user-friendly interface with secure file processing capabilities.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI components with shadcn/ui styling
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **File Handling**: Custom file upload hooks with drag-and-drop support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **File Processing**: Multer for file uploads
- **Session Management**: PostgreSQL-backed sessions

## Key Components

### Database Schema (shared/schema.ts)
- **Users Table**: Basic user authentication with username/password
- **PDF Jobs Table**: Job queue system for processing PDF operations
  - Tracks job status (pending, processing, completed, failed)
  - Stores input/output file paths and error messages
  - Supports multiple tool types (merge, split, rotate, convert, etc.)

### API Layer (server/routes.ts)
- **Health Check**: `/api/health` - System status endpoint
- **PDF Processing**: `/api/pdf/process` - Main job creation endpoint
- **File Upload**: Multi-file upload support with validation
- **Job Management**: Asynchronous job processing system

### Storage Layer (server/storage.ts)
- **Interface-based Design**: IStorage interface for database operations
- **Memory Storage**: In-memory implementation for development
- **Database Operations**: CRUD operations for users and PDF jobs

### Frontend Components
- **Tool Pages**: Individual pages for each PDF tool
- **File Upload**: Drag-and-drop file upload with validation
- **Processing States**: Real-time job status updates
- **Tool Grid**: Comprehensive tool selection interface
- **Analytics**: Google Analytics integration for usage tracking

## Data Flow

1. **File Upload**: User selects PDF files via drag-and-drop or file picker
2. **Job Creation**: Frontend sends files to `/api/pdf/process` endpoint
3. **Processing**: Backend creates job record and processes files asynchronously
4. **Status Updates**: Frontend polls job status for real-time updates
5. **Download**: Processed files are made available for download

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL for production
- **Drizzle ORM**: Type-safe database access and migrations
- **Connection**: Uses `@neondatabase/serverless` driver

### File Processing
- **Multer**: Handles multipart/form-data file uploads
- **UUID**: Generates unique job identifiers
- **File System**: Temporary file storage in `uploads/` directory

### Analytics
- **Google Analytics**: User behavior tracking and tool usage metrics
- **Environment Variable**: `VITE_GA_MEASUREMENT_ID` for configuration

### UI Framework
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Pre-built component library
- **Lucide Icons**: Icon library for consistent iconography

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **Database**: Uses DATABASE_URL environment variable
- **File Storage**: Local file system for temporary files

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database Migrations**: Drizzle migrations in `migrations/` directory

### Environment Configuration
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **Analytics**: `VITE_GA_MEASUREMENT_ID` for Google Analytics
- **Session**: PostgreSQL-backed session storage

### Build Process
1. TypeScript compilation check
2. Frontend build with Vite
3. Backend bundling with ESBuild
4. Database schema push with Drizzle
5. Static asset serving configuration

## Changelog

- July 08, 2025. Initial setup
- July 08, 2025. Completed full PDFo application with:
  - 17 PDF tools implementation
  - Brand-aligned design with blue color scheme
  - Google Analytics integration
  - SEO optimization for all pages
  - File upload system with drag-and-drop
  - Backend API for PDF processing
  - Responsive design with mobile support
  - Donate button integration
- July 08, 2025. Enhanced to 23 PDF tools with full backend implementation:
  - Added 6 additional tools (compress-pdf, excel-to-pdf, reorder-pages, edit-metadata, lock-pdf, unlock-pdf)
  - Fixed icon mappings to match tool functions properly
  - Implemented real text extraction from PDFs using structured processing
  - Enhanced image conversion with proper format handling (JPG, PNG, TIFF)
  - Improved Excel to PDF with actual spreadsheet data parsing
  - Enhanced Word to PDF with mammoth library for text extraction
  - Advanced compression with file optimization and size reduction tracking
  - Professional security features for lock/unlock with visual indicators
  - Comprehensive PDF editor with annotations, toolbars, and editing metadata
  - Proper PNG/image to PDF conversion with scaling and centering
  - All 23 tools now have complete, functional backend implementations
- July 08, 2025. Implemented enterprise privacy compliance and security features:
  - **File Size Limit**: Set 25MB maximum file size across all tools for optimal performance
  - **Standardized Naming**: All processed files use "PDFo_toolname_jobId" naming convention  
  - **Temporary Storage Management**: Automatic cleanup scheduler removes files after 1 hour
  - **Privacy Compliance**: Full compliance with GDPR (EU), CCPA (California), India DPDP Act 2023
  - **Cookie Consent Banner**: Comprehensive cookie consent with essential/analytics options
  - **Privacy Notice Component**: Displays data protection info on all tool pages
  - **Privacy Policy Page**: Dedicated page explaining privacy practices and user rights
  - **Security Measures**: Encrypted transmission, isolated processing, minimal data collection
- July 08, 2025. Completed comprehensive company information architecture:
  - **About Us Page**: Complete company story, mission, values, and technology stack overview
  - **Terms of Service**: Full legal terms with user responsibilities, privacy, and liability disclaimers
  - **Contact Page**: Multi-channel contact system with categorized support (general, bugs, features, business)
  - **Footer Navigation**: Proper routing to all company pages with Link components
  - **Professional Content**: Enterprise-grade content for all company information pages
  - **Responsive Design**: All company pages fully responsive with consistent PDFo branding
- July 08, 2025. Fixed navigation system and smooth scrolling functionality:
  - **Header Navigation**: Proper routing with anchor links for homepage sections vs direct page links
  - **Smooth Scrolling**: Tools menu item smoothly scrolls to tools section when on homepage
  - **Mixed Navigation**: Homepage anchors use <a> tags with smooth scroll, pages use <Link> components
  - **Active Navigation**: All company pages (About, Privacy, Terms, Contact) working correctly
  - **Accessibility Fixes**: DialogContent components now include proper DialogTitle and DialogDescription
- July 08, 2025. Implemented comprehensive favicon system:
  - **Complete Favicon Package**: All favicon types from provided zip file extracted and configured
  - **Favicon Files**: favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
  - **Mobile Icons**: android-chrome-192x192.png, android-chrome-512x512.png for Android devices
  - **Web App Manifest**: site.webmanifest configured with PDFo branding and theme colors
  - **HTML Head Integration**: All favicon links properly integrated into client/index.html
  - **Brand Colors**: Theme color #0066cc (PDFo blue) configured in manifest
  - **Cross-Platform Support**: Icons support desktop browsers, mobile devices, and PWA installations
- July 08, 2025. Created comprehensive Admin Panel at /pdfo_pravaah_aite with Firebase Auth and Firestore:
  - **Firebase Integration**: Complete Firestore setup with collections for users, tools, blogs, tags, seo_config, feedback, admin_settings
  - **Admin Authentication**: Role-based access control with Firebase Auth, admin users stored in Firestore with role="admin"
  - **Admin Dashboard**: Overview with stats, recent activity, and quick action buttons for all admin functions
  - **Tool Management**: Full CRUD operations for all 23 PDF tools with categories, tags, enabled/disabled status
  - **Blog Management**: Rich text editor with ReactQuill, full blog post lifecycle (draft/published), image URLs, tags
  - **SEO Management**: Global SEO settings, page-specific meta tags, robots.txt configuration, Open Graph settings
  - **Tag Management**: Organize tags by type (blog/tool/seo), color coding, visibility controls, usage tracking
  - **Feedback Management**: View and manage user feedback with resolution status, search and filter capabilities
  - **Admin Settings**: Site-wide configurations including announcements, popups, footer content, analytics, maintenance mode
  - **Responsive Design**: Mobile-optimized admin interface with sidebar navigation and proper responsive layout
  - **Security**: Protected routes, admin role verification, proper access control for all admin functions


## User Preferences

Preferred communication style: Simple, everyday language.