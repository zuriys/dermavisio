import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Button from "../components/global/Button";

const SignUpPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    gender: "",
    phone: "+",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // 1. Auto-format DOB (DD/MM/YYYY)
  const handleDOBChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    let formatted = val;
    if (val.length > 2 && val.length <= 4) {
      formatted = `${val.slice(0, 2)}/${val.slice(2)}`;
    } else if (val.length > 4) {
      formatted = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4, 8)}`;
    }
    setFormData({ ...formData, dob: formatted });
    if (errors.dob) setErrors({ ...errors, dob: null });
  };

  // 2. Phone Formatting (International +)
  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith("+")) {
      val = "+" + val.replace(/\D/g, "");
    } else {
      val = "+" + val.slice(1).replace(/\D/g, "");
    }
    setFormData({ ...formData, phone: val });
    if (errors.phone) setErrors({ ...errors, phone: null });
  };

  // 3. Global Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password: Min 8, 1 Upper, 1 Lower, 1 Number, 1 Special
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username) newErrors.username = "Username is required";
    if (formData.dob.length < 10) newErrors.dob = "Format must be DD/MM/YYYY";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (formData.phone.length < 10)
      newErrors.phone = "Invalid phone format (min 8 digits after code)";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format (ex: name@gmail.com)";
    if (!passRegex.test(formData.password)) {
      newErrors.password =
        "Min 8 chars, must include uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onLogin();
      console.log("Sign Up Success:", formData);
      navigate("/"); // Redirect ke Home
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl font-bold text-[#091E42] mb-10 text-center">
          Sign Up
        </h1>

        <div className="bg-white w-full max-w-md rounded-xl border border-gray-100 shadow-sm p-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="ex ... Elena Rodriguez"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.username ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm placeholder:italic transition-all`}
              />
              {errors.username && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.username}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Date of Birth
              </label>
              <input
                name="dob"
                type="text"
                placeholder="DD/MM/YYYY"
                value={formData.dob}
                onChange={handleDOBChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.dob ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm placeholder:italic transition-all`}
              />
              {errors.dob && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.dob}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.gender ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm bg-white cursor-pointer transition-all`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.gender}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm transition-all`}
              />
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1 italic">
                  * {errors.phone}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="ex....elena@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm placeholder:italic transition-all`}
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
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#004E98] outline-none text-sm transition-all`}
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
                <p className="text-red-500 text-[11px] mt-1 italic leading-tight">
                  * {errors.password}
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full py-3 bg-[#004E98]">
                Sign Up
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Already have an Account?{" "}
          <Link
            to="/signin"
            className="text-[#004E98] font-bold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;
