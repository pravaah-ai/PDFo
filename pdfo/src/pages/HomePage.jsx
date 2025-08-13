import { Link } from 'react-router-dom'
import { FileText, Merge, Zap, Shield } from 'lucide-react'

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Merge PDF Online
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Combine multiple PDF files into one document instantly. Fast, secure, and completely client-side - your files never leave your device.
            </p>
            <Link 
              to="/merge" 
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <FileText className="mr-2 h-5 w-5" />
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PDFo?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the fastest and most secure way to merge your PDF documents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Merge PDFs instantly with our optimized client-side processing. No waiting, no delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
                <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                100% Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your files never leave your device. Everything is processed locally in your browser.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-6">
                <Merge className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Drag and drop your files, reorder as needed, and download your merged PDF in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to merge your PDFs?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start combining your documents now - it's completely free!
          </p>
          <Link 
            to="/merge" 
            className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-medium text-lg rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Start Merging
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage