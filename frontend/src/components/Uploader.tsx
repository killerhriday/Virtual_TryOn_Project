import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import type { ClothingItem } from '../data';

interface UploaderProps {
  item: ClothingItem;
}

export default function Uploader({ item }: UploaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('clientImage', file);
    formData.append('clothingId', item.id); // e.g. '001'

    try {
      // Send to our local Mac Hub Backend (which forwards it as an async job)
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        // The job successfully started, now we begin polling!
        pollForStatus();
      } else {
        console.error('Generation failed:', data);
        setIsUploading(false);
        let errorMsg = data.error || 'Server error occurred.';
        if (data.details) {
          const detailStr = typeof data.details === 'object' ? JSON.stringify(data.details) : data.details;
          errorMsg += ` (Details: ${detailStr})`;
        }
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      console.error('Network error:', error);
      setIsUploading(false);
      setErrorMessage('Failed to reach local backend server.');
    }
  };

  const pollForStatus = () => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:3001/api/status');
        const state = await res.json();

        if (state.status === 'completed' && state.imageUrl) {
          clearInterval(interval);
          setGeneratedImage(state.imageUrl);
          setIsSuccess(true);
          setIsUploading(false);
        } else if (state.status === 'error') {
          clearInterval(interval);
          setErrorMessage(state.error || 'AI Server reported an error during generation.');
          setIsUploading(false);
        }
      } catch (err) {
        console.error('Polling error', err);
      }
    }, 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="md:flex">
        {/* Product Details Side */}
        <div className={`md:w-1/2 aspect-square md:aspect-auto ${item.imageColor} relative flex items-center justify-center p-12 overflow-hidden`}>
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" />
          )}
          <div className="text-center relative z-10 bg-white/70 p-6 rounded-xl backdrop-blur-sm">
            <span className="text-gray-500 font-medium tracking-widest uppercase text-xs block mb-2">Product Details</span>
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-gray-800 font-semibold mt-2">{item.price}</p>
          </div>
        </div>

        {/* Virtual Try-On Uploader Side */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-50">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Virtual Try-On</h3>
            <p className="text-gray-600 mt-2">See how the {item.name} looks on you. Upload a full-body photo to begin.</p>
          </div>

          <div 
            className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-colors duration-300 ${isHovered ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {!isUploading && !isSuccess && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center"
                >
                  <UploadCloud size={48} className="text-gray-400 mb-4" />
                  <p className="text-gray-700 font-medium mb-1">Drag and drop your photo</p>
                  <p className="text-gray-500 text-sm mb-6">PNG or JPG up to 10MB</p>
                  
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <label className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors w-full sm:w-auto cursor-pointer inline-block text-center">
                    Select Photo
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                  </label>
                </motion.div>
              )}

              {isUploading && (
                <motion.div 
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-8"
                >
                  <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin mb-4"></div>
                  <p className="text-gray-900 font-medium">Generating fitting views...</p>
                </motion.div>
              )}

              {isSuccess && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 size={24} className="text-green-600" />
                  </div>
                  <p className="text-gray-900 font-medium mb-6">Fitting Complete!</p>
                  
                  <div className="w-full max-w-sm">
                    {generatedImage ? (
                      <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <img src={generatedImage} alt="Generated Fitting" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] rounded-lg bg-green-50 flex flex-col items-center justify-center text-green-700 text-sm border border-green-200 shadow-sm p-6 text-center">
                        <svg className="w-12 h-12 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="font-bold text-lg mb-2">Sent to AI Server!</span>
                        <span className="text-sm opacity-90">Both photos successfully reached your friend's laptop. Waiting for AI generation...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
