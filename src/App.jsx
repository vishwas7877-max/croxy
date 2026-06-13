import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Spotlight from "./components/Spotlight";
import Particles from "./components/Particles";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Assistant from "./pages/Assistant";
import Watchlist from "./pages/Watchlist";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Preferences from "./pages/Preferences";
import ProtectedRoute from "./routes/ProtectionRoute";



export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#030014] text-white overflow-hidden relative min-h-screen">

        <SmoothScroll />
        <CustomCursor />
        <Particles />
        <Spotlight />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/discover"
            element={<Discover />}
          />

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/assistant"
            element={<Assistant />}
          />

          <Route
            path="/watchlist"
            element={<Watchlist />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path ="/preferences"
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}