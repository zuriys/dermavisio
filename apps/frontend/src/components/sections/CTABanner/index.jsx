import React from "react";
// Import Button global jika Anda sudah membuatnya
import Button from "../../global/Button"; 
import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Box Biru Utama */}
        <div className="bg-blue-700 rounded-[2rem] p-12 md:p-20 text-center text-white shadow-xl relative overflow-hidden">
          
          {/* Konten Teks */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Start Your Analysis Today
            </h2>
            <p className="text-blue-100 text-lg md:text-xl">
              Join thousands of users who trust DermAI for their preliminary skin health screening.
            </p>
            
            <div className="pt-4 flex justify-center">
              <Link to="/analyze">
                <button className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95">
                  Upload Your First Image
                </button>
              </Link>
            </div>
          </div>

          {/* Dekorasi lingkaran samar di background (opsional, agar estetik seperti desain) */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-900/30 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}