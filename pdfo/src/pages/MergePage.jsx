import { useState } from 'react'
import { Download, FileText, Loader2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import UploadArea from '../components/UploadArea'
import SortableFileList from '../components/SortableFileList'
import { mergePDFs, downloadPDF } from '../utils/pdfUtils'

function MergePage() {
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFilesAdded = (newFiles) => {
    if (Array.isArray(newFiles)) {
      // Adding new files
      setFiles(prev => [...prev, ...newFiles])
    } else {
      // This is actually a filtered array (when removing files from UploadArea)
      setFiles(newFiles)
    }
    setError(null)
  }

  const handleFilesReorder = (reorderedFiles) => {
    setFiles(reorderedFiles)
  }

  const handleFileRemove = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleClearAll = () => {
    setFiles([])
    setError(null)
  }

  const handleMergePDFs = async () => {
    if (files.length === 0) {
      setError('Please add at least one PDF file to merge.')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const mergedPdfBytes = await mergePDFs(files)
      
      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10)
      const filename = `merged-pdf-${timestamp}.pdf`
      
      downloadPDF(mergedPdfBytes, filename)
      
    } catch (err) {
      console.error('Error merging PDFs:', err)
      setError(err.message || 'Failed to merge PDFs. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/" 
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Merge PDF Files
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Upload multiple PDF files, reorder them as needed, and merge them into a single document. 
            All processing happens in your browser - your files never leave your device.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Upload PDF Files
          </h2>
          <UploadArea onFilesAdded={handleFilesAdded} files={files} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* File List and Controls */}
        {files.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
                Files to Merge
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={handleClearAll}
                  className="btn-secondary"
                >
                  Clear All
                </button>
                <button
                  onClick={handleMergePDFs}
                  disabled={isLoading || files.length === 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Merging...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Merged PDF
                    </>
                  )}
                </button>
              </div>
            </div>

            <SortableFileList
              files={files}
              onFilesReorder={handleFilesReorder}
              onFileRemove={handleFileRemove}
            />

            {files.length > 0 && (
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-1">
                      Ready to Merge
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {files.length} file{files.length !== 1 ? 's' : ''} will be merged in the order shown above. 
                      You can drag and drop to reorder them before merging.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        {files.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Files Uploaded Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Upload your PDF files using the upload area above. You can add multiple files and reorder them before merging.
            </p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <p>✓ Drag and drop multiple PDF files</p>
              <p>✓ Reorder files before merging</p>
              <p>✓ Preview each PDF file</p>
              <p>✓ 100% client-side processing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MergePage