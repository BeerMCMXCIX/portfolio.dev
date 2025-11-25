import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Projects from "./pages/Projects";

const Placeholder = (text) => <div className=" mx-auto ">{text}</div>;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // เลื่อนไปบนสุดของหน้า
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // หรือ "smooth" ถ้าอยากให้เลื่อนแบบนุ่ม ๆ
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={Placeholder(<Experience />)} />
        <Route path="/projects" element={Placeholder(<Projects />)} />
        <Route path="/about" element={Placeholder(<About />)} />
      </Routes>
    </>
  );
}
