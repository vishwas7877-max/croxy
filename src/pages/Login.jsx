import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import API from "../api/backend";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  async function handleLogin(e) {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const formData = new URLSearchParams();

      formData.append("username", email);

      formData.append("password", password);

      const response = await API.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        "Invalid email or password"
      );

      console.log(err);

    } finally {

      setLoading(false);
    }
  }


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Glow */}
      <div className="absolute w-[900px] h-[900px] bg-purple-700/20 blur-[180px] rounded-full"></div>

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 w-full max-w-xl rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl p-10 md:p-14"
      >

        {/* Logo */}
        <div className="flex justify-center mb-8">

          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-purple-500 to-pink-500"></div>
        </div>

        {/* Heading */}
        <div className="text-center">

          <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-5">
            WELCOME TO CROXY
          </p>

          <h1 className="text-4xl md:text-6xl font-black">
            Login To Continue
          </h1>

          <p className="text-zinc-400 text-lg mt-6">
            Your AI-powered entertainment universe.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-5"
        >

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-black/30 border border-white/10 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-black/30 border border-white/10 outline-none"
            required
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-lg font-semibold hover:scale-[1.02] transition duration-300"
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>
          <p className="text-zinc-500 text-center mt-8">

            Don't have an account?

            <a
              href="/signup"
              className="text-purple-400 ml-2"
            >
              Sign Up
            </a>

          </p>

        </form>

        {/* Terms */}
        <p className="text-zinc-500 text-sm text-center mt-8 leading-relaxed">
          By continuing, you agree to Croxy’s terms,
          privacy policy and AI recommendation system.
        </p>

      </motion.div>
    </section>
  );
}