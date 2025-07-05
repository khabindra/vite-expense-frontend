import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { IoMdPerson, IoMdMail, IoMdLock } from "react-icons/io";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register/", form);
      console.log(response.data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              className="block mb-1 text-gray-600 font-medium"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition">
              <IoMdPerson className="ml-3 text-gray-500" size={20} />
              <input
                id="username"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className="block mb-1 text-gray-600 font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition">
              <IoMdMail className="ml-3 text-gray-500" size={20} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="block mb-1 text-gray-600 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition">
              <IoMdLock className="ml-3 text-gray-500" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
