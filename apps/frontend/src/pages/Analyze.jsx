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
  Sparkles,
} from "lucide-react"; // Hapus import yang tidak terpakai (ClipboardCheck)
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import axios from "axios";

import sampleAkiec from "../../assets/akiec.jpeg";
import sampleBcc from "../../assets/bcc.jpeg";
import sampleBkl from "../../assets/bkl.jpeg";
import sampleDf from "../../assets/df.jpeg";
import sampleMel from "../../assets/mel.jpeg";
import sampleNv from "../../assets/nv.jpeg";
import sampleVasc from "../../assets/vasc.jpeg";

//Mapping Gambarnya
const sampleImages = {
  "Basal Cell Carcinoma": sampleBcc,
  "Actinic Keratoses": sampleAkiec,
  "Melanocytic Nevi": sampleNv,
  "Benign Keratosis": sampleBkl,
  Dermatofibroma: sampleDf,
  Melanoma: sampleMel,
  "Vascular Lesions": sampleVasc,
};

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
      // ... di dalam handleAnalyze ...
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/predict`, formData);
      const resultData = response.data.data;

      setResult({
        condition: resultData.label_name, // Contoh: "Melanoma"
        description: resultData.description, // Contoh: "Jenis kanker kulit..."
        confidence: resultData.confidence, // Muncul 98.20
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
              <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                Skin Analysis
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Silakan unggah foto yang jelas dan cukup terang dari area yang
                terkena cahaya.
              </p>
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
                    <h3 className="text-2xl font-bold text-slate-800">
                      Unggah Pindaian Anda
                    </h3>
                    <p className="text-slate-400 mt-1">
                      Arahkan dan lepaskan berkas JPEG, PNG, atau TIFF ke sini
                    </p>
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
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pusatkan lesi di dalam lingkaran.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-500" />{" "}
                    <span className="text-sm">Fokuskan yang tajam</span>
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
              <button
                onClick={() => setStatus("idle")}
                className="px-10 py-3 border border-slate-300 rounded-xl font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={handleAnalyze}
                className="px-10 py-3 bg-blue-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-blue-900 transition-colors"
              >
                Confirm & Analyze 
              </button>
            </div>
          )}

          {/* STEP 3 & 4 (LOADING & RESULT) TETAP SAMA... */}
          {status === "loading" && (
            <div className="py-24 text-center space-y-6">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
              <h2 className="text-2xl font-bold text-slate-800">
                AI sedang menganalisis pola...
              </h2>
            </div>
          )}

         

          {status === "result" && result && (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 max-w-7xl mx-auto">
              {/* --- HEADER RINGKAS --- */}
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                    Hasil Analisis Penyakit
                  </h1>
                  {/* <p className="text-slate-500 text-sm italic">
                    ID Laporan: #DV-{Math.floor(Math.random() * 10000)}
                  </p> */}
                </div>
                <button
                  onClick={() => setStatus("cropping")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm text-sm"
                >
                  <RefreshCcw className="w-4 h-4" /> Re-analyze Foto
                </button>
              </div>

              {/* --- MAIN CONTENT GRID (12 KOLOM) --- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* SISI KIRI: INFORMASI & DIAGNOSA (5 Kolom) */}
                <div className="lg:col-span-5 space-y-8">
                  {/* KARTU HASIL UTAMA */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>

                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                      Hasil Deteksi AI
                    </span>

                    <h2 className="text-4xl font-black text-slate-900 mt-4 mb-4 leading-tight">
                      {result.condition}
                    </h2>

                    <p className="text-slate-500 leading-relaxed mb-8">
                      {result.description ||
                        "Berdasarkan analisis citra dermatoskopi, sistem mendeteksi karakteristik visual yang konsisten dengan pola kondisi ini."}
                    </p>

                    {/* BOX SCORE */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          Confidence Score
                        </p>
                        <p className="text-4xl font-black text-blue-900">
                          {result.confidence}%
                        </p>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 flex items-center justify-center font-bold text-blue-600 text-xs">
                        AI-Match
                      </div>
                    </div>
                  </div>

                  {/* BOX PERINGATAN (HARD TEXT) */}
                  <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
                    <div className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                      <div className="space-y-2">
                        <h4 className="text-red-900 font-bold text-sm uppercase tracking-tight text-pretty">
                          Peringatan Medis Penting
                        </h4>
                        <p className="text-red-700/80 text-xs leading-relaxed font-medium">
                          Hasil ini dihasilkan oleh AI untuk tujuan edukasi dan
                          skrining awal.{" "}
                          <strong>Ini bukan diagnosa medis final.</strong>{" "}
                          Segera temui Dokter Spesialis Kulit (Dermatolog) untuk
                          pemeriksaan fisik dan biopsi jika diperlukan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStatus("idle")}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-900 transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    Selesai & Analisis Baru <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* SISI KANAN: KOMPARASI VISUAL (7 Kolom) */}
                <div className="lg:col-span-7 bg-slate-50 rounded-[3rem] p-8 border border-slate-100">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-slate-800">
                      Perbandingan Visual
                    </h3>
                    <span className="text-[10px] bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-400 font-bold uppercase">
                      AI Comparison View
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Foto User */}
                    <div className="space-y-4">
                      <div className="aspect-[3/4] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl relative group">
                        <img
                          src={image}
                          alt="User Input"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                            Foto Anda
                          </span>
                        </div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Input Foto
                      </p>
                    </div>

                    {/* Foto Referensi AI */}
                    <div className="space-y-4">
                      <div className="aspect-[3/4] rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl relative group">
                        <img
                          src={sampleImages[result.condition] || sampleNormal}
                          alt="Medical Reference"
                          className="w-full h-full object-cover saturate-[0.8]"
                        />
                        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-blue-600 text-white text-[8px] font-bold px-2 py-1 rounded shadow-lg uppercase">
                            Data Klinis
                          </span>
                        </div>
                      </div>
                      <p className="text-center text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                        Referensi: {result.condition}
                      </p>
                    </div>
                  </div>

                  {/* Info Tambahan di Bawah Foto */}
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">
                        Karakteristik Umum
                      </p>
                      <p className="text-[11px] text-slate-700 font-medium italic leading-relaxed">
                        Simetri, variasi warna, dan struktur tepi lesi.
                      </p>
                    </div>
                    <div className="p-4 bg-white/60 rounded-2xl border border-white shadow-sm">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">
                        Rekomendasi
                      </p>
                      <p className="text-[11px] text-slate-700 font-medium italic leading-relaxed">
                        Gunakan perlindungan UV dan lakukan cek rutin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
              Data medis Anda dienkripsi. Kami tidak pernah membagikan gambar
              tanpa persetujuan.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
