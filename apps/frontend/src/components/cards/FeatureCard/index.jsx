import React from 'react';
import { ShieldCheck, Target, AlertTriangle, ArrowRight } from 'lucide-react';

const FeatureCard = ({ type, title, desc }) => {
  // 1. Mapping gaya dan ikon berdasarkan "type" dari Home.jsx
  const config = {
    warning: {
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "blue", // Kita tetap pakai biru agar senada dengan brand DermaVisio
      lightBg: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "group-hover:border-amber-200"
    },
    info: {
      icon: <Target className="w-6 h-6" />,
      color: "blue",
      lightBg: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "group-hover:border-blue-200"
    },
    success: {
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "teal",
      lightBg: "bg-teal-50",
      iconColor: "text-teal-600",
      borderColor: "group-hover:border-teal-200"
    }
  };

  const activeConfig = config[type] || config.info;

  return (
    <div className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 overflow-hidden">
      
      {/* 2. BACKGROUND GLOW EFFECT (Tailwind v4) */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 ${activeConfig.lightBg} opacity-0 group-hover:opacity-100 rounded-full blur-3xl transition-opacity duration-700`}></div>

      <div className="relative z-10">
        {/* 3. ICON CONTAINER */}
        <div className={`w-14 h-14 ${activeConfig.lightBg} ${activeConfig.iconColor} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
          {activeConfig.icon}
        </div>

        {/* 4. CONTENT */}
        <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors">
          {title}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {desc}
        </p>

        {/* 5. DECORATIVE LINK */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-blue-500 transition-all duration-500">
          <span>Reliable System</span>
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Border Highlight on Hover */}
      <div className={`absolute inset-0 border-2 border-transparent ${activeConfig.borderColor} rounded-[2rem] transition-colors duration-500`}></div>
    </div>
  );
};

export default FeatureCard;