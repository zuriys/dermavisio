import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Button from "../components/global/Button";

const ProfilePage = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State untuk Foto Profil
  const [profileImage, setProfileImage] = useState(null);

  // State untuk Daftar Riwayat (History)
  const [history, setHistory] = useState([
    {
      id: 1,
      text: "The AI model has identified characteristics consistent with a benign growth. No immediate signs of malignancy detected. 98% Confidence",
    },
    {
      id: 2,
      text: "The AI model has identified characteristics consistent with a benign growth. No immediate signs of malignancy detected. 98% Confidence",
    },
  ]);

  // Fungsi Upload Foto (dari Komputer)
  const handleUpdatePhoto = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi Hapus Foto
  const handleRemovePhoto = () => {
    setProfileImage(null);
  };

  // Fungsi Hapus Riwayat
  const deleteHistoryItem = (id) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      {/* <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} /> */}

      <main className="flex-grow max-w-5xl mx-auto w-full px-10 py-8">
        {/* Tombol Keluar */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#004E98] font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Keluar
          </button>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#091E42] mb-1">
            Personal Information
          </h1>
          <p className="text-gray-400 text-sm">
            Manage your basic identity information and contact details.
          </p>
        </header>

        {/* Profile Picture Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-6 flex items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 bg-[#D1D5DB] rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300"></div>
              )}
            </div>
            <div
              className="absolute -bottom-2 -right-2 bg-[#004E98] p-2 rounded-lg text-white border-2 border-white shadow-md cursor-pointer"
              onClick={handleUpdatePhoto}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            {/* Hidden Input File */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={onFileChange}
            />
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-[#091E42] mb-1">Profile Picture</h3>
            <p className="text-xs text-gray-400 mb-4">
              Upload a clear photo of your face for identity verification.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleUpdatePhoto}
                className="py-2 px-5 text-xs h-auto bg-[#004E98]"
              >
                Update Photo
              </Button>
              <Button
                onClick={handleRemovePhoto}
                variant="outline"
                className="py-2 px-5 text-xs h-auto border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Dr. Elena Rodriguez"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Date of Birth
                </label>
                <input
                  type="text"
                  defaultValue="05/12/1988"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Gender
                </label>
                <input
                  type="text"
                  defaultValue="Female"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="elena.rodriguez@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="text"
                defaultValue="+1 (555) 012-3456"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                defaultValue="********"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm text-gray-400"
              />
            </div>

            <div className="flex justify-end items-center gap-6 pt-4">
              <button
                type="button"
                className="text-gray-600 font-bold hover:text-gray-800 transition-colors text-sm"
              >
                Cancel
              </button>
              <Button type="submit" className="px-10 bg-[#004E98]">
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* History Section */}
        <section className="mt-12">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            History
          </h2>
          <div className="space-y-3">
            {history.length > 0 ? (
              history.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm"
                >
                  <p className="text-[12px] text-gray-500 flex-1 leading-relaxed">
                    {item.id}. {item.text}
                  </p>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-sm italic">
                No history available.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
