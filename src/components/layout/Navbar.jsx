import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaGithub, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import StaggeredMenu from "./StaggeredMenu"; // อยู่โฟลเดอร์เดียวกับ Navbar.jsx

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
];

// แปลง NAV_LINKS ให้กลายเป็น items ที่ใช้กับ StaggeredMenu
const MENU_ITEMS = NAV_LINKS.map((link) => ({
  label: link.name,
  link: link.path,
  ariaLabel: link.name,
}));

// social ใช้ร่วมกันทั้ง desktop + mobile
const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    link: "https://www.facebook.com/beer.noppol.1999",
  },
  {
    label: "Instagram",
    link: "https://www.instagram.com/beer.npa",
  },
  {
    label: "TikTok",
    link: "https://www.tiktok.com/@beernoppol",
  },
  {
    label: "GitHub",
    link: "https://github.com/BeerMCMXCIX",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ===== Mobile: ใช้ StaggeredMenu เป็น hamburger menu ===== */}
      <div className="fixed inset-x-0 top-0 z-50 md:hidden">
        <StaggeredMenu
          position="right"
          // ไล่ layer สีด้านหลัง (ปรับได้ตามธีม)
          colors={["#020617", "#0f172a", "#1e293b", "#4c1d95"]}
          items={MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
          displaySocials={true}
          displayItemNumbering={false}
          isFixed={true}
          accentColor="#38bdf8"
          // เปลี่ยน path โลโก้ตามโปรเจกต์ของเราเอง
          // logoUrl="/logo192.png"
        />
      </div>

      {/* ===== Desktop: ใช้ navbar เดิม ===== */}
      <nav className="fixed inset-x-0 top-8 z-50 hidden md:flex">
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 px-4 
          ${
            scrolled
              ? "bg-zinc-900/80 backdrop-blur-xs md:p-6 md:rounded-3xl shadow-xl py-4 xl:w-[90%] -translate-y-6"
              : "bg-transparent py-4 xl:w-[70%]"
          }`}
        >
          {/* Logo */}
          <NavLink to="/" className="text-white text-3xl font-bold font-mono">
            Noppol
          </NavLink>

          {/* Nav - Center (ลิงก์เมนู) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative flex items-center justify-center h-10 px-4 rounded-full text-white text-sm font-medium transition-all duration-200
                 ${isActive ? "bg-white text-black" : "hover:bg-gray-800"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-200
                    ${isActive ? "bg-white" : ""}`}
                    />
                    <span
                      className={`relative z-10 ${
                        isActive ? "text-black" : "text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Nav - Right (social icon) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a
              href={SOCIAL_ITEMS[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="facebook profile"
            >
              <FaFacebookF className="text-xl" />
            </a>

            <a
              href={SOCIAL_ITEMS[1].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="instagram profile"
            >
              <FaInstagram className="text-xl" />
            </a>

            <a
              href={SOCIAL_ITEMS[2].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="tiktok profile"
            >
              <FaTiktok className="text-xl" />
            </a>

            <a
              href={SOCIAL_ITEMS[3].link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="GitHub profile"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
