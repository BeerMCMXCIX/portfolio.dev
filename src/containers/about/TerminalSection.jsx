import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "../../components/ui/Terminal";

export default function TerminalSection() {
  return (
    <section className="container mx-auto flex-1 px-4 pt-32 md:py-8 md:pt-24 ">
      <div className="flex justify-center items-center min-h-[calc(100dvh-200px)] ">
        <div className="w-full max-w-lg h-full max-h-[400px]">
          <Terminal sequence startOnView className="w-full max-w-lg">
            {/* บรรทัดที่ 1: พิมพ์คำสั่ง */}
            <TypingAnimation className="text-yellow-300">
              $ npx create-app Noppol-portfolio
            </TypingAnimation>

            {/* บรรทัดที่ 2: ข้อความโผล่ตามคิว */}
            <AnimatedSpan className="text-green-400">
              ✓ Front-End Developer Check...
            </AnimatedSpan>
            <AnimatedSpan className="text-green-400">
              ✓ Crafting modern landing pages...
            </AnimatedSpan>
            <AnimatedSpan className="text-green-400">
              ✓ Designing clean business & product websites...
            </AnimatedSpan>
            <AnimatedSpan className="text-green-400">
              ✓ Building responsive UI with React & Tailwind CSS...
            </AnimatedSpan>
            <AnimatedSpan className="text-green-400">
              ✓ Adding small features with Node.js & Express...
            </AnimatedSpan>
            <AnimatedSpan className="text-green-400">
              ✓ Connecting MongoDB / MySQL when needed...
            </AnimatedSpan>

            {/* บรรทัดที่ 3: พิมพ์ยาว ๆ */}
            <TypingAnimation className="text-blue-400">
              ✓ Stack ready: React, Tailwind CSS
            </TypingAnimation>

            {/* บรรทัดที่ 4: ข้อความปิดท้าย */}
            <AnimatedSpan className="text-gray-400">
              Done — Ready to build your next business website
            </AnimatedSpan>
          </Terminal>
        </div>
      </div>
    </section>
  );
}
