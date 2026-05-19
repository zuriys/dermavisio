import React, { useState } from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import { ClipboardCheck, ShieldAlert } from "lucide-react"; // Install lucide-react jika belum

export default function ResultPage() {
  // Data dummy yang nantinya akan diisi dari hasil response Axios
  const [analysisResult, setAnalysisResult] = useState({
    condition: "Benign Nevus (Common Mole)",
    description: "The AI model has identified characteristics consistent with a benign growth. No immediate signs of malignancy detected.",
    confidence: 98.2,
    nextSteps: "Monitor for changes in size, color, or shape. Consult a dermatologist for a professional evaluation if you notice rapid developments or itching."
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Analysis Complete</h1>
          <p className="text-slate-600 max-w-2xl">
            Your diagnostic scan has been processed by our clinical DermaVisio engine. 
            Please review the findings below.
          </p>
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top Border Accent (Teal color from image) */}
          <div className="h-2 bg-teal-600 w-full"></div>

          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              
              {/* Left Side: Condition Info */}
              <div className="flex-grow space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded bg-teal-50 text-teal-700 text-xs font-bold tracking-wider uppercase mb-2">
                    Predicted Condition
                  </span>
                  <h2 className="text-3xl font-bold text-slate-900">
                    {analysisResult.condition}
                  </h2>
                </div>
                
                <p className="text-slate-600 leading-relaxed text-lg max-w-2xl">
                  {analysisResult.description}
                </p>
              </div>

              {/* Right Side: Confidence Score */}
              <div className="w-full md:w-auto bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center min-w-[160px]">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                  Confidence
                </p>
                <p className="text-4xl font-extrabold text-teal-600">
                  {analysisResult.confidence}%
                </p>
              </div>
            </div>

            {/* Bottom Section: Next Steps */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <ClipboardCheck className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Suggested Next Steps</h4>
                  <p className="text-slate-600">
                    {analysisResult.nextSteps}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Kecil di bawah card (opsional tapi bagus untuk medis) */}
        <p className="mt-6 text-center text-slate-400 text-xs">
          Disclaimer: This analysis is for educational purposes and is not a substitute for professional medical advice.
        </p>
      </main>

      <Footer />
    </div>
  );
}