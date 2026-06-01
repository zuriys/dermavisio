

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowRight, ShieldCheck } from "lucide-react";
import AuthModal from "../../global/AuthModal";

export default function CTABanner({ isLoggedIn }) {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate("/analyze");
    }
  };

  return (
    <>
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          {/* Card Utama dengan Gradient & Glassmorphism */}
          <div className="relative bg-gradient-to-br from-[#004E98] to-[#003366] rounded-[3.5rem] p-12 md:p-24 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,78,152,0.3)]">
            
            {/* Dekorasi Ornamen Cahaya (Blobs) */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            {/* Konten Utama */}
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Badge Kecil di Atas */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                <ShieldCheck className="w-4 h-4 text-blue-200" />
                <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">Enkripsi End-to-End</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 max-w-4xl text-balance">
                Siap Untuk Mengetahui <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-teal-200">
                  Kesehatan Kulit Anda?
                </span>
              </h2>

              <p className="text-blue-100/80 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed text-pretty">
                Dapatkan hasil analisis instan dalam hitungan detik. Bergabunglah dengan pengguna lain yang telah mempercayakan deteksi dini mereka pada teknologi AI kami.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Tombol Utama */}
                <button 
                  onClick={handleStartClick}
                  className="group relative flex items-center gap-3 bg-white text-[#004E98] px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:scale-95"
                >
                  <Upload className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
                  Mulai Unggah Foto
                </button>

                {/* Tombol Sekunder */}
                <button 
                  onClick={() => navigate('/about')}
                  className="flex items-center gap-2 text-white/80 hover:text-white font-bold transition-colors"
                >
                  Pelajari Teknologi
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Info Tambahan */}
              <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-50 border-t border-white/10 pt-8 w-full max-w-lg">
                <span className="text-xs text-white uppercase font-bold tracking-widest">Gratis</span>
                <span className="text-xs text-white uppercase font-bold tracking-widest">Anonim</span>
                <span className="text-xs text-white uppercase font-bold tracking-widest">Aman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}