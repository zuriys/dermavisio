import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
        <div className="w-16 h-16 bg-[#F0F7FF] text-[#004E98] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Akses Terbatas</h3>
        <p className="text-gray-500 mb-6">
          Silakan Sign In terlebih dahulu untuk mengakses halaman ini.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              onClose();
              navigate("/signin");
            }}
            className="w-full"
          >
            Sign In Sekarang
          </Button>
          <button
            onClick={onClose}
            className="text-gray-400 text-sm font-semibold hover:text-gray-600"
          >
            Nanti Saja
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
