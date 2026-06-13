import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Discover",
      path: "/discover",
    },
    {
      name: "Assistant",
      path: "/assistant",
    },
    {
      name: "Watchlist",
      path: "/watchlist",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
    },
  ];

  // HIDE NAV ON SCROLL DOWN
  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        setShowNav(true);
        return;
      }

      if (currentScroll > lastScroll) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{
        y: showNav ? 0 : -120,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >

      <div className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[28px] px-6 py-4 shadow-[0_0_50px_rgba(168,85,247,0.12)]">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500"></div>

            <h1 className="text-xl md:text-2xl font-black tracking-wide">
              CROXY
            </h1>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-3">

            {links.map((link, index) => {
              const active =
                location.pathname === link.path;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -2,
                  }}
                >
                  <Link
                    to={link.path}
                    className={`px-5 py-3 rounded-2xl transition duration-300 ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                        : "text-zinc-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* DESKTOP BUTTON */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:scale-105 transition duration-300"
            >
              Launch App
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="md:hidden mt-6 border-t border-white/10 pt-6"
          >

            <div className="flex flex-col gap-3">

              {links.map((link, index) => {
                const active =
                  location.pathname === link.path;

                return (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`px-5 py-4 rounded-2xl transition ${
                      active
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                        : "bg-white/[0.03] border border-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                to="/login"
                className="mt-4 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold text-center"
              >
                Launch App
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}