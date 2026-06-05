import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/cards/FeatureCard";
import Button from "../components/global/Button";
import HowItWorkswnb from "../components/sections/HowItWorkswnb";

// Import Assets Tim (Pastikan file ada di src/assets/)
import rupaImg from "../../assets/rupa.jpeg";
import albertImg from "../../assets/albert.jpeg";
import joImg from "../../assets/jo.jpeg";
import occaImg from "../../assets/occa.jpeg";
import gussakahImg from "../../assets/gussakah.jpeg";
import dianImg from "../../assets/dian.jpeg";

import melImg from "../../assets/mel.jpeg";
import bccImg from "../../assets/bcc.jpeg";
import akiecImg from "../../assets/akiec.jpeg";
import bklImg from "../../assets/bkl.jpeg";
import nvImg from "../../assets/nv.jpeg";
import vascImg from "../../assets/vasc.jpeg";
import dfImg from "../../assets/df.jpeg";

import {
  BrainCircuit,
  ShieldCheck,
  Target,
  Linkedin,
  Activity,
  ArrowRight,
  Mail,
  Globe,
} from "lucide-react";

const AboutPage = ({ isLoggedIn, onLogout }) => {
  const teamMembers = [
    {
      name: "Ni Luh Rupa Sri Astuti",
      role: "AI Engineer",
      image: rupaImg,
      linkedin: "https://www.linkedin.com/in/ni-luh-rupa-a31058378/",
    },
    {
      name: "Benedictus Albert Effendi",
      role: "AI Engineer",
      image: albertImg,
      linkedin: "https://linkedin.com/in/albert-effendi-875814285",
    },
    {
      name: "Jonathan Federico Tantoro",
      role: "Data Scientist",
      image: joImg,
      linkedin: "https://linkedin.com/in/jonathanft",
    },
    {
      name: "I Gede Abhijana Prayata W.",
      role: "Data Scientist",
      image: occaImg,
      linkedin: "https://www.linkedin.com/in/occawistara/",
    },
    {
      name: "I Gusti Agus Sakah Aditia",
      role: "FullStack Web Developer",
      image: gussakahImg,
      linkedin: "https://linkedin.com/in/gussakah",
    },
    {
      name: "Dian Resvina",
      role: "FullStack Web Developer",
      image: dianImg,
      linkedin: "https://linkedin.com/in/dianresvina",
    },
  ];

  const skinLesions = [
    {
      id: "MEL",
      name: "Melanoma",
      image: melImg,
      desc: "Jenis kanker kulit paling berbahaya yang muncul pada melanosit. Deteksi dini sangat krusial untuk keberhasilan pengobatan.",
    },
    {
      id: "BCC",
      name: "Basal Cell Carcinoma",
      image: bccImg,
      desc: "Bentuk kanker kulit yang paling umum. Biasanya tumbuh lambat dan jarang menyebar, namun harus segera ditangani.",
    },
    {
      id: "AKIEC",
      name: "Actinic Keratosis",
      image: akiecImg,
      desc: "Lesi pra-kanker yang kasar dan bersisik, biasanya disebabkan oleh paparan sinar matahari bertahun-tahun.",
    },
    {
      id: "BKL",
      name: "Benign Keratosis",
      image: bklImg,
      desc: "Pertumbuhan kulit jinak (non-kanker) yang sering muncul seiring bertambahnya usia, mirip dengan kutil.",
    },
    {
      id: "NV",
      name: "Melanocytic Nevi",
      image: nvImg,
      desc: "Tahi lalat biasa yang terbentuk dari melanosit. Sebagian besar jinak, namun perlu dipantau perubahannya.",
    },
    {
      id: "VASC",
      name: "Vascular Lesions",
      image: vascImg,
      desc: "Kondisi kulit yang melibatkan pembuluh darah, seperti angioma atau bercak merah akibat kelainan vaskular.",
    },
    {
      id: "DF",
      name: "Dermatofibroma",
      image: dfImg,
      desc: "Pertumbuhan kulit fibrosa jinak yang biasanya muncul sebagai benjolan kecil dan keras di kaki atau lengan.",
    },
  ];

  //   return (
  //     <div className="min-h-screen bg-white flex flex-col font-sans">
  //       {/* <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} /> */}

  //       <main className="flex-grow">
  //         {/* Header */}
  //         <section className="container mx-auto px-10 py-16 text-center">
  //           <h1 className="text-4xl font-extrabold text-[#091E42] mb-8">
  //             About <span className="text-[#004E98]">DermaVisio</span>
  //           </h1>
  //           <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-50 shadow-sm text-sm text-gray-500 italic">
  //             DermaVisio adalah aplikasi berbasis Artificial Intelligence yang
  //             dirancang untuk membantu deteksi dini lesi kulit melalui analisis
  //             citra dermatoskopi menggunakan teknologi Convolutional Neural
  //             Network (CNN).
  //           </div>
  //         </section>

  //         {/* Feature Cards */}
  //         <section className="container mx-auto px-10 mb-16">
  //           <div className="grid grid-cols-3 gap-6">
  //             <FeatureCard
  //               icon="⚠️"
  //               title="Educational Use Only"
  //               description="AI ini memberikan saran untuk pemeriksaan awal, bukan diagnosis medis akhir."
  //             />
  //             <FeatureCard
  //               icon="📈"
  //               title="85%+ Accuracy"
  //               description="Telah diverifikasi berdasarkan kumpulan data dan tolak ukur dermatologi profesional."
  //             />
  //             <FeatureCard
  //               icon="🛡️"
  //               title="Secure & Private"
  //               description="Enkripsi end-to-end untuk semua gambar yang diunggah dan data pasien."
  //             />
  //           </div>
  //         </section>

  //         {/* NEW SECTION: 7 Klasifikasi Lesi Kulit (Sesuai input_file_11.png) */}
  //         <section className="container mx-auto px-10 mb-20 space-y-6">
  //           <h2 className="text-center text-2xl font-bold text-[#091E42] mb-10">
  //             Klasifikasi Lesi Kulit
  //           </h2>
  //           {skinLesions.map((lesion, idx) => (
  //             <div
  //               key={idx}
  //               className="flex items-center gap-8 max-w-5xl mx-auto group"
  //             >
  //               {/* Box Gambar Penyakit */}
  //               <div className="w-24 h-24 shrink-0 bg-[#F9FAFB] rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
  //                 <img
  //                   src={lesion.image}
  //                   alt={lesion.name}
  //                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  //                   onError={(e) => {
  //                     e.target.src =
  //                       "https://via.placeholder.com/150?text=No+Img";
  //                   }}
  //                 />
  //               </div>

  //               {/* Box Informasi */}
  //               <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all group-hover:border-[#004E98]/30 group-hover:shadow-md">
  //                 <h4 className="font-bold text-[#004E98] mb-1">
  //                   {lesion.id}: {lesion.name}
  //                 </h4>
  //                 <p className="text-xs text-gray-500 leading-relaxed">
  //                   {lesion.desc}
  //                 </p>
  //               </div>
  //             </div>
  //           ))}
  //         </section>

  //         {/* How It Works */}

  //         <HowItWorkswnb isLoggedIn={isLoggedIn} />

  //         {/* Meet The Team */}
  //         <section className="container mx-auto px-10 py-24">
  //           <h2 className="text-3xl font-bold text-[#091E42] text-center mb-16">
  //             Meet The Team
  //           </h2>
  //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
  //             {teamMembers.map((member, index) => (
  //               <div
  //                 key={index}
  //                 className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all"
  //               >
  //                 <div className="relative aspect-[4/3] bg-[#F9FAFB] rounded-lg border border-dashed border-[#D1D9E6] flex items-center justify-center mb-4 overflow-hidden group">
  //                   <img
  //                     src={member.image}
  //                     alt={member.name}
  //                     className="w-full h-full object-cover transition-transform group-hover:scale-105"
  //                     onError={(e) => {
  //                       e.target.src =
  //                         "https://via.placeholder.com/400x300?text=No+Photo";
  //                     }}
  //                   />
  //                   <a
  //                     href={member.linkedin}
  //                     target="_blank"
  //                     rel="noopener noreferrer"
  //                     className="absolute bottom-3 right-3 bg-[#4B5563] p-1.5 rounded text-white cursor-pointer hover:bg-[#004E98] transition-colors z-20"
  //                   >
  //                     <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
  //                       <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  //                     </svg>
  //                   </a>
  //                 </div>
  //                 <div className="px-1">
  //                   <h4 className="font-bold text-[#091E42] text-sm">
  //                     {member.name}
  //                   </h4>
  //                   <p className="text-gray-400 text-[11px] font-medium">
  //                     {member.role}
  //                   </p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </section>
  //       </main>

  //       <Footer />
  //     </div>
  //   );
  // };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <main className="flex-grow">
        {/* --- 1. HEADER SECTION (Navy Style) --- */}
        <section className="bg-[#091E42] text-white pt-32 pb-20 px-6 lg:px-20 relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">
                Tentang <span className="text-blue-400">DermaVisio</span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100/70 max-w-3xl leading-relaxed text-pretty">
                DermaVisio adalah platform berbasis Artificial Intelligence yang
                dirancang untuk membantu deteksi dini lesi kulit melalui
                analisis citra dermatoskopi menggunakan teknologi Convolutional
                Neural Network (CNN).
              </p>
            </div>
          </div>
          {/* Ornamen Latar Belakang */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px]"></div>
        </section>

        {/* --- 2. CORE VALUES (RESPONSIVE GRID) --- */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-20 -mt-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              type="warning"
              title="Hanya Untuk Edukasi"
              desc="AI ini memberikan saran untuk pemeriksaan awal, bukan diagnosis medis akhir."
            />
            <FeatureCard
              type="info"
              title="Akurasi 85%+"
              desc="Telah diverifikasi berdasarkan kumpulan data dan standar dermatologi profesional."
            />
            <FeatureCard
              type="success"
              title="Aman & Privat"
              desc="Enkripsi end-to-end untuk semua gambar yang diunggah dan data pengguna."
            />
          </div>
        </section>

        {/* --- 3. KLASIFIKASI LESI (Modern List) --- */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Klasifikasi Lesi Kulit
            </h2>
            <p className="text-slate-500">
              Sistem kami mampu mengidentifikasi 7 kategori kondisi kulit utama.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
            {skinLesions.map((lesion, idx) => (
              <div
                key={idx}
                className="group flex flex-col md:flex-row items-center gap-6 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500"
              >
                {/* Image Box */}
                <div className="w-full md:w-24 h-40 md:h-24 shrink-0 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    src={lesion.image}
                    alt={lesion.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                {/* Content Box */}
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-lg font-black text-[#004E98] mb-1 uppercase tracking-tight">
                    {lesion.id}: {lesion.name}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {lesion.desc}
                  </p>
                </div>
                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                  <ArrowRight className="text-blue-300" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 4. HOW IT WORKS --- */}
        <div className="bg-slate-50">
          <HowItWorkswnb isLoggedIn={isLoggedIn} />
        </div>

        {/* --- 5. MEET THE TEAM (Premium Cards) --- */}
        <section className="container mx-auto px-10 py-24">
          //{" "}
          <h2 className="text-3xl font-bold text-[#091E42] text-center mb-16">
            // Meet The Team //{" "}
          </h2>
          //{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] bg-[#F9FAFB] rounded-lg border border-dashed border-[#D1D9E6] flex items-center justify-center mb-4 overflow-hidden group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Photo";
                    }}
                  />
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 bg-[#4B5563] p-1.5 rounded text-white cursor-pointer hover:bg-[#004E98] transition-colors z-20"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
                <div className="px-1">
                  <h4 className="font-bold text-[#091E42] text-sm">
                    {member.name}
                  </h4>
                  <p className="text-gray-400 text-[11px] font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- 6. MEDICAL DISCLAIMER (Standout) --- */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-20 pb-24">
          <div className="bg-red-50 border-2 border-red-100 rounded-[3rem] p-10 md:p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-red-200 mb-4">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-red-900 text-3xl font-black tracking-tight">
              Peringatan Medis Penting
            </h2>
            <p className="text-red-700/80 max-w-4xl mx-auto text-lg leading-relaxed font-medium">
              DermaVisio adalah alat bantu skrining awal dan{" "}
              <strong>bukan pengganti diagnosa medis profesional</strong>.
              Seluruh hasil analisis harus dikonsultasikan kembali dengan dokter
              spesialis kulit berlisensi sebelum mengambil tindakan medis apa
              pun.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default AboutPage;
