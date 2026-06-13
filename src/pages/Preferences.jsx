import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Preferences = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mood: "",
    favorite_genre: "",
    anime_preference: "",
    avatar: "",
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/preferences/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/preferences",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl p-10">

        <h1 className="text-4xl font-black mb-8">
          Your Preferences
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Mood */}
          <div>
            <label className="block mb-2 text-zinc-300">
              Mood
            </label>

            <select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3"
            >
              <option value="">Select Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>

          {/* Favorite Genre */}
          <div>
            <label className="block mb-2 text-zinc-300">
              Favorite Genre
            </label>

            <input
              type="text"
              name="favorite_genre"
              value={formData.favorite_genre}
              onChange={handleChange}
              placeholder="Action, Sci-Fi, Romance..."
              className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Anime Preference */}
          <div>
            <label className="block mb-2 text-zinc-300">
              Anime Preference
            </label>

            <input
              type="text"
              name="anime_preference"
              value={formData.anime_preference}
              onChange={handleChange}
              placeholder="Shonen, Seinen..."
              className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block mb-2 text-zinc-300">
              Avatar Style
            </label>

            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Cyberpunk, Anime..."
              className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 font-bold text-lg hover:opacity-90 transition"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;