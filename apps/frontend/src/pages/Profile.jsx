import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Button from "../components/global/Button";

const ProfilePage = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      {/* <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} /> */}

      <main className="flex-grow max-w-5xl mx-auto w-full px-10 py-8">
        {/* Tombol Keluar - Berada di bawah logo navbar */}
        <div className="mb-8">
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

        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#091E42] mb-2">
            Personal Information
          </h1>
          <p className="text-gray-500 text-sm">
            Manage your basic identity information and contact details.
          </p>
        </header>

        {/* Profile Picture Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 mb-8 flex items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 bg-[#D1D5DB] rounded-xl flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gray-300"></div>
              <div className="absolute -bottom-1 -right-1 bg-[#004E98] p-2 rounded-lg text-white shadow-lg border-2 border-white">
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
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-gray-800 mb-1">Profile Picture</h3>
            <p className="text-sm text-gray-500 mb-4">
              Upload a clear photo of your face for identity verification.
            </p>
            <div className="flex gap-3">
              <Button className="py-2 px-5 text-sm">Update Photo</Button>
              <Button
                variant="outline"
                className="py-2 px-5 text-sm border-gray-200 text-gray-700"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Information Form Card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Dr. Elena Rodriguez"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Date of Birth
                </label>
                <input
                  type="text"
                  defaultValue="05/12/1988"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* GENDER DROPDOWN DI PROFILE */}
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Gender
                </label>
                <select
                  defaultValue="Female"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-sm bg-white cursor-pointer transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+1 (555) 012-3456"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="elena.rodriguez@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                defaultValue="••••••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004E98] outline-none text-gray-400"
              />
            </div>

            <div className="flex justify-end items-center gap-6 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-gray-600 font-bold hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <Button type="submit" className="px-10">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
