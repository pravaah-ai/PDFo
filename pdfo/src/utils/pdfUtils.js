import { PDFDocument } from 'pdf-lib'

/**
 * Merges multiple PDF files into a single PDF
 * @param {File[]} files - Array of PDF File objects
 * @returns {Promise<Uint8Array>} - Merged PDF as bytes
 */
export async function mergePDFs(files) {
  if (files.length === 0) {
    throw new Error('No files to merge')
  }

  if (files.length === 1) {
    // If only one file, return it as-is
    return new Uint8Array(await files[0].arrayBuffer())
  }

  const mergedPdf = await PDFDocument.create()

  for (const file of files) {
    try {
      // Read the file as array buffer
      const arrayBuffer = await file.arrayBuffer()
      
      // Load the PDF
      const pdf = await PDFDocument.load(arrayBuffer)
      
      // Get all pages from the PDF
      const pageCount = pdf.getPageCount()
      const pageIndices = Array.from({ length: pageCount }, (_, i) => i)
      
      // Copy all pages to the merged PDF
      const copiedPages = await mergedPdf.copyPages(pdf, pageIndices)
      
      // Add each page to the merged PDF
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page)
      })
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error)
      throw new Error(`Failed to process ${file.name}: ${error.message}`)
    }
  }

  // Serialize the merged PDF
  const pdfBytes = await mergedPdf.save()
  return pdfBytes
}

/**
 * Downloads a PDF file
 * @param {Uint8Array} pdfBytes - PDF bytes
 * @param {string} filename - Filename for download
 */
export function downloadPDF(pdfBytes, filename = 'merged.pdf') {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up the URL
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

/**
 * Gets information about a PDF file
 * @param {File} file - PDF File object
 * @returns {Promise<{pageCount: number, title: string, author: string}>}
 */
export async function getPDFInfo(file) {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    
    const pageCount = pdf.getPageCount()
    const title = pdf.getTitle() || file.name
    const author = pdf.getAuthor() || ''
    
    return {
      pageCount,
      title,
      author,
    }
  } catch (error) {
    console.error('Error getting PDF info:', error)
    return {
      pageCount: 0,
      title: file.name,
      author: '',
    }
  }
}

/**
 * Validates if a file is a valid PDF
 * @param {File} file - File to validate
 * @returns {Promise<boolean>}
 */
export async function validatePDF(file) {
  if (file.type !== 'application/pdf') {
    return false
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    await PDFDocument.load(arrayBuffer)
    return true
  } catch (error) {
    console.error('PDF validation failed:', error)
    return false
  }
}