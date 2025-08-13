import { useEffect, useRef, useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { FileText, Loader2 } from 'lucide-react'

function PDFPreview({ file, index }) {
  const canvasRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    if (!file) return

    const renderPreview = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Read the file as array buffer
        const arrayBuffer = await file.arrayBuffer()
        
        // Load the PDF with pdf-lib
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pages = pdfDoc.getPages()
        setPageCount(pages.length)

        if (pages.length === 0) {
          throw new Error('PDF has no pages')
        }

        // Get the first page
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()

        // Calculate canvas dimensions (limit to reasonable size)
        const maxWidth = 200
        const maxHeight = 280
        const scale = Math.min(maxWidth / width, maxHeight / height)
        const canvasWidth = width * scale
        const canvasHeight = height * scale

        // Set up canvas
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = canvasWidth
        canvas.height = canvasHeight
        const ctx = canvas.getContext('2d')

        // Clear canvas
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvasWidth, canvasHeight)

        // Create a new PDF with just the first page for rendering
        const singlePagePdf = await PDFDocument.create()
        const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [0])
        singlePagePdf.addPage(copiedPage)

        // Serialize the single page PDF
        const pdfBytes = await singlePagePdf.save()
        
        // Create a blob URL for the PDF
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
        const pdfUrl = URL.createObjectURL(pdfBlob)

        // Use PDF.js-like rendering by creating an iframe (fallback method)
        // For better rendering, we'll draw a placeholder for now
        await renderPDFToCanvas(pdfBytes, canvas, canvasWidth, canvasHeight)

        // Clean up
        URL.revokeObjectURL(pdfUrl)
        
      } catch (err) {
        console.error('Error rendering PDF preview:', err)
        setError('Failed to load PDF preview')
      } finally {
        setIsLoading(false)
      }
    }

    renderPreview()
  }, [file])

  // Simplified PDF to canvas rendering
  const renderPDFToCanvas = async (pdfBytes, canvas, width, height) => {
    const ctx = canvas.getContext('2d')
    
    // For now, we'll create a nice placeholder since full PDF rendering 
    // requires additional libraries like PDF.js
    ctx.fillStyle = '#f8f9fa'
    ctx.fillRect(0, 0, width, height)
    
    // Add a border
    ctx.strokeStyle = '#dee2e6'
    ctx.lineWidth = 1
    ctx.strokeRect(0, 0, width, height)
    
    // Add PDF icon and text
    ctx.fillStyle = '#6c757d'
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.textAlign = 'center'
    
    // Draw PDF icon representation
    ctx.fillStyle = '#dc3545'
    ctx.fillRect(width/2 - 15, height/2 - 25, 30, 35)
    ctx.fillStyle = 'white'
    ctx.font = 'bold 10px sans-serif'
    ctx.fillText('PDF', width/2, height/2 - 5)
    
    // Add file name (truncated)
    ctx.fillStyle = '#495057'
    ctx.font = '10px sans-serif'
    const fileName = file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name
    ctx.fillText(fileName, width/2, height/2 + 20)
    
    // Add page count
    ctx.fillText(`${pageCount} page${pageCount !== 1 ? 's' : ''}`, width/2, height/2 + 35)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-48 h-64 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <FileText className="h-8 w-8 text-red-500 mb-2" />
        <p className="text-xs text-red-600 dark:text-red-400 text-center px-2">
          {error}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className={`border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm bg-white ${
            isLoading ? 'opacity-50' : ''
          }`}
          style={{ maxWidth: '200px', maxHeight: '280px' }}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 rounded-lg">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        )}
      </div>
      
      <div className="text-center max-w-48">
        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
          {file.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {pageCount > 0 && `${pageCount} page${pageCount !== 1 ? 's' : ''} • `}
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
  )
}

export default PDFPreview