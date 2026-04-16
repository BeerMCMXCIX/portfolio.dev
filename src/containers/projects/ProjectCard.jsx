import ReactTailwind from "../../assets/img/react-tailwindcss.png";
import idomax from "../../assets/img/idomax-design.png"
import brewerydev from "../../assets/img/brewerydev-web.png"

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
  {
    category: "My website",
    title: "brewerydev",
    image: brewerydev,
    techs: ["React", "TailwindCSS","Express","MongoDB"],
    gradient: "from-black-900 via-black-900/90 to-black-800/80", //from-สีเริ่มตั้น via-สีกลาง to-สีปลายทาง bg-gradient-to-r from-gray-700 via-gray-900 to-black
    url: "https://brewerydev.vercel.app/",
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
        "relative flex h-full flex-col overflow-hidden",
        "rounded-[32px] border border-white/10",
        "bg-gradient-to-b", 
        project.gradient,
        "shadow-[0_40px_120px_rgba(0,0,0,0.7)]",
        "p-6 sm:p-7 lg:p-8",
      ].join(" ")}
    >
      {/* Layer แสงด้านบนสุดบาง ๆ */}
      <div className="pointer-events-none absolute inset-x-[-40%] top-[-30%] h-1/2 bg-white/10 blur-3xl opacity-50" />
      {/* เส้นขอบด้านในบาง ๆ */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5" />

      {/* 1. ส่วนหัว: หมวด + ชื่อโปรเจกต์ */}
      <header className="relative z-10 shrink-0">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-200/80">
          {project.category}
        </p>
        <h3 className="mt-2 min-h-[4rem] text-2xl sm:text-3xl font-extrabold tracking-tight text-white italic drop-shadow-lg">
          {project.title}
        </h3>
      </header>

      {/* 2. รูป mockup กลางการ์ด */}
      <div className="relative z-10 my-6 flex flex-1 items-center justify-center">
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

      {/* 3. แสดง tech เป็น pills ด้านล่าง */}
      {/* เปลี่ยนจาก flex-wrap เป็น flex แถวเดียว พร้อมตรึงปุ่มไว้ด้านล่าง (items-end) */}
      <footer className="relative z-10 mt-auto flex items-end justify-between gap-4">
        
        {/* Container สำหรับ Tech Pills: 
            - flex-1: กินพื้นที่ฝั่งซ้ายผลักปุ่มไปขวา 
            - min-h-[3.5rem]: จองความสูงเผื่อไว้ 2 บรรทัดเสมอ การ์ดจะได้สูงเท่ากัน 
            - content-start: ถ้ามีแค่บรรทัดเดียว ให้ชิดขอบบนของพื้นที่ที่จองไว้ */}
        <div className="flex flex-1 flex-wrap content-start gap-2 min-h-[3.5rem]">
          {project.techs.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>

        {/* ปุ่มไปเว็บโปรเจกต์ */}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            // ใส่ shrink-0 ป้องกันไม่ให้ปุ่มโดนบีบจนเสียทรง
            className="shrink-0 mb-1 rounded-full bg-white/90 px-4 py-1.5 text-xs md:text-sm font-semibold text-slate-900 shadow hover:bg-white"
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
