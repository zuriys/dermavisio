import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../global/Badge";
import Button from "../../global/Button";
import AuthModal from "../../global/AuthModal"; 
import { ShieldCheck } from "lucide-react";

export default function Hero({ image, isLoggedIn }) {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Debugging: Lihat di Console (F12) apakah data sampai ke sini
  console.log("DEBUG HERO - image:", image);
  console.log("DEBUG HERO - isLoggedIn:", isLoggedIn);

  const handleStartClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      navigate("/analyze");
    }
  };

  return (
    <>
      <section className="relative overflow-hidden py-20 lg:py-32 px-6 bg-white">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* SISI KIRI: TEKS */}
          <div className="lg:col-span-6 flex flex-col gap-8 items-start text-left">
            <Badge text="Analisis AI Standar Klinis" />
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Analisis Kulit Cerdas <br />
              <span className="text-blue-600">Berbasis AI</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              Inovasi sistem untuk pemeriksaan awal kondisi kesehatan kulit menggunakan teknologi CNN tingkat lanjut.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Button 
                variant="primary" 
                onClick={handleStartClick} 
                className="px-10 py-4 text-lg shadow-xl shadow-blue-100"
              >
                Mulai Analisis Gratis →
              </Button>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* SISI KANAN: GAMBAR */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-50 to-teal-50 rounded-[3.5rem] -z-10"></div>
            <div className="relative z-10 aspect-[4/5] bg-white rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden border-[10px] border-white ring-1 ring-slate-100">
              {image ? (
                <img 
                  src={image} 
                  alt="Skin Analysis" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full bg-slate-50 animate-pulse flex items-center justify-center text-slate-400 italic">
                  Gambar tidak ditemukan...
                </div>
              )}
            </div>

            {/* Badge Kecil */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-800 tracking-tight">Data Terenkripsi</span>
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