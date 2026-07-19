import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, ChevronLeft } from 'lucide-react';
import Catalog from './components/Catalog';
import Uploader from './components/Uploader';
import type { ClothingItem } from './data';

function App() {
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      
      {/* Modern E-Commerce Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 lg:hidden">
                <Menu size={24} />
              </button>
              <div className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer" onClick={() => setSelectedItem(null)}>
                N O R M C O R E
              </div>
            </div>
            
            <nav className="hidden lg:flex space-x-8">
              <a href="#" className="text-gray-900 font-medium hover:text-blue-600">New Arrivals</a>
              <a href="#" className="text-gray-500 font-medium hover:text-gray-900">Men</a>
              <a href="#" className="text-gray-500 font-medium hover:text-gray-900">Women</a>
              <a href="#" className="text-gray-500 font-medium hover:text-gray-900">Accessories</a>
            </nav>

            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-gray-500"><Search size={20} /></button>
              <button className="text-gray-400 hover:text-gray-500 relative">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedItem ? (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">All Products</h1>
                <p className="mt-2 text-sm text-gray-500">Browse our latest collection. Click an item to try it on virtually.</p>
              </div>
              <Catalog onSelectItem={setSelectedItem} />
            </motion.div>
          ) : (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8 transition-colors"
              >
                <ChevronLeft size={16} className="mr-1" /> Back to Catalog
              </button>
              <Uploader item={selectedItem} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Standard Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-sm text-gray-500">&copy; 2026 Normcore E-Commerce. Standard Clothing Website.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
