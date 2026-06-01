import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { get255CroppedImg } from "../utils/cropImage";
import { 
  UploadCloud, 
  RefreshCcw, 
  Loader2, 
  Sun, 
  Maximize, 
  Ruler, 
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react"; // Hapus import yang tidak terpakai (ClipboardCheck)
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import axios from "axios";

export default function AnalyzePage() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState(null);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setStatus("cropping");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };



const handleAnalyze = async () => {
    setStatus("loading");
    
    try {
        const croppedImageBlob = await get255CroppedImg(image, pixels);
        const formData = new FormData();
        formData.append("image", croppedImageBlob, "skin.jpg");
        formData.append("userId", 1); // Sementara hardcode ID User atau ambil dari state auth

        // Tembak ke EXPRESS (Bukan Flask!)
        const response = await axios.post("http://localhost:5000/api/predict", formData);

        // Ambil data hasil simpanan database yang dikirim Express
        const dbResult = response.data.data;

        setResult({
            condition: dbResult.hasil,
            confidence: dbResult.confidence * 100,
            description: "Analisis AI menunjukkan indikasi kondisi tersebut."
        });
        setStatus("result");
    } catch (error) {
        console.error(error);
        setStatus("cropping");
    }
};





  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
     

      <main className="grow container mx-auto px-6 py-12 max-w-6xl">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10 md:p-14 mb-8">
          
          {/* HEADER */}
          {status !== "loading" && status !== "result" && (
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Skin Analysis</h1>
              <p className="text-slate-500 mt-2 text-lg">Silakan unggah foto yang jelas dan cukup terang dari area yang terkena cahaya.</p>
            </div>
          )}

          {/* STEP 1: IDLE */}
          {status === "idle" && (
            <div className="animate-in fade-in duration-500">
              <label 
                htmlFor="file-upload" // Ditambahkan untuk aksesibilitas
                className="flex flex-col items-center justify-center w-full h-80 border border-blue-100 rounded-3xl bg-white cursor-pointer hover:bg-slate-50 transition-all group relative"
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-800">Unggah Pindaian Anda</h3>
                    <p className="text-slate-400 mt-1">Arahkan dan lepaskan berkas JPEG, PNG, atau TIFF ke sini</p>
                  </div>
                  <div className="mt-4 px-8 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-bold uppercase tracking-wide group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Pilih Photo
                  </div>
                </div>
                <input 
                  id="file-upload" // ID ditambahkan
                  type="file" 
                  className="hidden" 
                  onChange={onSelectFile} 
                  accept="image/*" 
                />
              </label>
            </div>
          )}

          {/* STEP 2: CROPPING */}
          {status === "cropping" && (
            <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500">
              <div className="w-full lg:w-1/3 bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-blue-900">Preparation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Pusatkan lesi di dalam lingkaran.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" /> <span className="text-sm">Fokuskan yang tajam</span>
                  </li>
                </ul>
              </div>
              {/* Gunakan h-[450px] atau ganti h-112 jika ingin mengikuti standar Tailwind */}
              <div className="w-full lg:w-2/3 bg-white border border-slate-200 rounded-2xl p-6 h-112  relative">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900">
                  <Cropper
                    image={image}
                    crop={crop} 
                    zoom={zoom} 
                    aspect={1} 
                    cropShape="round"
                    onCropChange={setCrop} 
                    onZoomChange={setZoom} 
                    onCropComplete={(_, px) => setPixels(px)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* BUTTONS FOR CROPPING */}
          {status === "cropping" && (
            <div className="mt-10 flex justify-between gap-4">
              <button onClick={() => setStatus("idle")} className="px-10 py-3 border border-slate-300 rounded-xl font-bold text-slate-600">Batal</button>
              <button onClick={handleAnalyze} className="px-10 py-3 bg-blue-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors">
                Confirm & Analyze <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3 & 4 (LOADING & RESULT) TETAP SAMA... */}
          {status === "loading" && (
             <div className="py-24 text-center space-y-6">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
                <h2 className="text-2xl font-bold text-slate-800">AI sedang menganalisis pola...</h2>
             </div>
          )}

          {status === "result" && result && (
             <div className="animate-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-4xl font-bold text-slate-800 mb-10 tracking-tight">Analisis Telah Selesai</h1>
                <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="h-2 bg-teal-600"></div>
                  <div className="p-10 flex flex-col md:flex-row justify-between gap-10">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-slate-900">{result.condition}</h2>
                      <p className="text-slate-500 text-lg">{result.description}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-8 text-center min-w-48]">
                      <p className="text-5xl font-black text-teal-600">{result.confidence}%</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStatus("idle")} className="mt-12 flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mx-auto transition-colors">
                  <RefreshCcw className="w-4 h-4" /> Mulai Analisis Baru
                </button>
             </div>
          )}
        </div>

        {/* DATA PRIVACY BANNER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex gap-6 items-start relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-900"></div>
          <ShieldCheck className="w-7 h-7 text-blue-900 mt-1" />
          <div>
            <h4 className="text-slate-800 font-bold text-lg">Data Privacy</h4>
            <p className="text-slate-500 mt-1 leading-relaxed">
              Data medis Anda dienkripsi. Kami tidak pernah membagikan gambar tanpa persetujuan.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}