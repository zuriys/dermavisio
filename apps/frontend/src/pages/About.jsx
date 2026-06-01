import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/cards/FeatureCard";
import Button from "../components/global/Button";

const AboutPage = ({ isLoggedIn, onLogout }) => {
  const teamMembers = [
    { name: "Ni Luh Rupa Sri Astuti", role: "AI Engineer" },
    { name: "Benedictus Albert Effendi", role: "AI Engineer" },
    { name: "Jonathan Federico Tantoro", role: "Data Scientist" },
    { name: "I Gede Abhijana Prayata W.", role: "Data Scientist" },
    { name: "I Gusti Agus Sakah Aditia", role: "FullStack Web Developer" },
    { name: "Dian Resvina", role: "FullStack Web Developer" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} /> */}

      <main className="flex-grow">
        {/* About Header Section */}
        <section className="container mx-auto px-10 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-[#091E42] mb-8">
            About <span className="text-[#004E98]">DermaVisio</span>
          </h1>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-50 shadow-sm text-sm text-gray-500 leading-relaxed italic">
            DermaVisio adalah aplikasi berbasis Artificial Intelligence yang
            dirancang untuk membantu deteksi dini lesi kulit melalui analisis
            citra dermatoskopi. Sistem ini memanfaatkan teknologi Convolutional
            Neural Network (CNN) untuk mengklasifikasikan berbagai jenis lesi
            kulit secara otomatis. Dengan antarmuka web yang sederhana dan
            responsif, DermaVisio bertujuan meningkatkan kesadaran masyarakat
            terhadap pentingnya pemeriksaan kulit sejak dini secara lebih mudah
            dan cepat.
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="container mx-auto px-10 mb-20">
          <div className="grid grid-cols-3 gap-6">
            <FeatureCard
              icon="⚠️"
              title="Educational Use Only"
              description="The AI provides screening suggestions, not final medical diagnoses."
            />
            <FeatureCard
              icon="📈"
              title="95%+ Accuracy"
              description="Validated against professional dermatological datasets and benchmarks."
            />
            <FeatureCard
              icon="🛡️"
              title="Secure & Private"
              description="End-to-end encryption for all uploaded images and patient data."
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold text-[#091E42] mb-4">
            How it Works
          </h2>
          <p className="text-gray-400 text-sm mb-16">
            Three simple steps to professional-grade skin analysis from the
            comfort of your home.
          </p>

          <div className="flex justify-center items-start max-w-5xl mx-auto relative mb-12">
            {[
              {
                step: "01",
                title: "Upload Image",
                icon: "📷",
                desc: "Securely upload a clear photo of the skin area under natural lighting.",
              },
              {
                step: "02",
                title: "AI Processing",
                icon: "🧠",
                desc: "Our CNN architecture analyzes patterns at a microscopic level.",
              },
              {
                step: "03",
                title: "Get Results",
                icon: "📋",
                desc: "Receive a detailed screening report with confidence scores.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center w-1/3 px-4 relative z-10"
              >
                <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center mb-4">
                  <span className="text-2xl text-[#004E98]">{item.icon}</span>
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
            <div className="absolute top-8 left-[15%] right-[15%] h-[1px] border-t border-dashed border-gray-200 -z-0"></div>
          </div>

          <Button className="mx-auto px-10 bg-[#004E98]">
            Selengkapnya <span className="ml-2">→</span>
          </Button>
        </section>

        <hr className="border-gray-100 my-10" />

        {/* Meet The Team Section */}
        <section className="container mx-auto px-10 py-16">
          <h2 className="text-3xl font-bold text-[#091E42] text-center mb-16">
            Meet The Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] bg-[#F9FAFB] rounded-lg border border-dashed border-[#D1D9E6] flex items-center justify-center mb-4 overflow-hidden group">
                  {/* Ikon Placeholder Foto */}
                  <div className="text-[#004E98]/20 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  {/* LinkedIn Icon Overlay */}
                  <div className="absolute bottom-3 right-3 bg-[#4B5563] p-1.5 rounded text-white cursor-pointer hover:bg-[#004E98] transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                </div>

                <div className="px-1 pb-2">
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
