import { useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import API from "../api/backend";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleSignup(e) {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      navigate("/login");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.detail ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  }


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Glow */}
      <div className="absolute w-[900px] h-[900px] bg-pink-700/20 blur-[180px] rounded-full"></div>

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

        {/* Heading */}
        <div className="text-center">

          <p className="text-pink-400 uppercase tracking-[0.3em] text-sm mb-5">
            JOIN CROXY
          </p>

          <h1 className="text-4xl md:text-6xl font-black">
            Create Account
          </h1>

          <p className="text-zinc-400 text-lg mt-6">
            Start your personalized AI entertainment journey.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="mt-10 space-y-5"
        >

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-black/30 border border-white/10 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-5 rounded-2xl bg-black/30 border border-white/10 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
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
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-500 text-lg font-semibold hover:scale-[1.02] transition duration-300"
          >
            {
              loading
                ? "Creating Account..."
                : "Sign Up"
            }
          </button>

        </form>

        {/* Login Link */}
        <p className="text-zinc-500 text-center mt-8">

          Already have an account?

          <a
            href="/login"
            className="text-pink-400 ml-2"
          >
            Login
          </a>
        </p>

      </motion.div>
    </section>
  );
}