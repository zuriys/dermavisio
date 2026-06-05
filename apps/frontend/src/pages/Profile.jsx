import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Button from "../components/global/Button";

const ProfilePage = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- STATE ---
  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    gender: "",
    tanggal_lahir: "",
    telepon: "",
    foto: null,
  });
  const [profilePreview, setProfilePreview] = useState(null); // Untuk tampilan sementara
  const [selectedFile, setSelectedFile] = useState(null); // File asli untuk diupload
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.status === "success") {
          const data = response.data.data;

          // 1. Set Data User (nama, email, dll)
          setUserData(data);

          // 2. Set History (Daftar riwayat deteksi)
          if (data.history) {
            setHistory(data.history);
          }

          // 3. SET FOTO PROFIL DENGAN PATH DINAMIS
          if (data.foto) {
            // Menambahkan timestamp (?t=...) opsional agar browser tidak menyimpan cache lama
            const photoUrl = `${import.meta.env.VITE_API_URL}/uploads/profiles/${data.foto}?t=${new Date().getTime()}`;
            setProfilePreview(photoUrl);
          } else {
            // Jika tidak ada foto di DB, biarkan null atau set ke default avatar
            setProfilePreview(null);
          }
        }
      } catch (error) {
        console.error("Gagal ambil profil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // --- 2. LOGIKA PIL
  // IH FOTO ---
  const handleUpdatePhotoClick = () => fileInputRef.current.click();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Simpan file asli
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result); // Tampilkan preview
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePreview(null);
    setSelectedFile(null);
    setUserData({ ...userData, foto: null });
  };

  // --- 3. SIMPAN PERUBAHAN (NAMA & FOTO) KE DATABASE ---
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("nama", userData.nama);
      // Jika ada file baru yang dipilih, masukkan ke FormData
      if (selectedFile) {
        formData.append("foto", selectedFile);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/profile`, // Ganti localhost
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.status === "success") {
        alert("Profil berhasil diperbarui!");
        // Update state lokal dengan data terbaru dari server
        setUserData(response.data.data);
      }
    } catch (error) {
      alert(
        "Gagal menyimpan: " + (error.response?.data?.message || error.message),
      );
    }
  };



  // --- 4. HAPUS RIWAYAT ANALISIS ---
  const deleteHistoryItem = async (id) => {
    if (!window.confirm("Hapus riwayat ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/history/${id}`, // Ganti localhost
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // Filter state lokal agar langsung hilang dari layar
      setHistory(history.filter((item) => item.id_prediksi !== id));
    } catch (error) {
      alert("Gagal menghapus riwayat");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        Loading Profile...
      </div>
    );

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
//       <main className="flex-grow max-w-5xl mx-auto w-full px-10 py-8">
//         {/* Tombol Kembali */}
//         <div className="mb-6">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-gray-500 hover:text-[#004E98] font-semibold transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//             Keluar
//           </button>
//         </div>

//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-[#091E42] mb-1">
//             Personal Information
//           </h1>
//           <p className="text-gray-400 text-sm">
//             Manage your basic identity information and contact details.
//           </p>
//         </header>

//         {/* Profile Picture Card */}
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-6 flex items-center gap-8">
//           <div className="relative">
//             <div className="w-24 h-24 bg-[#D1D5DB] rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
//               {profilePreview ? (
//                 <img
//                   src={profilePreview}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-300"></div>
//               )}
//             </div>
//             <div
//               className="absolute -bottom-2 -right-2 bg-[#004E98] p-2 rounded-lg text-white border-2 border-white shadow-md cursor-pointer hover:bg-[#003B73]"
//               onClick={handleUpdatePhotoClick}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               accept="image/*"
//               onChange={onFileChange}
//             />
//           </div>

//           <div className="flex-1">
//             <h3 className="font-bold text-[#091E42] mb-1">Profile Picture</h3>
//             <p className="text-xs text-gray-400 mb-4">
//               Upload a clear photo of your face for identity verification.
//             </p>
//             <div className="flex gap-3">
//               <Button
//                 onClick={handleUpdatePhotoClick}
//                 className="py-2 px-5 text-xs h-auto bg-[#004E98]"
//               >
//                 Update Photo
//               </Button>
//               <Button
//                 onClick={handleRemovePhoto}
//                 variant="outline"
//                 className="py-2 px-5 text-xs h-auto border-gray-200 text-gray-600"
//               >
//                 Remove
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
//           <form className="space-y-6" onSubmit={handleSaveChanges}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={userData.nama || ""} // SESUAIKAN DENGAN NAMA KOLOM DB
//                   onChange={(e) =>
//                     setUserData({ ...userData, nama: e.target.value })
//                   }
//                   className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="text"
//                   value={userData.tanggal_lahir || ""} // SESUAIKAN DENGAN TANGGAL_LAHIR
//                   readOnly
//                   className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-sm outline-none"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                   Gender
//                 </label>
//                 <input
//                   type="text"
//                   value={userData.gender || ""} // SESUAIKAN DENGAN GENDER
//                   readOnly
//                   className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-sm outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   value={userData.telepon || ""} // SESUAIKAN DENGAN TELEPON
//                   readOnly
//                   className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-sm outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="text"
//                 value={userData.email || ""} // SESUAIKAN DENGAN EMAIL
//                 readOnly
//                 className="w-full px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 text-sm outline-none"
//               />
//             </div>

//             <div className="flex justify-end items-center gap-6 pt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate(-1)}
//                 className="text-gray-600 font-bold hover:text-gray-800 text-sm"
//               >
//                 Cancel
//               </button>
//               <Button type="submit" className="px-10 bg-[#004E98]">
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </div>

//         {/* History Section */}
//         <section className="mt-12">
//           <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
//             History
//           </h2>
//           <div className="space-y-3">
//             {history.length > 0 ? (
//               history.map((item, idx) => (
//                 <div
//                   key={item.id_prediksi}
//                   className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-blue-100 transition-all"
//                 >
//                   <div className="flex-1">
//                     <p className="text-[13px] font-bold text-gray-700 mb-1">
//                       {idx + 1}. {item.hasil_teks || "Hasil Analisis Kulit"}
//                     </p>
//                     <p className="text-[11px] text-gray-400">
//                       Confidence:{" "}
//                       <span className="text-[#004E98] font-bold">
//                         {(item.confidence * 100).toFixed(1)}%
//                       </span>{" "}
//                       • {new Date(item.created_at).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => deleteHistoryItem(item.id_prediksi)}
//                     className="ml-4 p-2 text-gray-300 hover:text-red-600 transition-colors"
//                     title="Hapus Riwayat"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400 text-sm italic py-4">
//                 Belum ada riwayat analisis kulit.
//               </p>
//             )}
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );



return (
  <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
    <main className="grow w-full max-w-[1440px] mx-auto px-6 lg:px-16 py-12">
      
      {/* --- Tombol Kembali & Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-[#004E98] font-bold text-sm transition-all mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Beranda
          </button>
          <h1 className="text-4xl font-black text-[#091E42] tracking-tight">Informasi Pribadi</h1>
        </div>
        
        <div className="hidden lg:block text-right">
          <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            Akun Terverifikasi
          </span>
        </div>
      </div>

      {/* --- MAIN GRID SYSTEM (12 KOLOM) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* KOLOM KIRI: FOTO & FORM (5 Kolom) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. KARTU FOTO PROFIL */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
             {/* Dekorasi Background Halus */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -z-0"></div>

            <div className="relative z-10">
              <div className="w-28 h-28 bg-slate-100 rounded-[1.5rem] flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>
              <button
                onClick={handleUpdatePhotoClick}
                className="absolute -bottom-2 -right-2 bg-[#004E98] p-2.5 rounded-xl text-white border-4 border-white shadow-lg hover:scale-110 transition-transform"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} />
            </div>

            <div className="flex-1 text-center sm:text-left z-10">
              <h3 className="font-black text-[#091E42] text-xl">Foto Profil</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">Gunakan foto wajah yang jelas untuk mempermudah identifikasi.</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Button onClick={handleUpdatePhotoClick} className="py-2 px-4 text-[11px] bg-[#004E98] rounded-xl h-auto">Update</Button>
                <Button onClick={handleRemovePhoto} variant="outline" className="py-2 px-4 text-[11px] border-slate-200 text-slate-500 rounded-xl h-auto hover:bg-red-50 hover:text-red-600">Hapus</Button>
              </div>
            </div>
          </div>

          {/* 2. KARTU FORMULIR DATA DIRI */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
            <form className="space-y-6" onSubmit={handleSaveChanges}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    value={userData.nama || ""}
                    onChange={(e) => setUserData({ ...userData, nama: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Alamat Email</label>
                  <input type="text" value={userData.email || ""} readOnly className="w-full px-5 py-3.5 rounded-2xl border border-slate-50 bg-slate-100/50 text-slate-400 text-sm cursor-not-allowed outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Gender</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-slate-100/50 text-slate-500 text-sm font-semibold">{userData.gender || "-"}</div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Tgl Lahir</label>
                    <div className="px-5 py-3.5 rounded-2xl bg-slate-100/50 text-slate-500 text-sm font-semibold">{userData.tanggal_lahir || "-"}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center gap-4">
                <Button type="submit" className="flex-1 bg-[#004E98] py-4 rounded-2xl shadow-xl shadow-blue-100 hover:shadow-blue-200 transition-all font-black text-sm uppercase tracking-widest">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* KOLOM KANAN: HISTORY (7 Kolom) */}
        <div className="lg:col-span-7 h-full">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 h-full min-h-[600px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-[#091E42] tracking-tight">Riwayat Analisis</h2>
              <div className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase">
                {history.length} Scan
              </div>
            </div>

            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((item, idx) => (
                  <div
                    key={item.id_prediksi}
                    className="group bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 rounded-3xl p-5 flex items-center justify-between transition-all duration-300"
                  >
                    <div className="flex items-center gap-5">
                      {/* Ikon Statis atau Thumbnail Foto */}
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-blue-600 font-black">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-800 leading-tight">
                          {item.hasil_teks || "Analisis Kulit"}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-600 font-black text-xs">{(item.confidence * 100).toFixed(1)}%</span>
                          <span className="text-slate-300 text-xs">•</span>
                          <span className="text-slate-400 text-xs font-medium">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteHistoryItem(item.id_prediksi)}
                      className="opacity-0 group-hover:opacity-100 w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-400 text-sm italic">Belum ada riwayat analisis kulit.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </main>
    <Footer />
  </div>
);

};






export default ProfilePage;
