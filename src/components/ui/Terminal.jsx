// src/components/ui/TerminalShowCase.jsx
// คอมโพเนนต์: Terminal, AnimatedSpan, TypingAnimation
// - รองรับลำดับการเล่นแบบ sequence (เล่นทีละชิ้นตามคิว)
// - พิมพ์ทีละตัว (TypingAnimation) และตั้งให้ "เล่นครั้งเดียว" ด้วย persistKey
// - กันการเล่นซ้ำจาก re-render ด้วย initial={false} + layout="position"
// - ไม่ใช้ TypeScript / ไม่ใช้ cn / พร้อม Tailwind

"use client";

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from "react";
import { motion, useInView } from "motion/react";

/* ยูทิลรวม className แบบเบา ๆ */
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

/* ---------- กลไกจำว่า TypingAnimation ไหน "เคยเล่นแล้ว" ---------- */
const __playedTypingOnce = new Set(); // เก็บ id/persistKey ที่เล่นเสร็จแล้ว

/* ---------- Context ควบคุมลำดับ (sequence) ---------- */
const SequenceContext = createContext(null);
const useSequence = () => useContext(SequenceContext);

const ItemIndexContext = createContext(null);
const useItemIndex = () => useContext(ItemIndexContext);

/* ---------- AnimatedSpan: แอนิเมชัน fade+slide สั้น ๆ ---------- */
export function AnimatedSpan({
  children,
  delay = 0, // ms
  className,
  startOnView = false,
  ...props
}) {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);

  // ถ้าอยู่ในโหมด sequence: รอให้ถึงคิวตัวเองก่อนค่อยเริ่ม
  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted) return;
    if (hasStarted) return;
    if (sequence.activeIndex === itemIndex) setHasStarted(true);
  }, [
    sequence.activeIndex,
    sequence.sequenceStarted,
    hasStarted,
    itemIndex,
    sequence,
  ]);

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true;

  return (
    <motion.div
      ref={elementRef}
      layout="position"
      initial={false} // กันการยิง initial ซ้ำ ๆ ตอน re-render
      variants={{
        hidden: { opacity: 0, y: -5 },
        visible: { opacity: 1, y: 0 },
      }}
      animate={shouldAnimate ? "visible" : "hidden"}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cx("grid text-sm font-normal tracking-tight", className)}
      onAnimationComplete={() => {
        // แจ้งคิวว่าเราเล่นเสร็จแล้ว → ปลดล็อกชิ้นถัดไป
        if (!sequence) return;
        if (itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ---------- TypingAnimation: พิมพ์ทีละตัว + เล่นครั้งเดียว ---------- */
export function TypingAnimation({
  children, // ต้องเป็น string
  className,
  duration = 60, // ms ต่อ 1 ตัวอักษร
  delay = 0, // ms ก่อนเริ่ม
  as: Component = "span",
  startOnView = true,
  persistKey, // คีย์ถาวรสำหรับจดจำว่า "เคยเล่นแล้ว"
  ...props
}) {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children ต้องเป็น string เท่านั้น");
  }

  // ทำให้ Component รองรับ motion props
  const MotionComponent = useMemo(
    () =>
      motion.create(Component, {
        forwardMotionProps: true,
      }),
    [Component]
  );

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const autoId = useId();
  const id = persistKey ?? autoId;

  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });

  const sequence = useSequence();
  const itemIndex = useItemIndex();

  // ถ้า "เคยเล่นแล้ว" ให้แสดงข้อความเต็มทันที และไม่เริ่มแอนิเมชันใหม่
  useEffect(() => {
    if (__playedTypingOnce.has(id)) {
      setDisplayedText(children);
      setStarted(false);
    }
  }, [id, children]);

  // ตัดสินใจเริ่ม (ครั้งแรก) จาก sequence/viewport
  useEffect(() => {
    if (__playedTypingOnce.has(id)) return; // เคยเล่นแล้ว ไม่เริ่มซ้ำ

    if (sequence && itemIndex !== null) {
      if (!sequence.sequenceStarted) return;
      if (started) return;
      if (sequence.activeIndex === itemIndex) setStarted(true);
      return;
    }

    if (!startOnView) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }

    if (!isInView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [
    delay,
    startOnView,
    isInView,
    started,
    sequence.activeIndex,
    sequence.sequenceStarted,
    itemIndex,
    id,
    sequence,
  ]);

  // เอฟเฟกต์พิมพ์ทีละตัว
  useEffect(() => {
    if (!started) return;
    if (__playedTypingOnce.has(id)) return; // เคยเล่นแล้ว ไม่ต้องพิมพ์ใหม่

    let i = 0;
    const typing = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        __playedTypingOnce.add(id); // จบครั้งแรก → จดจำว่าเล่นแล้ว
        if (sequence && itemIndex !== null) {
          sequence.completeItem(itemIndex); // ปลดล็อกคิวถัดไป
        }
      }
    }, duration);

    return () => clearInterval(typing);
  }, [children, duration, started, sequence, itemIndex, id]);

  return (
    <MotionComponent
      ref={elementRef}
      layout="position"
      initial={false}
      className={cx("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  );
}

/* ---------- Terminal: กรอบ + ระบบคิวสำหรับลูก ๆ ---------- */
export function Terminal({
  children,
  className,
  sequence = true,
  startOnView = true,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });

  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo(() => {
    if (!sequence) return null;
    return {
      completeItem: (index) => {
        setActiveIndex((current) =>
          index === current ? current + 1 : current
        );
      },
      activeIndex,
      sequenceStarted,
    };
  }, [sequence, activeIndex, sequenceStarted]);

  // ห่อ children ด้วย ItemIndexContext + ทำ key ให้เสถียร
  const wrappedChildren = useMemo(() => {
    if (!sequence) return children;
    const array = Children.toArray(children);
    return array.map((child, index) => (
      <ItemIndexContext.Provider
        key={child?.key ?? `seq-${index}`} // ใช้ key เดิมถ้ามี → กัน remount
        value={index}
      >
        {child}
      </ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div
      ref={containerRef}
      className={cx(
        "z-0 h-full max-h-[420px] w-full max-w-xl overflow-hidden rounded-xl",
        "border border-white/10 bg-neutral-900/60 backdrop-blur-sm",
        className
      )}
    >
      {/* แถบหัวหน้าต่างสไตล์ macOS */}
      <div className="flex items-center gap-2 border-b border-white/10 p-4">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
        <div className="ml-auto text-xs text-gray-400">Terminal</div>
      </div>

      {/* เนื้อหาโค้ด */}
      <pre className="p-4 text-gray-200">
        <code className="grid gap-y-1 overflow-auto">{wrappedChildren}</code>
      </pre>
    </div>
  );

  if (!sequence) return content;

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  );
}
