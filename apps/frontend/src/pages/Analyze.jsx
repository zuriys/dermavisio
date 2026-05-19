// import React from 'react';
// import Navbar from '../components/global/Navbar';
// import Footer from '../components/global/Footer';
// import Button from '../components/global/Button';

// const AnalyzePage = () => {
//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
//       <Navbar />

//       <main className="flex-grow flex flex-col items-center py-12 px-4">
//         <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
//           <h1 className="text-3xl font-bold text-[#091E42]">Skin Analysis</h1>
//           <p className="text-gray-500 mt-2">Please upload a clear, well-lit photo of the affected area.</p>

//           {/* Area Upload */}
//           <div className="mt-8 border-2 border-dashed border-[#D1E1F5] rounded-xl p-20 flex flex-col items-center justify-center bg-[#FBFDFF]">
//             <div className="w-16 h-16 bg-[#E8F1FF] rounded-xl flex items-center justify-center mb-4 text-[#004E98]">
//                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
//             </div>
//             <h3 className="text-xl font-bold text-[#004E98]">Upload Your Scan</h3>
//             <p className="text-gray-400 mt-1 mb-6">Drag and drop JPEG, PNG, or TIFF files here</p>
            
//             {/* Button Global yang bisa dipakai temanmu juga */}
//             <Button variant="outline" className="px-10 border-[#004E98] text-[#004E98]">
//               SELECT FILE
//             </Button>
//           </div>
//         </div>

//         {/* Info Privasi */}
//         <div className="w-full max-w-5xl mt-6 bg-[#F0F7FF] border-l-4 border-[#004E98] p-5 rounded-r-xl flex items-start gap-4">
//           <span className="text-[#004E98] text-xl">🛡️</span>
//           <div>
//             <h4 className="font-bold text-[#091E42]">Data Privacy</h4>
//             <p className="text-sm text-gray-500">Your medical data is encrypted and HIPAA compliant.</p>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AnalyzePage;











// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// import { get255CroppedImg } from "../utils/cropImage";

// export default function AnalyzePage() {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [pixels, setPixels] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => setImage(reader.result);
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     setLoading(true);
//     try {
//       const croppedFile = await get255CroppedImg(image, pixels);
      
//       const formData = new FormData();
//       formData.append("skin_image", croppedFile);

//       const res = await fetch("http://localhost:5000/api/analyze", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();
//       console.log("Hasil dari server:", data);
//       alert("Analisis Berhasil!");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 flex flex-col items-center">
//       <h1 className="text-2xl font-bold mb-4">Analisis Kulit</h1>
      
//       <input type="file" onChange={onSelectFile} className="mb-4" accept="image/*" />

//       {image && (
//         <div className="w-full">
//           {/* Area Cropper */}
//           <div className="relative w-full h-80 bg-black rounded-xl overflow-hidden">
//             <Cropper
//               image={image}
//               crop={crop}
//               zoom={zoom}
//               aspect={1}
//               cropShape="round"
//               onCropChange={setCrop}
//               onZoomChange={setZoom}
//               onCropComplete={(_, px) => setPixels(px)}
//             />
//           </div>

//           {/* Kontrol Zoom */}
//           <input
//             type="range"
//             min={1} max={3} step={0.1}
//             value={zoom}
//             onChange={(e) => setZoom(e.target.value)}
//             className="w-full my-4"
//           />

//           <button
//             onClick={handleUpload}
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
//           >
//             {loading ? "Memproses..." : "Mulai Analisis (255x255)"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }












// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// import { get255CroppedImg } from "../utils/cropImage"; // Helper yang kita buat tadi
// import { ClipboardCheck, Loader2, UploadCloud, RefreshCcw } from "lucide-react";
// import Navbar from "../components/global/Navbar";
// import Footer from "../components/global/Footer";

// export default function AnalyzePage() {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [pixels, setPixels] = useState(null);
  
//   // State Utama: 'idle' | 'cropping' | 'loading' | 'result'
//   const [status, setStatus] = useState("idle");
//   const [result, setResult] = useState(null);

//   // 1. Pilih File
//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//         setStatus("cropping");
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   // 2. Simulasi/Proses Upload ke Backend
//   const handleAnalyze = async () => {
//     setStatus("loading");
    
//     try {
//       const croppedFile = await get255CroppedImg(image, pixels);
      
//       // DISINI NANTI TEMPAT AXIOS
//       // const formData = new FormData();
//       // formData.append("image", croppedFile);
//       // const res = await axios.post('...', formData);

//       // Simulasi loading 3 detik agar terlihat proses AI-nya
//       setTimeout(() => {
//         setResult({
//           condition: "Benign Nevus (Common Mole)",
//           description: "The AI model has identified characteristics consistent with a benign growth. No immediate signs of malignancy detected.",
//           confidence: 98.2,
//           nextSteps: "Monitor for changes in size, color, or shape. Consult a dermatologist for a professional evaluation if you notice rapid developments or itching."
//         });
//         setStatus("result");
//       }, 3000);

//     } catch (err) {
//       console.error(err);
//       setStatus("cropping");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       <Navbar />
      
//       <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl">
        
//         {/* --- STATE: IDLE (UPLOAD) --- */}
//         {status === "idle" && (
//           <div className="text-center py-20">
//             <h1 className="text-4xl font-bold mb-8">Skin Analysis</h1>
//             <label className="flex flex-col items-center justify-center w-full max-w-xl mx-auto h-64 border-2 border-dashed border-slate-300 rounded-3xl bg-white cursor-pointer hover:bg-slate-50 transition-all">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <UploadCloud className="w-12 h-12 text-slate-400 mb-4" />
//                 <p className="mb-2 text-sm text-slate-500 font-semibold text-center px-10">
//                   Click to upload or drag and drop JPEG, PNG, or TIFF files here
//                 </p>
//               </div>
//               <input type="file" className="hidden" onChange={onSelectFile} accept="image/*" />
//             </label>
//           </div>
//         )}

//         {/* --- STATE: CROPPING --- */}
//         {status === "cropping" && (
//           <div className="max-w-2xl mx-auto text-center space-y-6">
//             <h2 className="text-2xl font-bold">Adjust Your Scan</h2>
//             <div className="relative w-full h-[450px] bg-black rounded-3xl overflow-hidden shadow-2xl">
//               <Cropper
//                 image={image}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={1}
//                 cropShape="round"
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={(_, px) => setPixels(px)}
//               />
//             </div>
//             <input 
//               type="range" min={1} max={3} step={0.1} value={zoom}
//               onChange={(e) => setZoom(e.target.value)}
//               className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <button 
//               onClick={handleAnalyze}
//               className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg transition-all"
//             >
//               Analyze Now
//             </button>
//           </div>
//         )}

//         {/* --- STATE: LOADING --- */}
//         {status === "loading" && (
//           <div className="flex flex-col items-center justify-center py-32 space-y-4">
//             <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
//             <h2 className="text-2xl font-bold text-slate-800">AI is Analyzing...</h2>
//             <p className="text-slate-500 italic">Processing image pattern recognition</p>
//           </div>
//         )}

//         {/* --- STATE: RESULT (SESUAI GAMBAR) --- */}
//         {status === "result" && result && (
//           <div className="animate-in fade-in duration-700">
//             <div className="mb-10">
//               <h1 className="text-4xl font-bold text-slate-900 mb-4">Analysis Complete</h1>
//               <p className="text-slate-600">Your diagnostic scan has been processed. Please review findings below.</p>
//             </div>

//             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
//               <div className="h-2 bg-teal-600"></div>
//               <div className="p-8 md:p-10">
//                 <div className="flex flex-col md:flex-row justify-between items-start gap-8">
//                   <div className="space-y-4 flex-grow">
//                     <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-widest rounded">Predicted Condition</span>
//                     <h2 className="text-3xl font-bold text-slate-900">{result.condition}</h2>
//                     <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">{result.description}</p>
//                   </div>
//                   <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center min-w-[160px]">
//                     <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Confidence</p>
//                     <p className="text-4xl font-black text-teal-600">{result.confidence}%</p>
//                   </div>
//                 </div>

//                 <div className="mt-10 pt-8 border-t border-slate-100 flex gap-4">
//                   <div className="p-2 bg-teal-50 rounded-lg h-fit"><ClipboardCheck className="w-6 h-6 text-teal-600" /></div>
//                   <div>
//                     <h4 className="font-bold text-slate-900">Suggested Next Steps</h4>
//                     <p className="text-slate-600 mt-1">{result.nextSteps}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <button 
//               onClick={() => setStatus("idle")}
//               className="mt-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold transition-colors"
//             >
//               <RefreshCcw className="w-4 h-4" /> Start New Analysis
//             </button>
//           </div>
//         )}

//       </main>
//       <Footer />
//     </div>
//   );
// }





























// import React, { useState } from "react";
// import Cropper from "react-easy-crop";
// import { get255CroppedImg } from "../utils/cropImage";
// import { 
//   UploadCloud, 
//   RefreshCcw, 
//   Loader2, 
//   ClipboardCheck, 
//   Sun, 
//   Maximize, 
//   Ruler, 
//   ShieldCheck 
// } from "lucide-react";
// import Navbar from "../components/global/Navbar";
// import Footer from "../components/global/Footer";

// export default function AnalyzePage() {
//   const [image, setImage] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [pixels, setPixels] = useState(null);
//   const [status, setStatus] = useState("idle");
//   const [result, setResult] = useState(null);

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//         setStatus("cropping");
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleAnalyze = async () => {
//     setStatus("loading");
//     setTimeout(() => {
//       setResult({
//         condition: "Benign Nevus (Common Mole)",
//         description: "The AI model has identified characteristics consistent with a benign growth. No immediate signs of malignancy detected.",
//         confidence: 98.2,
//         nextSteps: "Monitor for changes in size, color, or shape. Consult a dermatologist for a professional evaluation if you notice rapid developments or itching."
//       });
//       setStatus("result");
//     }, 3000);
//   };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
//       <Navbar />

//       <main className="flex-grow container mx-auto px-6 py-16 max-w-6xl">
        
//         {/* KARTU UTAMA */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 mb-8">
          
//           {/* HEADER DALAM KARTU */}
//           {(status === "idle" || status === "cropping") && (
//             <div className="mb-10">
//               <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Skin Analysis</h1>
//               <p className="text-slate-500 mt-2 text-lg">Please upload a clear, well-lit photo of the affected area.</p>
//             </div>
//           )}

//           {/* --- STATE: IDLE (UPLOAD) --- */}
//           {status === "idle" && (
//             <div className="animate-in fade-in duration-500">
//               <label className="flex flex-col items-center justify-center w-full h-96 border border-blue-100 rounded-2xl bg-white cursor-pointer hover:bg-slate-50/50 transition-all group relative">
//                 <div className="flex flex-col items-center justify-center space-y-4">
//                   {/* Icon Box */}
//                   <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
//                     <UploadCloud className="w-8 h-8" />
//                   </div>
                  
//                   <div className="text-center">
//                     <h3 className="text-2xl font-bold text-slate-800">Upload Your Scan</h3>
//                     <p className="text-slate-400 mt-1">Drag and drop JPEG, PNG, or TIFF files here</p>
//                   </div>

//                   {/* Tombol Palsu untuk Select File */}
//                   <div className="mt-4 px-8 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold uppercase tracking-wide group-hover:bg-blue-600 group-hover:text-white transition-colors">
//                     Select File
//                   </div>
//                 </div>
//                 <input type="file" className="hidden" onChange={onSelectFile} accept="image/*" />
//               </label>

//               {/* GUIDELINES (Icon di bawah kotak upload) */}
//               <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
//                 <div className="flex items-center gap-3 text-slate-400">
//                   <Sun className="w-5 h-5" />
//                   <span className="text-sm">Ensure bright lighting</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-400">
//                   <Maximize className="w-5 h-5" />
//                   <span className="text-sm">Sharp, clear focus</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-400">
//                   <Ruler className="w-5 h-5" />
//                   <span className="text-sm">Include a scale if possible</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* --- STATE: CROPPING --- */}
//           {status === "cropping" && (
//             <div className="animate-in fade-in duration-300 space-y-8">
//               <div className="relative w-full h-[450px] bg-slate-900 rounded-3xl overflow-hidden shadow-inner">
//                 <Cropper
//                   image={image}
//                   crop={crop}
//                   zoom={zoom}
//                   aspect={1}
//                   cropShape="round"
//                   onCropChange={setCrop}
//                   onZoomChange={setZoom}
//                   onCropComplete={(_, px) => setPixels(px)}
//                 />
//               </div>
//               <div className="max-w-md mx-auto space-y-6">
//                 <div className="flex items-center gap-4">
//                   <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Zoom</span>
//                   <input 
//                     type="range" min={1} max={3} step={0.1} value={zoom}
//                     onChange={(e) => setZoom(e.target.value)}
//                     className="flex-grow h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
//                   />
//                 </div>
//                 <div className="flex gap-4">
//                   <button onClick={() => setStatus("idle")} className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
//                   <button onClick={handleAnalyze} className="flex-[2] bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 shadow-lg shadow-blue-100 transition-all">Start Analysis</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* --- STATE: LOADING & RESULT TETAP SAMA SEPERTI SEBELUMNYA --- */}
//           {status === "loading" && (
//             <div className="py-24 text-center space-y-4">
//               <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
//               <h2 className="text-2xl font-bold text-slate-800">Analyzing patterns...</h2>
//             </div>
//           )}

//           {status === "result" && result && (
//             <div className="animate-in slide-in-from-bottom-4 duration-700">
//                <div className="mb-10">
//                 <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Analysis Complete</h1>
//                 <p className="text-slate-500 text-lg">Your diagnostic scan has been processed. Please review findings below.</p>
//               </div>
//               <div className="border border-slate-100 rounded-2xl overflow-hidden">
//                 <div className="h-1.5 bg-teal-500"></div>
//                 <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between gap-10">
//                   <div className="space-y-6 flex-grow">
//                     <div>
//                       <span className="px-2 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-widest rounded">Predicted Condition</span>
//                       <h2 className="text-3xl font-bold text-slate-900 mt-2">{result.condition}</h2>
//                     </div>
//                     <p className="text-slate-500 text-lg leading-relaxed">{result.description}</p>
//                     <div className="flex gap-4 pt-4 border-t border-slate-50">
//                       <ClipboardCheck className="w-6 h-6 text-teal-600 flex-shrink-0" />
//                       <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Suggested Next Steps:</span> {result.nextSteps}</p>
//                     </div>
//                   </div>
//                   <div className="bg-slate-50 rounded-2xl p-8 text-center min-w-[200px] h-fit">
//                     <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Confidence</p>
//                     <p className="text-5xl font-black text-teal-600">{result.confidence}%</p>
//                   </div>
//                 </div>
//               </div>
//               <button onClick={() => setStatus("idle")} className="mt-10 flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mx-auto transition-colors">
//                 <RefreshCcw className="w-4 h-4" /> Start New Analysis
//               </button>
//             </div>
//           )}
//         </div>

//         {/* DATA PRIVACY BOX (Di luar kartu utama sesuai gambar) */}
//         <div className="bg-white border border-slate-200 rounded-xl p-6 flex gap-5 items-start relative overflow-hidden shadow-sm">
//           {/* Border Biru di Samping */}
//           <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
          
//           <ShieldCheck className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
//           <div>
//             <h4 className="text-slate-800 font-bold">Data Privacy</h4>
//             <p className="text-sm text-slate-500 mt-1 leading-relaxed">
//               Your medical data is encrypted and HIPAA compliant. <br />
//               We never share images without consent.
//             </p>
//           </div>
//         </div>

//       </main>
//       <Footer />
//     </div>
//   );
// }








// import Navbar from "../components/global/Navbar";
// import Footer from "../components/global/Footer";
// import React, { useState } from "react";
// import Cropper from "react-easy-crop";
// import { get255CroppedImg } from "../utils/cropImage";
// import { 
//   CheckCircle2, 
//   Sun, 
//   Maximize, 
//   Ruler, 
//   ShieldCheck, 
//   Sparkles 
// } from "lucide-react";
// // ... (import Navbar, Footer, dll tetap sama)

// export default function AnalyzePage() {
//   // ... (state image, crop, zoom, pixels tetap sama)

//   return (
//     <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
//       <Navbar />

//       <main className="flex-grow container mx-auto px-6 py-12 max-w-6xl">
        
//         {/* KARTU UTAMA */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 md:p-14 mb-6">
          
//           {/* HEADER */}
//           <div className="mb-10">
//             <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Skin Analysis</h1>
//             <p className="text-slate-500 mt-2">Please upload a clear, well-lit photo of the affected area.</p>
//           </div>

//           {/* --- STATE: CROPPING (Sesuai Gambar Anda) --- */}
//           {status === "cropping" && (
//             <div className="animate-in fade-in duration-500">
//               <div className="flex flex-col lg:flex-row gap-10 items-start">
                
//                 {/* SISI KIRI: PREPARATION CARD */}
//                 <div className="w-full lg:w-1/3 bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
//                   <h3 className="text-xl font-bold text-blue-900">Preparation</h3>
//                   <p className="text-slate-600 text-sm leading-relaxed">
//                     Center the skin condition within the circle for the most accurate analysis. 
//                     Ensure the area is well-lit and in focus.
//                   </p>
                  
//                   <ul className="space-y-4 pt-2">
//                     <li className="flex items-center gap-3 text-slate-700">
//                       <CheckCircle2 className="w-5 h-5 text-teal-500" />
//                       <span className="text-sm font-medium">Sharp focus</span>
//                     </li>
//                     <li className="flex items-center gap-3 text-slate-700">
//                       <CheckCircle2 className="w-5 h-5 text-teal-500" />
//                       <span className="text-sm font-medium">Neutral lighting</span>
//                     </li>
//                   </ul>
//                 </div>

//                 {/* SISI KANAN: IMAGE CROPPER AREA */}
//                 <div className="w-full lg:w-2/3 bg-white border border-slate-200 rounded-2xl p-4 md:p-10 relative h-[500px]">
//                   {/* Label Nama File (Variasi estetik dari gambar) */}
//                   <div className="absolute top-8 left-12 z-20 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-widest shadow-sm">
//                     IMAGE_0842.JPG
//                   </div>

//                   {/* Cropper Container */}
//                   <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-50">
//                     <Cropper
//                       image={image}
//                       crop={crop}
//                       zoom={zoom}
//                       aspect={1}
//                       cropShape="round" // Jika ingin bulat seperti diskusi awal, atau hapus jika ingin kotak
//                       showGrid={false}
//                       onCropChange={setCrop}
//                       onZoomChange={setZoom}
//                       onCropComplete={(_, px) => setPixels(px)}
//                       style={{
//                         containerStyle: { borderRadius: '1rem' },
//                         cropAreaStyle: { border: '2px solid white' }
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* ACTION BUTTONS (Di bawah Grid) */}
//               <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
//                 <button 
//                   onClick={() => setStatus("idle")}
//                   className="w-full md:w-auto px-10 py-3 border border-blue-900 text-blue-900 rounded-lg font-bold hover:bg-slate-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
                
//                 <button 
//                   onClick={handleAnalyze}
//                   className="w-full md:w-auto px-10 py-3 bg-[#004E98] text-white rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-blue-900 transition-all shadow-lg active:scale-95"
//                 >
//                   Confirm & Analyze
//                   <Sparkles className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* GUIDELINES FOOTER */}
//               <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-50">
//                 <div className="flex items-center gap-3 text-slate-400">
//                   <Sun className="w-4 h-4" />
//                   <span className="text-[11px] font-medium tracking-wide">Ensure bright lighting</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-400">
//                   <Maximize className="w-4 h-4" />
//                   <span className="text-[11px] font-medium tracking-wide">Sharp, clear focus</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-400">
//                   <Ruler className="w-4 h-4" />
//                   <span className="text-[11px] font-medium tracking-wide">Include a scale if possible</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* DATA PRIVACY BANNER */}
//         <div className="bg-white border border-slate-200 rounded-xl p-6 flex gap-5 items-start relative overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-2">
//           <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-900"></div>
//           <ShieldCheck className="w-6 h-6 text-blue-900 mt-1 flex-shrink-0" />
//           <div>
//             <h4 className="text-slate-800 font-bold text-sm">Data Privacy</h4>
//             <p className="text-[12px] text-slate-500 mt-1 leading-relaxed">
//               Your medical data is encrypted and HIPAA compliant. <br />
//               We never share images without consent.
//             </p>
//           </div>
//         </div>

//       </main>
//       <Footer />
//     </div>
//   );
// }


























import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { get255CroppedImg } from "../utils/cropImage";
import { 
  UploadCloud, 
  RefreshCcw, 
  Loader2, 
  ClipboardCheck, 
  Sun, 
  Maximize, 
  Ruler, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

export default function AnalyzePage() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState(null);
  
  // Pastikan status default adalah "idle"
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setStatus("cropping"); // Pindah ke step crop setelah pilih file
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    setStatus("loading");
    setTimeout(() => {
      setResult({
        condition: "Benign Nevus (Common Mole)",
        description: "The AI model has identified characteristics consistent with a benign growth. No immediate signs of malignancy detected.",
        confidence: 98.2,
        nextSteps: "Monitor for changes in size, color, or shape. Consult a dermatologist for a professional evaluation."
      });
      setStatus("result");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-6xl">
        
        {/* KARTU UTAMA */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10 md:p-14 mb-8">
          
          {/* HEADER (Selalu Muncul kecuali saat Loading/Result) */}
          {status !== "loading" && status !== "result" && (
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-[#1e293b] tracking-tight">Skin Analysis</h1>
              <p className="text-slate-500 mt-2 text-lg">Please upload a clear, well-lit photo of the affected area.</p>
            </div>
          )}

          {/* --- STEP 1: IDLE (TAMPILAN UPLOAD) --- */}
          {status === "idle" && (
            <div className="animate-in fade-in duration-500">
              <label className="flex flex-col items-center justify-center w-full h-80 border border-blue-100 rounded-[2rem] bg-white cursor-pointer hover:bg-slate-50 transition-all group relative">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Upload Your Scan</h3>
                    <p className="text-slate-400 mt-1">Drag and drop JPEG, PNG, or TIFF files here</p>
                  </div>
                  <div className="mt-4 px-8 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold uppercase tracking-wide group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Select File
                  </div>
                </div>
                <input type="file" className="hidden" onChange={onSelectFile} accept="image/*" />
              </label>

              {/* Guidelines di bawah box upload */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-400">
                  <Sun className="w-4 h-4" /> <span className="text-xs">Ensure bright lighting</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Maximize className="w-4 h-4" /> <span className="text-xs">Sharp, clear focus</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Ruler className="w-4 h-4" /> <span className="text-xs">Include a scale if possible</span>
                </div>
              </div>
            </div>
          )}

          {/* --- STEP 2: CROPPING (SETELAH UPLOAD) --- */}
          {status === "cropping" && (
            <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500">
              <div className="w-full lg:w-1/3 bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-blue-900">Preparation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Center the skin condition within the circle for accurate analysis.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" /> <span className="text-sm">Sharp focus</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" /> <span className="text-sm">Neutral lighting</span>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-2/3 bg-white border border-slate-200 rounded-2xl p-6 h-[450px] relative">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
                  <Cropper
                    image={image}
                    crop={crop} zoom={zoom} aspect={1} cropShape="round"
                    onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={(_, px) => setPixels(px)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tombol aksi untuk step Cropping */}
          {status === "cropping" && (
            <div className="mt-10 flex justify-between gap-4">
              <button onClick={() => setStatus("idle")} className="px-10 py-3 border border-slate-300 rounded-xl font-bold text-slate-600">Cancel</button>
              <button onClick={handleAnalyze} className="px-10 py-3 bg-[#004E98] text-white rounded-xl font-bold flex items-center gap-2">
                Confirm & Analyze <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* --- STEP 3: LOADING --- */}
          {status === "loading" && (
            <div className="py-24 text-center space-y-6 animate-pulse">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">AI is Analyzing Patterns...</h2>
            </div>
          )}

          {/* --- STEP 4: RESULT --- */}
          {status === "result" && result && (
             <div className="animate-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl font-bold text-[#1e293b] mb-10 tracking-tight">Analysis Complete</h1>
                <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                  <div className="h-2 bg-teal-600"></div>
                  <div className="p-10 flex flex-col md:flex-row justify-between gap-10">
                    <div className="space-y-6 flex-grow">
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-widest rounded">Predicted Condition</span>
                      <h2 className="text-3xl font-bold text-slate-900">{result.condition}</h2>
                      <p className="text-slate-500 text-lg leading-relaxed">{result.description}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-8 text-center min-w-[200px]">
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Confidence Score</p>
                      <p className="text-5xl font-black text-teal-600">{result.confidence}%</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStatus("idle")} className="mt-12 flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mx-auto transition-colors">
                  <RefreshCcw className="w-4 h-4" /> Start New Analysis
                </button>
             </div>
          )}
        </div>

        {/* DATA PRIVACY BANNER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex gap-6 items-start relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-900"></div>
          <ShieldCheck className="w-7 h-7 text-blue-900 mt-1" />
          <div>
            <h4 className="text-[#1e293b] font-bold text-lg">Data Privacy</h4>
            <p className="text-slate-500 mt-1 leading-relaxed">
              Your medical data is encrypted and HIPAA compliant. <br />
              We never share images without consent.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}