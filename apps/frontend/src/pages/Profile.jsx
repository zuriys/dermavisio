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
    {/* Sesuaikan padding top agar tidak tertutup navbar fixed */}
    <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-24">
      
      {/* Tombol Kembali */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-[#004E98] font-bold text-sm transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Keluar</span>
        </button>
      </div>

      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[#091E42] tracking-tight">
          Personal Information
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Manage your basic identity information and contact details.
        </p>
      </header>

      {/* Profile Picture Card - Mobile: Stack (Column), Desktop: Side-by-side (Row) */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative shrink-0">
          <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
            {profilePreview ? (
              <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl">👤</span>
            )}
          </div>
          <button
            onClick={handleUpdatePhotoClick}
            className="absolute -bottom-2 -right-2 bg-[#004E98] p-2 rounded-lg text-white border-2 border-white shadow-lg"
          >
            <Camera size={14} />
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={onFileChange} />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-[#091E42]">Profile Picture</h3>
          <p className="text-[11px] text-slate-400 mb-4">
            Upload foto wajah yang jelas untuk verifikasi identitas.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <Button onClick={handleUpdatePhotoClick} className="py-2 px-4 text-[11px] bg-[#004E98] h-auto">Update</Button>
            <Button onClick={handleRemovePhoto} variant="outline" className="py-2 px-4 text-[11px] h-auto border-slate-200 text-slate-500">Remove</Button>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-10">
        <form className="space-y-6" onSubmit={handleSaveChanges}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                value={userData.nama || ""}
                onChange={(e) => setUserData({ ...userData, nama: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Date of Birth</label>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-500 text-sm border border-slate-100">{userData.tanggal_lahir || "-"}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gender</label>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-500 text-sm border border-slate-100">{userData.gender || "-"}</div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
              <div className="w-full px-4 py-3 rounded-xl bg-slate-50 text-slate-500 text-sm border border-slate-100">{userData.telepon || "-"}</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-end items-center gap-4">
            <button type="button" onClick={() => navigate(-1)} className="text-slate-400 font-bold text-sm hover:text-slate-600 order-2 sm:order-1">Cancel</button>
            <Button type="submit" className="w-full sm:w-auto px-10 bg-[#004E98] order-1 sm:order-2">Save Changes</Button>
          </div>
        </form>
      </div>

      {/* History Section */}
      <section className="mt-12">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Riwayat Analisis</h2>
        <div className="grid grid-cols-1 gap-3">
          {history.length > 0 ? (
            history.map((item, idx) => (
              <div key={item.id_prediksi} className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700 mb-0.5">{idx + 1}. {item.hasil_teks || "Analisis Kulit"}</p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Confidence: <span className="text-blue-600">{(item.confidence * 100).toFixed(1)}%</span> • {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button onClick={() => deleteHistoryItem(item.id_prediksi)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-xs italic text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">Belum ada riwayat.</p>
          )}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

};






export default ProfilePage;
