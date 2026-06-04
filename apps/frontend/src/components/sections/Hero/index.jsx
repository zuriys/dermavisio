// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Badge from "../../global/Badge";
// import Button from "../../global/Button";
// import AuthModal from "../../global/AuthModal";
// import { ShieldCheck } from "lucide-react";

// export default function Hero({ image, isLoggedIn }) {
//   const navigate = useNavigate();
//   const [showAuthModal, setShowAuthModal] = useState(false);

//   // Debugging: Lihat di Console (F12) apakah data sampai ke sini
//   console.log("DEBUG HERO - image:", image);
//   console.log("DEBUG HERO - isLoggedIn:", isLoggedIn);

//   const handleStartClick = () => {
//     if (!isLoggedIn) {
//       setShowAuthModal(true);
//     } else {
//       navigate("/analyze");
//     }
//   };

//   return (
//     <>
//       <section className="relative overflow-hidden py-20 lg:py-32 px-6 bg-white">
//         {/* Dekorasi Background */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
//           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px]"></div>
//         </div>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
//           {/* SISI KIRI: TEKS */}
//           <div className="lg:col-span-6 flex flex-col gap-8 items-start text-left">
//             <Badge text="Analisis AI Standar Klinis" />
//             <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
//               Analisis Kulit Cerdas <br />
//               <span className="text-blue-600">Berbasis AI</span>
//             </h1>
//             <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
//               Inovasi sistem untuk pemeriksaan awal kondisi kesehatan kulit
//               menggunakan teknologi CNN tingkat lanjut.
//             </p>
//             <div className="flex flex-wrap items-center gap-6">
//               <Button
//                 variant="primary"
//                 onClick={handleStartClick}
//                 className="px-10 py-4 text-lg shadow-xl shadow-blue-100"
//               >
//                 Mulai Analisis Gratis →
//               </Button>
//             </div>
//           </div>

//           <div className="hidden lg:block lg:col-span-1"></div>
         

//           <div className="lg:col-span-5 relative group h-full flex items-center justify-center">
//             {/* 1. FOTO UTAMA (Pemeriksaan) */}
//             <div className="relative z-10 aspect-[4/5] w-full max-w-[400px] bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border-[10px] border-white transition-all duration-700 group-hover:scale-[0.98] group-hover:rotate-[-2deg]">
//               <img
//                 src={image}
//                 alt="Clinical Examination"
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* 2. FOTO KEDUA (Melayang - Detail/Zoom) */}
//             {/* Foto ini akan bergerak berlawanan arah saat di-hover */}
//             <div className="absolute -bottom-6 -right-6 z-20 w-48 h-48 bg-white rounded-[2rem] shadow-2xl border-[6px] border-white overflow-hidden transition-all duration-700 ease-out transform group-hover:translate-x-[-20px] group-hover:translate-y-[-20px] group-hover:scale-110 group-hover:rotate-[4deg]">
//               <img
//                 src="https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=500" // Gunakan foto close-up tahi lalat/kulit
//                 alt="Microscopic Detail"
//                 className="w-full h-full object-cover"
//               />
//               {/* Overlay tipis penanda AI */}
//               <div className="absolute inset-0 border-2 border-blue-500/30 rounded-[1.8rem] pointer-events-none"></div>
//             </div>

//             {/* Badge Kecil */}
//             <div className="absolute -bottom-4 -right-4 z-20 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
//                 <ShieldCheck className="w-5 h-5" />
//               </div>
//               <span className="text-xs font-bold text-slate-800 tracking-tight">
//                 Data Terenkripsi
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       <AuthModal
//         isOpen={showAuthModal}
//         onClose={() => setShowAuthModal(false)}
//       />
//     </>
//   );
// }





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