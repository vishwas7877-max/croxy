
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  getPreferences,
  getAnimeRecommendations,
  getMusicRecommendations,
} from "../api/dashboard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [anime, setAnime] = useState([]);
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const userData = await getCurrentUser();
      let prefData = null;

      try {
        prefData = await getPreferences();
      } catch (err) {
        console.log("No preferences found yet");
      }


      let animeData = [];
      let musicData = [];

      try {
        animeData = await getAnimeRecommendations();
      } catch (err) {
        console.log("No anime recommendations yet");
      }

      try {
        musicData = await getMusicRecommendations();
      } catch (err) {
        console.log("No music recommendations yet");
      }

      console.log("USER:", userData);
      console.log("PREFERENCES:", prefData);
      console.log("ANIME:", animeData);
      console.log("MUSIC:", musicData);

      setUser(userData);
      setPreferences(prefData);

      // Safe array handling
      setAnime(
        Array.isArray(animeData)
          ? animeData
          : animeData.recommendations || []
      );

      setMusic(
        Array.isArray(musicData)
          ? musicData
          : musicData.recommendations || []
      );

    } catch (error) {
      console.error("Dashboard Error:", error);

      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black">
          CROXY Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>
        <button
          onClick={() => navigate("/preferences")}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl font-semibold"
        >
          Preferences
        </button>
      </div>





      {/* USER CARD */}
      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mb-8">

        <h2 className="text-3xl font-bold mb-4">
          Welcome {user?.username || "User"}
        </h2>

        <p className="text-zinc-400 mb-2">
          Email: {user?.email || "N/A"}
        </p>

        <p className="text-zinc-400">
          Mood:{" "}
          <span className="text-purple-400">
            {preferences?.mood || "Not Set"}
          </span>
        </p>
      </div>

      {/* ANIME SECTION */}
      <div className="mb-10">

        <h2 className="text-3xl font-bold mb-6">
          Anime Recommendations
        </h2>

        {anime.length === 0 ? (
          <p className="text-zinc-500">
            No anime recommendations available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {anime.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-purple-500/40 transition"
              >
                <h3 className="text-xl font-semibold">
                  {item.title || item.name || item}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MUSIC SECTION */}
      <div>

        <h2 className="text-3xl font-bold mb-6">
          Music Recommendations
        </h2>

        {music.length === 0 ? (
          <p className="text-zinc-500">
            No music recommendations available.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {music.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-pink-500/40 transition"
              >
                <h3 className="text-xl font-semibold">
                  {item.title || item.name || item}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;