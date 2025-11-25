import { useMemo, useRef, useEffect } from "react";

/**
 * props:
 * - items: ReactNode[]      (เช่น <SiReact /> หรือ <img .../> — แนะนำ memo ที่ฝั่งผู้ใช้)
 * - speed: number           วินาทีต่อรอบ (ยิ่งน้อยยิ่งเร็ว)   | ค่าเริ่มต้น 24
 * - gap: number             ระยะห่างไอคอน (px)                | ค่าเริ่มต้น 56
 * - direction: 'left'|'right' ทิศทางเลื่อน                    | ค่าเริ่มต้น 'left'
 * - pauseOnHover: boolean   หยุดเมื่อ hover (เฉพาะเดสก์ท็อป)   | ค่าเริ่มต้น true
 * - size: number            ขนาดไอคอน (px) สำหรับ react-icons | ค่าเริ่มต้น 48
 * - grayscale: boolean      ทำโลโก้จางเล็กน้อย                 | ค่าเริ่มต้น true
 * - className, itemClassName: string  คลาสเสริม
 */
export default function LogoLoop({
  items = [],
  speed = 28,
  gap = 56,
  direction = "left",
  pauseOnHover = true,
  size = 48,
  grayscale = true,
  className = "",
  itemClassName = "",
}) {
  // ทำซ้ำ 2 ชุดเพื่อให้เลื่อนแล้ววนต่อเนื่องแบบไร้รอยต่อ
  const loopItems = useMemo(() => [...items, ...items], [items]);

  const dur = Math.max(8, Number(speed)); // ป้องกันค่าต่ำเกินไป
  const isLeft = direction !== "right";

  const trackRef = useRef(null);

  // หยุดแอนิเมชันเมื่อแถบโลโก้อยู่พ้น viewport (ลดภาระ CPU/GPU)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        el.style.animationPlayState = visible ? "running" : "paused";
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={[
        "logo-loop-mask", // ใช้ควบคุมการปิด mask บนมือถือผ่าน <style> ด้านล่าง
        "relative w-full overflow-hidden border border-white/10 bg-white/[0.02] p-6",
        "group", // ให้ hover ที่ wrapper แจ้งไปยังลูกได้
        className,
      ].join(" ")}
      // ใส่ mask เฟดซ้าย-ขวา (จะถูกปิดในมือถือด้วย CSS media query ข้างล่าง)
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
      aria-label="logo-loop"
    >
      {/* keyframes + media rules เฉพาะคอมโพเนนต์นี้ */}
      {/*ปิด mask-image บนจอเล็ก (WebKit/iOS ใช้ mask หนัก) 
        @media (max-width: 767px) {
          .logo-loop-mask {
            -webkit-mask-image:;
            mask-image: ;
          }*/}
      <style>{`
        @keyframes logo-loop-left {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-51%,0,0); }
        }
        @keyframes logo-loop-right {
          from { transform: translate3d(-50%,0,0); }
          to   { transform: translate3d(0,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .logo-loop-track { animation: none !important; }
        }
        }
      `}</style>

      {/* แทร็กที่เลื่อนจริง */}
      <div
        ref={trackRef}
        className={[
          "logo-loop-track flex w-max items-center",
          "will-change-transform [backface-visibility:hidden] [transform:translateZ(0)]",
          pauseOnHover
            ? "motion-safe:group-hover:[animation-play-state:paused]"
            : "",
        ].join(" ")}
        style={{
          gap: `${gap}px`,
          animation: `logo-loop-${
            isLeft ? "left" : "right"
          } ${dur}s linear infinite`,
        }}
      >
        {loopItems.map((node, idx) => (
          <div
            key={idx}
            className={[
              "shrink-0 flex items-center justify-center",
              grayscale ? "opacity-80 md:group-hover:opacity-100" : "",
              itemClassName,
            ].join(" ")}
            style={{ minWidth: `${size}px`, minHeight: `${size}px` }}
          >
            {/* ถ้าเป็น react-icons ให้เติม size อัตโนมัติ (ถ้ายังไม่ถูกกำหนดเอง) */}
            {cloneWithSize(node, size)}
          </div>
        ))}
      </div>

      {/* เฟดซ้าย-ขวา เผื่อเบราว์เซอร์ไม่รองรับ mask-image */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[rgba(0,0,0,0.8)] to-transparent" />
    </div>
  );
}

/** ถ้าไอคอนกำหนด size เองมาแล้ว จะไม่ทับค่าเดิม */
function cloneWithSize(node, size) {
  if (!node || typeof node !== "object" || !("props" in node)) return node;
  const props = node.props || {};
  if (props.size != null) return node; // ให้ค่าที่ผู้ใช้ส่งมาชนะ
  return { ...node, props: { ...props, size } };
}
