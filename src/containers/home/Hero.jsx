import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import TextAnimate from "../../components/ui/TextAnimate";
import { motion } from "framer-motion";

const ROLE_TITLES = [
  "Front-End Developer",
  "Web Developer",
  "React Developer",
  "TailwindCSS Developer",
  "Using Ai To Design Ui",
  "UI Animation Enthusiast",
  "Creative UX/UI Builder",
  "JavaScript Problem Solver",
  "AI-Driven Front-End Developer",
  "Lifelong Tech Learner",
];

const animationTypes = [
  "fadeIn",
  "blurIn",
  "blurInUp",
  "blurInDown",
  "slideUp",
  "slideDown",
  "slideLeft",
  "slideRight",
  "scaleUp",
  "scaleDown",
];

const codeString = `const profile = {
  name: "Noppol Phonart",
  title: "Front-End Developer",
  skills: ["HTML, CSS, JavaScript, React, TailwindCSS"],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.skills.length >= 5
    )
  }
}`;

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(ROLE_TITLES[0]);
  const [currentAnimation, setCurrentAnimation] = useState(animationTypes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => {
        const textIndex = ROLE_TITLES.indexOf(prev);
        if (textIndex === ROLE_TITLES.length - 1) {
          return ROLE_TITLES[0];
        }
        return ROLE_TITLES[textIndex + 1];
      });

      setCurrentAnimation(
        animationTypes[Math.floor(Math.random() * animationTypes.length)]
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container flex mx-auto items-center justify-center px-4 pt-32 md:py-8 md:pt-24 min-h-[calc(100dvh-200px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col text-white lg:text-left items-center lg:items-start">
            <div className="inline-block bg-zinc-900 text-purple-400 text-sm font-semibold py-1 px-3 rounded-full self-center lg:self-start">
              Welcome to my universe
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight my-4 md:my-6">
              Hello
              <span className="inline-block bg-zinc-900 text-white text-2xl font-semibold py-1 px-3 rounded-lg ml-4 align-middle animate-bounce">
                UI Animation
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
              I'm
              <span className="relative inline-block mx-4">Noppol Phonart</span>
            </h2>

            <div className="bg-zinc-900 text-white text-2xl font-semibold py-2 px-4 rounded-lg self-center lg:self-start mt-6">
              <TextAnimate
                key={currentText}
                by="character"
                animation={currentAnimation}
                delay={0.05}
                duration={1}
                startOnView={false}
                as="span"
                segmentClassName=""
              >
                {currentText}
              </TextAnimate>
            </div>

            <p className="text-xl text-gray-300 mt-6">
              Creative Front-End Developer ✨
            </p>

            <p className="text-lg text-gray-400 max-w-lg">
              Translating UX/UI visions into pixel-perfect web experiences using
              React and Tailwind CSS. I thrive on continuous learning and
              leverage research and AI to solve problems effectively
              <span className="inline-flex align-text-bottom gap-x-2 text-2xl px-2 text-sky-400 ">
                <FaReact />
                <RiTailwindCssFill />
              </span>
            </p>
          </div>

          {/* Right Side: Code Snippet */}
          <div className="flex lg:block">
            <div className="bg-[#282c34] rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-zinc-900 p-3 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                showLineNumbers
                customStyle={{ padding: "1.5rem", margin: 0 }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
