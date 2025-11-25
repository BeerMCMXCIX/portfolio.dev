import { useEffect, useRef, useState } from "react";

export default function InteractiveBackground({ children }) {
  const containerRef = useRef(null);

  // เก็บพิกัดเมาส์ภายใน element (หน่วยเป็นพิกเซลของ element เอง)
  const [pos, setPos] = useState({ x: -9999, y: -9999 });

  // ให้สามารถปิดบนอุปกรณ์ที่ pointer ไม่ละเอียด (ทัช) ได้ โดยไม่กระทบสี/หน้าตา
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mm = window.matchMedia?.("(pointer: fine)");
    if (mm) setEnabled(mm.matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;

    const handleMove = (e) => {
      const el = containerRef.current;
      if (!el) return;

      // ใช้ clientX/clientY (อิง viewport) ลบด้วยตำแหน่งซ้าย/บนของกรอบ (ก็อิง viewport เช่นกัน)
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // ใช้ rAF เพื่อลดการ setState ถี่เกินไป (ลื่นขึ้น)
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setPos({ x, y }));
    };

    const handleLeave = () => {
      // ซ่อน/ย้ายวงกลมออกนอกจอเมื่อเมาส์ออกนอกหน้าต่าง
      cancelAnimationFrame(raf);
      setPos({ x: -9999, y: -9999 });
    };

    // ผูกกับ window เพื่อให้ tracking ต่อเนื่องแม้เคอร์เซอร์เร็ว ๆ
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* ชั้นจุด “จาง” — ไม่เปลี่ยนแปลงสี/ขนาด/ลวดลาย */}
      <div className="absolute inset-0 dot-grid-dim pointer-events-none" />

      {/* ชั้นจุด “สว่าง” — ไม่เปลี่ยนแปลงสี/ขนาด/ลวดลาย
        เปลี่ยนเฉพาะตำแหน่ง at ${pos.x}px ${pos.y}px ให้สัมพันธ์กับ element */}
      <div
        className="absolute inset-0 dot-grid-bright pointer-events-none"
        style={{
          // คงรูปแบบเดิมทุกอย่าง ยกเว้นตำแหน่ง at … ที่คำนวณใหม่
          maskImage: `radial-gradient(circle var(--ib-radius, 300px) at ${pos.x}px ${pos.y}px, white, transparent 55%)`,
          WebkitMaskImage: `radial-gradient(circle var(--ib-radius, 300px) at ${pos.x}px ${pos.y}px, white, transparent 55%)`,
        }}
      />

      {/* คอนเทนต์จริง */}
      <div className="relative">{children}</div>
    </div>
  );
}
