import React, { useState } from "react"; // Tambahkan useState
import { useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import {
  UploadCloud,
  BrainCircuit,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";
import AuthModal from "../../global/AuthModal";

export default function HowItWorks({ isLoggedIn }) { // Terima prop isLoggedIn
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Fungsi Logika: Cek Login sebelum ke halaman About
  const handleAboutClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true); // Tampilkan modal jika belum login
    } else {
      navigate("/about"); // Pindah ke halaman about jika sudah login
    }
  };

  const steps = [
    {
      id: "01",
      title: "Unggah Foto",
      desc: "Unggah foto area kulit yang jelas dengan aman. Resolusi tinggi menjamin akurasi yang lebih baik.",
      icon: <UploadCloud className="w-8 h-8" />,
    },
    {
      id: "02",
      title: "Proses AI",
      desc: "Arsitektur CNN kami menganalisis pola-pola dan membandingkannya dengan kumpulan data medis.",
      icon: <BrainCircuit className="w-8 h-8" />,
    },
    {
      id: "03",
      title: "Dapatkan Hasil",
      desc: "Terima laporan pemindaian yang rinci dengan skor kepercayaan dalam waktu yang singkat.",
      icon: <ClipboardCheck className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <section className="relative py-32 overflow-hidden bg-white">
        {/* Dekorasi Background Halus */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              How It Works
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto text-balance">
              Tiga langkah sederhana untuk mendapatkan analisis kulit tingkat profesional dari kenyamanan rumah Anda.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            {/* Garis Penghubung (Hanya muncul di Desktop) */}
            <div className="hidden md:block absolute top-10 inset-x-[10%] h-px border-t-2 border-dashed border-slate-200 -z-10 pointer-events-none"></div>

            {steps.map((step, index) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-slate-100 group-hover:border-blue-500 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white text-xs font-black rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    {step.id}
                  </div>
                  <div className="text-blue-600 group-hover:text-blue-500 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-500 px-2 text-pretty">
                    {step.desc}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <div className="md:hidden mt-8 text-slate-200">
                    <ArrowRight className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Button CTA Bawah dengan Logic */}
          <div className="mt-20 flex justify-center">
            <button
              onClick={handleAboutClick}
              className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-[#004E98] transition-all hover:shadow-2xl hover:shadow-blue-200 flex items-center gap-3 active:scale-95"
            >
              Pelajari Teknologi Kami
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Komponen Modal untuk Alert Login */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}