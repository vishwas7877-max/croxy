import { useEffect, useState } from "react";

import API from "../api/backend";

export default function AuthSection() {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchUser() {

      try {

        const response = await API.get(
          "/user/me"
        );

        setUser(response.data);

      } catch (error) {

        console.log(error);

        setUser(null);

      } finally {

        setLoading(false);
      }
    }

    fetchUser();

  }, []);


  function handleLogout() {

    localStorage.removeItem("token");

    window.location.reload();
  }


  if (loading) {

    return (
      <section className="py-24 text-center">
        Loading...
      </section>
    );
  }


  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-purple-700/10 blur-[180px] rounded-full"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-6">
          AUTHENTICATION
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black">
          Personalized
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Croxy Experience
          </span>
        </h2>

        <p className="text-zinc-400 text-lg mt-8 max-w-2xl mx-auto">
          Login to save recommendations, create watchlists,
          track anime and personalize your entertainment feed.
        </p>

        {!user ? (

          <a
            href="/login"
            className="inline-block mt-12 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-lg hover:scale-105 transition duration-300"
          >
            Login
          </a>

        ) : (

          <div className="mt-12">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
              {user.username[0].toUpperCase()}
            </div>

            {/* Name */}
            <h3 className="text-3xl font-bold mt-6">
              {user.username}
            </h3>

            {/* Email */}
            <p className="text-zinc-400 mt-2">
              {user.email}
            </p>

            {/* Badge */}
            <div className="inline-flex mt-6 px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              Logged In Successfully
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="mt-8 px-8 py-4 rounded-full border border-white/10 hover:bg-white/10 transition"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </section>
  );
}