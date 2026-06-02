import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/cards/FeatureCard";
import Button from "../components/global/Button";

// Import Assets Tim (Pastikan file ada di src/assets/)
import rupaImg from "../../assets/rupa.jpeg";
import albertImg from "../../assets/albert.png";
import joImg from "../../assets/jo.png";
import occaImg from "../../assets/occa.png";
import gussakahImg from "../../assets/gussakah.jpeg";
import dianImg from "../../assets/dian.jpeg";

import melImg from "../../assets/mel.jpeg";
import bccImg from "../../assets/bcc.jpeg";
import akiecImg from "../../assets/akiec.jpeg";
import bklImg from "../../assets/bkl.jpeg";
import nvImg from "../../assets/nv.jpeg";
import vascImg from "../../assets/vasc.jpeg";
import dfImg from "../../assets/df.jpeg";

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
      linkedin: "https://linkedin.com/in/occa-prayata-9b1a5b1b8",
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

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} /> */}

      <main className="flex-grow">
        {/* Header */}
        <section className="container mx-auto px-10 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-[#091E42] mb-8">
            About <span className="text-[#004E98]">DermaVisio</span>
          </h1>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-50 shadow-sm text-sm text-gray-500 italic">
            DermaVisio adalah aplikasi berbasis Artificial Intelligence yang
            dirancang untuk membantu deteksi dini lesi kulit melalui analisis
            citra dermatoskopi menggunakan teknologi Convolutional Neural
            Network (CNN).
          </div>
        </section>

        {/* Feature Cards */}
        <section className="container mx-auto px-10 mb-16">
          <div className="grid grid-cols-3 gap-6">
            <FeatureCard
              icon="⚠️"
              title="Educational Use Only"
              description="AI ini memberikan saran untuk pemeriksaan awal, bukan diagnosis medis akhir."
            />
            <FeatureCard
              icon="📈"
              title="95%+ Accuracy"
              description="Telah diverifikasi berdasarkan kumpulan data dan tolak ukur dermatologi profesional."
            />
            <FeatureCard
              icon="🛡️"
              title="Secure & Private"
              description="Enkripsi end-to-end untuk semua gambar yang diunggah dan data pasien."
            />
          </div>
        </section>

        {/* NEW SECTION: 7 Klasifikasi Lesi Kulit (Sesuai input_file_11.png) */}
        <section className="container mx-auto px-10 mb-20 space-y-6">
          <h2 className="text-center text-2xl font-bold text-[#091E42] mb-10">
            Klasifikasi Lesi Kulit
          </h2>
          {skinLesions.map((lesion, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 max-w-5xl mx-auto group"
            >
              {/* Box Gambar Penyakit */}
              <div className="w-24 h-24 shrink-0 bg-[#F9FAFB] rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                <img
                  src={lesion.image}
                  alt={lesion.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Img";
                  }}
                />
              </div>

              {/* Box Informasi */}
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all group-hover:border-[#004E98]/30 group-hover:shadow-md">
                <h4 className="font-bold text-[#004E98] mb-1">
                  {lesion.id}: {lesion.name}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {lesion.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* How It Works */}
        <section className="py-20 text-center bg-[#F9FBFF]">
          <h2 className="text-3xl font-bold text-[#091E42] mb-4">
            How it Works
          </h2>
          <p className="text-gray-400 text-sm mb-16">
            Tiga langkah mudah untuk analisis kulit berkualitas profesional.
          </p>
          <div className="flex justify-center items-start max-w-5xl mx-auto relative mb-12">
            {[
              {
                step: "01",
                title: "Upload Image",
                icon: "📷",
                desc: "Unggah foto area kulit yang jelas dengan aman.",
              },
              {
                step: "02",
                title: "AI Processing",
                icon: "🧠",
                desc: "Arsitektur CNN kami menganalisis pola pada level mikroskopik.",
              },
              {
                step: "03",
                title: "Get Results",
                icon: "📋",
                desc: "Dapatkan laporan skrining terperinci beserta skor kepercayaan.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-1/3 px-4 z-10"
              >
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center mb-4 text-[#004E98] text-2xl">
                  {item.icon}
                </div>
                <p className="text-[10px] font-bold text-[#004E98] uppercase tracking-widest mb-1">
                  Step {item.step}
                </p>
                <h4 className="font-bold text-gray-800 text-sm mb-2">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
            <div className="absolute top-8 left-[15%] right-[15%] h-[1px] border-t border-dashed border-gray-200"></div>
          </div>
          <Button className="mx-auto px-10 bg-[#004E98]">
            Selengkapnya <span className="ml-2">→</span>
          </Button>
        </section>

        {/* Meet The Team */}
        <section className="container mx-auto px-10 py-24">
          <h2 className="text-3xl font-bold text-[#091E42] text-center mb-16">
            Meet The Team
          </h2>
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
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
