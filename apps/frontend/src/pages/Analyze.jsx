import React from 'react';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';
import Button from '../components/global/Button';

const AnalyzePage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
          <h1 className="text-3xl font-bold text-[#091E42]">Skin Analysis</h1>
          <p className="text-gray-500 mt-2">Please upload a clear, well-lit photo of the affected area.</p>

          {/* Area Upload */}
          <div className="mt-8 border-2 border-dashed border-[#D1E1F5] rounded-xl p-20 flex flex-col items-center justify-center bg-[#FBFDFF]">
            <div className="w-16 h-16 bg-[#E8F1FF] rounded-xl flex items-center justify-center mb-4 text-[#004E98]">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </div>
            <h3 className="text-xl font-bold text-[#004E98]">Upload Your Scan</h3>
            <p className="text-gray-400 mt-1 mb-6">Drag and drop JPEG, PNG, or TIFF files here</p>
            
            {/* Button Global yang bisa dipakai temanmu juga */}
            <Button variant="outline" className="px-10 border-[#004E98] text-[#004E98]">
              SELECT FILE
            </Button>
          </div>
        </div>

        {/* Info Privasi */}
        <div className="w-full max-w-5xl mt-6 bg-[#F0F7FF] border-l-4 border-[#004E98] p-5 rounded-r-xl flex items-start gap-4">
          <span className="text-[#004E98] text-xl">🛡️</span>
          <div>
            <h4 className="font-bold text-[#091E42]">Data Privacy</h4>
            <p className="text-sm text-gray-500">Your medical data is encrypted and HIPAA compliant.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalyzePage;