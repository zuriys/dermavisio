import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onLogin();
      console.log("Sign In Success:", formData);
      navigate("/"); // Redirect ke Home
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-bold text-[#091E42] mb-10 text-center">
          Sign In
        </h1>

        <div className="bg-white w-full max-w-md rounded-xl border border-gray-100 shadow-sm p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="ex.... Wardah"
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.username ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-[#004E98] outline-none text-sm placeholder:italic transition-all`}
              />
              {errors.username && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="ex....elena.rodriguez@example.com"
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-200"
                } focus:ring-2 focus:ring-[#004E98] outline-none text-sm placeholder:italic transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } focus:ring-2 focus:ring-[#004E98] outline-none text-sm transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#004E98]"
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

            <div className="pt-2">
              <Button type="submit" className="w-full py-3 bg-[#004E98]">
                Sign In
              </Button>
            </div>
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
