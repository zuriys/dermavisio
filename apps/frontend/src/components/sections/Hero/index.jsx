import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, CheckCircle, ShieldCheck } from "lucide-react";
import AuthModal from "../../global/AuthModal";

export default function Hero({ image, isLoggedIn }) {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartClick = () => {
    if (!isLoggedIn) setShowAuthModal(true);
    else navigate("/analyze");
  };

  return (
    <>
      {/* 1. BACKGROUND UTAMA: Menggunakan Biru Tua Medis yang elegan */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#091E42]">
        
        {/* 2. IMAGE TREATMENT: Foto ditaruh di background sisi kanan dengan efek memudar (Fade) */}
        <div className="absolute inset-0 z-0">
          {image && (
            <div className="relative w-full h-full">
              <img 
                src={image} 
                alt="Medical Background" 
                className="absolute right-0 w-full lg:w-[65%] h-full object-cover object-center lg:object-right opacity-60 lg:opacity-100"
              />
              {/* Overlay Gradient: Inilah rahasia agar foto menyatu dengan teks di kiri */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#091E42] via-[#091E42]/80 to-transparent"></div>
            </div>
          )}
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 w-full pt-20 pb-40">
          <div className="max-w-3xl space-y-10">
            
          <br />
          <br/>

            {/* Typography: Putih agar Pop-up */}
            <h1 className="text-6xl lg:text-[100px] font-bold text-white leading-[0.95] tracking-tighter">
              Analisis cerdas, <br />
              <span className="text-blue-400">hasil akurat.</span>
            </h1>

            <p className="text-xl text-blue-100/70 max-w-xl leading-relaxed">
              Tim profesional kami berkomitmen memberikan layanan deteksi dini kesehatan kulit berbasis AI dengan privasi data 100% terjamin.
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <button 
                onClick={handleStartClick}
                className="bg-white text-[#091E42] px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-blue-50 hover:-translate-y-1 transition-all active:scale-95"
              >
                Mulai Analisis
              </button>
              
            </div>

            {/* Floating User Badge (Versi lebih clean) */}
            <div className="pt-10 flex items-center gap-4">
                          </div>
          </div>
        </div>

        {/* 3. STATS BAR: Glassmorphism murni di bawah layar */}
        <div className="absolute bottom-0 left-0 w-full px-8 lg:px-20 pb-12">
          <div className="max-w-[1440px] mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 lg:p-14 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center">
              <div className="space-y-1">
                <h3 className="text-4xl font-black text-white">85%</h3>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Akurasi Model</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-8">
                <h3 className="text-4xl font-black text-white">&lt; 5dtk</h3>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Waktu Proses</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-8 hidden lg:block">
                <h3 className="text-4xl font-black text-white">5000+</h3>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Dataset Klinis</p>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-8 hidden lg:block">
                <h3 className="text-4xl font-black text-white">7/24</h3>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Layanan Sistem</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}