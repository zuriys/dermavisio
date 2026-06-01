import React from "react";

const Footer = ({ rightText }) => {
  return (
    <footer className="px-10 py-8 border-t border-gray-100 mt-20">
      <div className="flex justify-between items-start text-[11px] text-gray-400">
        <div>
          <p>
            © 2026 DermaVisio Professional medical consultation is required for
            all diagnoses.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:underline">
              Medical Disclaimer
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Contact Support
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="italic">
          {rightText ||
            "Empowering dermatological health through artificial intelligence."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
