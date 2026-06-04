import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Hero from "../components/sections/Hero";
import HowItWorks from "../components/sections/HowItWorks";
import CTABanner from "../components/sections/CTABanner";
import FeatureCard from "../components/cards/FeatureCard";

// 1. IMPORT FOTO LOKAL
import heroImage from "../assets/images/hero-skin.jpg"; 

// Tambahkan prop { isLoggedIn } agar bisa dikirim ke Hero
export default function Home({ isLoggedIn }) {
  return (

    
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
    

      <main>
        {/* 1. HERO SECTION */}
        {/* Kirim image DAN isLoggedIn ke Hero untuk proteksi tombol 'Mulai Analisis' */}
        <Hero image={heroImage} isLoggedIn={isLoggedIn} />
        

        {/* 2. FEATURES GRID SECTION */}
        <section className="relative pt-4   py-24 overflow-hidden bg-slate-50/50">
          
          {/* Dekorasi Background v4 Style: Pola titik-titik (Dot Pattern) */}
           <div className="absolute inset-0 opacity-40 bg-medical-dots"></div>

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            {/* Judul Section */}
            <div className="mb-20 text-center space-y-4">
              <br />
              <br />
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-600 animate-in fade-in duration-700">
                Keunggulan Utama
              </h2>
              <h3 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl text-balance">
                Teknologi Cerdas untuk <br /> Kesehatan Kulit Anda
              </h3>
            </div>

            {/* Grid Kartu Fitur */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
              <FeatureCard 
                  type="warning"
                  title="Hanya Untuk Edukasi"
                  desc="Hasil analisis AI ini bersifat screening awal. Selalu konsultasikan kondisi medis Anda dengan dokter spesialis kulit (Dermatolog)."
              />
              <FeatureCard 
                  type="info"
                  title="Akurasi 85%+"
                  desc="Model CNN kami dilatih dengan ribuan dataset klinis yang telah tervalidasi oleh pakar medis internasional secara berkala."
              />
              <FeatureCard 
                  type="success"
                  title="Aman & Privat"
                  desc="Privasi data adalah prioritas utama. Semua foto yang diunggah diproses dengan enkripsi end-to-end dan tidak akan disebarluaskan."
              />
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS SECTION */}
        <HowItWorks />
        <CTABanner isLoggedIn={isLoggedIn} /> 

        {/* 4. CTA BANNER SECTION */}
        
      </main>

      <Footer />
    </div>
  );
}




