import React from 'react';
import Badge from '../../global/Badge';
import Button from '../../global/Button';

const Hero = () => {
  return (
    <section className="px-10 py-20 grid grid-cols-2 items-center gap-10">
      <div>
        <Badge>Clinical Grade AI Analysis</Badge>
        <h1 className="text-6xl font-extrabold text-[#091E42] mt-6 leading-tight">
          Intelligent Skin Analysis <br /> Powered by AI
        </h1>
        <p className="text-gray-500 mt-6 text-lg max-w-lg">
          A professional-grade tool for preliminary skin condition screening using advanced Convolutional Neural Networks (CNN).
        </p>
        
        <div className="flex items-center gap-6 mt-10">
          <Button>
            Start Free Analysis <span className="ml-2">→</span>
          </Button>
          <p className="text-sm text-gray-400">✓ No credit card required</p>
        </div>

        <div className="mt-16">
          <h2 className="text-5xl font-bold text-[#004E98]">95%</h2>
          <p className="text-gray-400 uppercase text-xs font-bold tracking-widest mt-1">Accuracy Rate</p>
        </div>
      </div>

      <div className="bg-[#D1D9E6] rounded-2xl aspect-square w-full">
        {/* Tempat Gambar AI atau Ilustrasi */}
      </div>
    </section>
  );
};

export default Hero;