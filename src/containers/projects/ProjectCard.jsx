import ReactTailwind from "../../assets/img/react-tailwindcss.png";
import idomax from "../../assets/img/idomax-design.png"

const projects = [
  {
    category: "Learning",
    title: "Landing Page 1 Page",
    image: ReactTailwind,
    techs: ["React", "TailwindCSS"],
    gradient: "from-black-900 via-black-900/90 to-black-800/80", //from-สีเริ่มตั้น via-สีกลาง to-สีปลายทาง bg-gradient-to-r from-gray-700 via-gray-900 to-black
    url: "https://react-tailwind-css-phi.vercel.app/",
  },
  {
    category: "Learning",
    title: "Idomax Design",
    image: idomax,
    techs: ["Next.JS", "TailwindCSS"],
    gradient: "from-black-900 via-black-900/90 to-black-800/80", //from-สีเริ่มตั้น via-สีกลาง to-สีปลายทาง bg-gradient-to-r from-gray-700 via-gray-900 to-black
    url: "https://idomax-design.vercel.app/",
  },
];

// pill แสดง tech ด้านล่างการ์ด
function TechPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs md:text-sm font-medium text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur">
      {label}
    </span>
  );
}

// การ์ดโปรเจกต์หลัก
function ProjectCard({ project }) {
  return (
    <article
      className={[
        "relative flex h-full flex-col justify-between overflow-hidden",
        "rounded-[32px] border border-white/10",
        "bg-gradient-to-b", //การใช้ gradient-to- (b ไล่สีจาก บนลงล่าง) (r ซ้ายไปขวา) (l ขวาไปซ้าย) (tr ซ้ายล่างไปขวาบนเป็นต้น)
        project.gradient,
        "shadow-[0_40px_120px_rgba(0,0,0,0.7)]",
        "p-6 sm:p-7 lg:p-8",
      ].join(" ")}
    >
      {/* Layer แสงด้านบนสุดบาง ๆ */}
      <div className="pointer-events-none absolute inset-x-[-40%] top-[-30%] h-1/2 bg-white/10 blur-3xl opacity-50" />
      {/* เส้นขอบด้านในบาง ๆ */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5" />

      {/* ส่วนหัว: หมวด + ชื่อโปรเจกต์ */}
      <header className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-200/80">
          {project.category}
        </p>
        <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white italic drop-shadow-lg">
          {project.title}
        </h3>
      </header>

      {/* รูป mockup กลางการ์ด */}
      <div className="relative z-10 mt-6 flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <div className="rounded-[28px] bg-black/40 p-3 sm:p-4 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
            <img
              src={project.image}
              alt={project.title}
              className="h-auto w-full rounded-[24px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* แสดง tech เป็น pills ด้านล่าง */}
      <footer className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
        {/* tech pills */}
        <div className="flex flex-wrap gap-3">
          {project.techs.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>

        {/* ปุ่มไปเว็บโปรเจกต์ (ถ้ามี url) */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto items-center rounded-full bg-white/90 px-4 py-1.5 text-xs md:text-sm font-semibold text-slate-900 shadow hover:bg-white"
          >
            Open link
          </a>
        )}
      </footer>
    </article>
  );
}

export default function Projects() {
  return (
    <main className="pt-28 pb-16 md:pt-32">
      <section className="container mx-auto px-4">
        {/* หัวเรื่องของ section */}
        <div className="mb-10 flex flex-col items-center text-center text-white">
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Projects & Case Studies
          </h2>
        </div>

        {/* กริดการ์ดโปรเจกต์ */}
        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
