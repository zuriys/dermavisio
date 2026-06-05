import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Camera, Trash2, Activity } from "lucide-react";
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
