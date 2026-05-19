// import React from 'react';
// import Badge from '../../global/Badge';
// import Button from '../../global/Button';

// const Hero = () => {
//   return (
//     <section className="px-10 py-20 grid grid-cols-2 items-center gap-10">
//       <div>
//         <Badge>Clinical Grade AI Analysis</Badge>
//         <h1 className="text-6xl font-extrabold text-[#091E42] mt-6 leading-tight">
//           Intelligent Skin Analysis <br /> Powered by AI
//         </h1>
//         <p className="text-gray-500 mt-6 text-lg max-w-lg">
//           A professional-grade tool for preliminary skin condition screening using advanced Convolutional Neural Networks (CNN).
//         </p>
        
//         <div className="flex items-center gap-6 mt-10">
//           <Button>
//             Start Free Analysis <span className="ml-2">→</span>
//           </Button>
//           <p className="text-sm text-gray-400">✓ No credit card required</p>
//         </div>

//         <div className="mt-16">
//           <h2 className="text-5xl font-bold text-[#004E98]">95%</h2>
//           <p className="text-gray-400 uppercase text-xs font-bold tracking-widest mt-1">Accuracy Rate</p>
//         </div>
//       </div>

//       <div className="bg-[#D1D9E6] rounded-2xl aspect-square w-full">
//         {/* Tempat Gambar AI atau Ilustrasi */}
//       </div>
//     </section>
//   );
// };

// export default Hero;

import { Link } from "react-router-dom";

import Badge from "../../global/Badge";
import Button from "../../global/Button";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <Badge text="Clinical Grade AI Analysis" icon="check-shield" />
        <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1]">
          Intelligent Skin Analysis <span className="text-blue-600">Powered by AI</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-md">
          A professional-grade tool for preliminary skin condition screening using advanced Convolutional Neural Networks (CNN).
        </p>


        <div className="flex items-center gap-4">
          <Button variant="primary" as={Link} to="/analyze">
            Start Free Analysis →
          </Button>
          <span className="text-sm text-slate-500 font-medium italic">
            ✓ No credit card required
          </span>
        </div>



        
        <div className="pt-8 border-t border-slate-100 mt-8">
          <h3 className="text-4xl font-bold text-blue-900">95%</h3>
          <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Accuracy Rate</p>
        </div>
      </div>

      {/* Decorative Image Placeholder */}
      <div className="relative">
        <div className="w-full aspect-[4/5] bg-slate-200 rounded-[2rem] shadow-2xl overflow-hidden relative z-10">
          {/* Anda bisa masukkan gambar asli di sini */}
        </div>
        {/* Layer dekorasi di belakang (kotak biru muda di gambar) */}
        <div className="absolute -top-10 -right-10 w-full h-full bg-blue-50 rounded-[2rem] -z-0"></div>
      </div>
    </section>
  );
}