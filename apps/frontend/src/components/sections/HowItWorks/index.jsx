import React from "react";
import { UploadCloud, BrainCircuit, ClipboardCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // Pastikan sudah di-import di atas


export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Upload Image",
      desc: "Unggah foto area kulit yang jelas dengan aman. Resolusi tinggi menjamin akurasi yang lebih baik.",
      icon: <UploadCloud className="w-8 h-8" />,
      color: "blue",
    },
    {
      id: "02",
      title: "AI Processing",
      desc: "Arsitektur CNN kami menganalisis pola-pola dan membandingkannya dengan kumpulan data medis.",
      icon: <BrainCircuit className="w-8 h-8" />,
      color: "teal",
    },
    {
      id: "03",
      title: "Get Results",
      desc: "Terima laporan pemindaian yang rinci dengan skor kepercayaan dalam waktu yang singkat.",
      icon: <ClipboardCheck className="w-8 h-8" />,
      color: "indigo",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-white">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-20">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            How it Works
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
              {/* Box Ikon dengan Animasi Hover */}
              <div className="w-20 h-20 bg-white border-2 border-slate-100 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-slate-100 group-hover:border-blue-500 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 relative">
                
                {/* Badge Nomor Langkah */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white text-xs font-black rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  {step.id}
                </div>

                <div className="text-blue-600 group-hover:text-blue-500 transition-colors">
                  {step.icon}
                </div>
              </div>

              {/* Konten Teks */}
              <div className="space-y-3">
                <h4 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h4>
                <p className="text-sm leading-relaxed text-slate-500 px-2 text-pretty">
                  {step.desc}
                </p>
              </div>

              {/* Panah Indikator untuk Mobile (Hanya muncul jika bukan langkah terakhir) */}
              {index !== steps.length - 1 && (
                <div className="md:hidden mt-8 text-slate-200">
                   <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Button CTA Bawah */}
        <div className="mt-20">
          <button className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-[#004E98] transition-all hover:shadow-2xl hover:shadow-blue-200 flex items-center gap-3 mx-auto">
            Pelajari Teknologi Kami
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}