import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Button from "../components/global/Button";

const SignInPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Backend butuh 'email' dan 'password'
        const payload = {
          email: formData.email,
          password: formData.password,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          payload,
        );

        if (response.data.status === "success") {
          onLogin(response.data.token);
          navigate("/");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-bold text-[#091E42] mb-10 text-center">
          Sign In
        </h1>

        <div className="bg-white w-full max-w-md rounded-xl border border-gray-100 shadow-sm p-8">
          {errors.global && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-4 text-center border border-red-100 italic">
              * {errors.global}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="ex.... Wardah"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.username ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm transition-all`}
              />
              {errors.username && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="ex....elena.rodriguez@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.password}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full py-3 bg-[#004E98]">
              Sign In
            </Button>
          </form>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an Account?{" "}
          <Link
            to="/signup"
            className="text-[#004E98] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
