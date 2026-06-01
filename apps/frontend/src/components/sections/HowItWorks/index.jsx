export default function HowItWorks() {
  const steps = [
    { id: "01", title: "Upload Image", desc: "Securely upload a clear photo of skin area." },
    { id: "02", title: "AI Processing", desc: "Our CNN architecture analyzes patterns." },
    { id: "03", title: "Get Results", desc: "Receive a detailed screening report." }
  ];

  return (
    <section className="py-24 text-center">
      <h2 className="text-3xl font-bold mb-2">How it Works</h2>
      <p className="text-slate-500 mb-16">Three simple steps to professional-grade skin analysis.</p>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        {/* Optional: Garis penghubung bisa dibuat dengan border-t pada container */}
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-500 transition-colors">
               {/* Icon SVG di sini */}
            </div>
            <p className="text-blue-600 text-xs font-bold uppercase mb-1">Step {step.id}</p>
            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
            <p className="text-sm text-slate-500 px-4">{step.desc}</p>
          </div>
        ))}
      </div>
      
      <button className="mt-16 px-8 py-3 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800">
        Selengkapnya →
      </button>
    </section>
  );
}