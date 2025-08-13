import { useCallback, useState } from 'react'
import { Upload, FileText, X } from 'lucide-react'

function UploadArea({ onFilesAdded, files = [] }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const pdfFiles = droppedFiles.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length !== droppedFiles.length) {
      alert('Please only upload PDF files.')
    }
    
    if (pdfFiles.length > 0) {
      onFilesAdded(pdfFiles)
    }
  }, [onFilesAdded])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    // Only set to false if we're leaving the upload area entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false)
    }
  }, [])

  const handleFileInput = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files)
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf')
    
    if (pdfFiles.length !== selectedFiles.length) {
      alert('Please only upload PDF files.')
    }
    
    if (pdfFiles.length > 0) {
      onFilesAdded(pdfFiles)
    }
    
    // Reset the input
    e.target.value = ''
  }, [onFilesAdded])

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${
            isDragOver 
              ? 'bg-blue-100 dark:bg-blue-800' 
              : 'bg-gray-100 dark:bg-gray-700'
          }`}>
            <Upload className={`h-8 w-8 ${
              isDragOver 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400'
            }`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Drop PDF files here
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              or click to browse your computer
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Supports multiple PDF files
            </div>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Uploaded Files ({files.length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onFilesAdded(files.filter((_, i) => i !== index))}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadArea