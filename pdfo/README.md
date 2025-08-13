# PDFo - Merge PDF Online

A modern, client-side PDF merging tool built with React, Vite, and PDF-lib. Merge multiple PDF files into one document instantly, with real-time previews and drag-and-drop functionality.

![PDFo Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=PDFo+-+Merge+PDF+Online)

## ✨ Features

- **🚀 Fast & Secure**: 100% client-side processing - your files never leave your device
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, intuitive interface with dark mode support
- **📄 PDF Preview**: Real-time canvas preview of uploaded PDF files
- **🔄 Drag & Drop**: Reorder files before merging with intuitive drag-and-drop
- **⚡ Instant Processing**: Merge PDFs instantly using PDF-lib
- **🌙 Dark Mode**: Built-in dark mode toggle for comfortable viewing

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **PDF Processing**: PDF-lib
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pdfo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage

1. **Upload PDFs**: Drag and drop PDF files or click to browse
2. **Preview**: View real-time previews of each uploaded PDF
3. **Reorder**: Drag and drop files to change the merge order
4. **Merge**: Click "Download Merged PDF" to get your combined document

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with logo and dark mode
│   ├── UploadArea.jsx  # File upload with drag & drop
│   ├── PDFPreview.jsx  # PDF preview using canvas
│   └── SortableFileList.jsx # Drag & drop file reordering
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   └── MergePage.jsx   # PDF merge tool page
├── utils/              # Utility functions
│   └── pdfUtils.js     # PDF processing utilities
├── hooks/              # Custom React hooks (future use)
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

### UploadArea
Handles file uploads with drag-and-drop functionality and file validation.

### PDFPreview  
Renders PDF previews using canvas and PDF-lib for instant visual feedback.

### SortableFileList
Provides drag-and-drop reordering of files before merging.

### PDF Utilities
Client-side PDF processing, merging, and download functionality.

## 🎨 Customization

### Styling
The app uses Tailwind CSS for styling. Customize the design by:
- Modifying `tailwind.config.js`
- Adding custom classes in `src/index.css`
- Using Tailwind utilities in components

### Adding New PDF Tools
The architecture is designed for easy extension:
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Extend `src/utils/pdfUtils.js` with new PDF operations
4. Update routing in `App.jsx`

## 🔒 Privacy & Security

- **No Server Required**: All processing happens in your browser
- **No Data Upload**: Files never leave your device
- **Client-Side Only**: No backend, no tracking, no data collection

## 🚧 Future Enhancements

- PDF splitting tool
- PDF compression
- Password protection/removal
- OCR text extraction
- Page rotation and deletion
- Watermark addition

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

If you encounter any issues, please [create an issue](../../issues) on GitHub.

---

**PDFo** - Simple, fast, and secure PDF merging tool. Built with ❤️ using React and PDF-lib.
