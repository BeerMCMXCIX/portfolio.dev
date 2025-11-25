import { FaDownload } from "react-icons/fa";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPostman,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiGithub,
  SiAdobeillustrator,
  SiCanva,
} from "react-icons/si";
import { motion } from "framer-motion";

import IconCloudCanvas from "../../components/ui/IconCloudCanvas";

function BaseCard({ className = "", children }) {
  // การ์ดพื้นฐาน โทนดาร์ก + เส้นขอบโปร่ง ๆ
  return (
    <div
      className={[
        "relative rounded-2xl border border-white/10 bg-neutral-900/60",
        "p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
        "backdrop-blur-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  // การ์ดเอียง
  return (
    <div
      className={[
        "group [transform:rotate(-3deg)] hover:[transform:rotate(0deg)]",
        "transition-transform duration-300",
        className,
      ].join(" ")}
    >
      <BaseCard className="group-hover:shadow-xl">{children}</BaseCard>
    </div>
  );
}

//ปรับแต่ tech
function TechPill({
  // eslint-disable-next-line no-unused-vars
  icon: Icon,
  label,
  iconClass = "text-sky-400", // ค่าเริ่มต้นเดิม
  bgClass = "bg-white/5",
  textClass = "text-gray-200",
  borderClass = "border-white/10",
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm border hover:-translate-y-1 cursor-pointer duration-300 ${bgClass} ${textClass} ${borderClass}`}
    >
      <Icon className={iconClass} />
      <span>{label}</span>
    </div>
  );
}

export default function ResourceShowcase({
  // ---- ปรับได้ตามโปรเจกต์ของคุณ ----
  resumeUrl = "", // ไฟล์เรซูเม่ ขอไปปรับในส่วน page/Home
  playlistUrl = "", // ลิงก์ Spotify แบบ embed ขอไปปรับในส่วน page/Home
}) {
  // --- ไอคอนสำหรับ IconCloudCanvas (ยกมาจาก TechCloud3D ของคุณ) ---
  const size = 1; // ขนาดจริงจะถูกเรนเดอร์ลงกรอบ iconBox อีกที
  const cloudIcons = [
    <SiReact size={size} color="#61DAFB" />,
    <SiTailwindcss size={size} color="#06B6D4" />,
    <SiJavascript size={size} color="#F7DF1E" />,
    <SiNodedotjs size={size} color="#339933" />,
    <SiHtml5 size={size} color="#E34F26" />,
    <SiCss3 size={size} color="#1572B6" />,
    <SiPostman size={size} color="#FF6C37" />,
    <SiMongodb size={size} color="#47A248" />,
    <SiMysql size={size} color="#4479A1" />,
    <SiVercel size={size} color="#FFFFFF" />,
    <SiGithub size={size} color="#FFFFFF" />,
    <SiAdobeillustrator size={size} color="#FF9A00" />,
    <SiCanva size={size} color="#00C4CC" />,
  ];
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 max-w-[1440px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* กริดหลัก: ซ้ายเป็นการ์ด 2x2 + การ์ดแหล่งเรียนรู้ / ขวาเป็น Spotify */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ซ้าย */}
          <div className="lg:col-span-7 space-y-6">
            {/* แถวบน 2 คอลัมน์: Resume + Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume */}
              <BaseCard>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      Resume
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      A quick summary of my experience, and skills — available
                      for download.
                    </p>
                  </div>

                  <a
                    href={resumeUrl}
                    download
                    className="mt-6 inline-flex items-center gap-2 text-sky-400 hover:text-sky-300"
                  >
                    <FaDownload />
                    <span>(Click to download)</span>
                  </a>
                </div>
              </BaseCard>

              {/* Tech Stack */}
              <BaseCard>
                <h3 className="text-2xl font-semibold text-white">
                  Tech Stack
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  Tools I use to build efficient, modern, and professional
                  websites.
                </p>

                {/* แคปซูล Tech */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <TechPill icon={SiReact} label="React" />
                  <TechPill icon={SiTailwindcss} label="Tailwind CSS" />
                  <TechPill
                    className=""
                    icon={SiJavascript}
                    label="JavaScript"
                    iconClass="text-yellow-400"
                  />
                  <TechPill
                    icon={SiHtml5}
                    label="HTML"
                    iconClass="text-orange-500"
                  />
                  <TechPill
                    icon={SiCss3}
                    label="CSS"
                    iconClass="text-blue-500"
                  />
                </div>
              </BaseCard>
            </div>
            {/* การ์ดแหล่งเรียนรู้ 3 ใบ แบบเอียง */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="https://app.daily.dev" target="_blank">
                <TiltCard>
                  <div className="flex h-40 items-center justify-center text-center">
                    <div>
                      <div className="text-xl font-semibold text-white">
                        daily.dev
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Articles, trends, and tools in one place.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </a>

              <a href="https://www.youtube.com/@BroCodez" target="_blank">
                <TiltCard className="[transform:rotate(2.5deg)] hover:[transform:rotate(0deg)]">
                  <div className="flex h-40 items-center justify-center text-center">
                    <div>
                      <div className="text-xl font-semibold text-white">
                        The beginning of web development
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Clear and practical tutorials.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </a>

              <a href="https://www.youtube.com/@MilerDev" target="_blank">
                <TiltCard>
                  <div className="flex h-40 items-center justify-center text-center">
                    <div>
                      <div className="text-xl font-semibold text-white">
                        Go-To Dev Blogs
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        I learn and stay up-to-date on modern web developer.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </a>
            </div>

            <div className="text-gray-400 text-sm">
              <BaseCard>
                <div className="flex flex-col md:flex-row md:h-43 gap-6 md:gap-10">
                  {/* กล่องไอคอน */}
                  <div className="relative flex-1 flex items-center justify-center">
                    {/* ใส่ wrapper เป็นสี่เหลี่ยมจัตุรัส ขนาดมากสุดไม่เกิน 320px (ปรับได้) */}
                    <div className="w-full max-w-[320px] aspect-square">
                      <IconCloudCanvas
                        icons={cloudIcons}
                        iconBox={40}
                        autoSpin={1}
                        hoverBoost={1}
                        pauseOnHover={false}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  {/* กล่องข้อความ */}
                  <div className="flex-1 mt-4 md:mt-0 flex items-center justify-center text-center md:text-left">
                    <div>
                      <div className="text-xl font-semibold text-white">
                        Continuous development
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        My expertise isn't limited to my primary tech stack. I
                        also have a broad range of experience from academic
                        studies, personal projects, and research, covering C++,
                        PHP, Python, Node.js, graphic design with Canva and
                        Adobe Illustrator, and others.
                      </p>
                    </div>
                  </div>
                </div>
              </BaseCard>
            </div>
          </div>

          {/* ขวา: Spotify + คำอธิบาย */}
          <div className="lg:col-span-5 space-y-4">
            <BaseCard className="p-0 overflow-hidden h-full">
              {/* ใช้ iframe embed จาก Spotify */}
              <iframe
                title="Spotify playlist"
                src={playlistUrl}
                width="100%"
                height="600"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
              />
              <h3 className="text-xl font-semibold text-white my-2">
                Music & Mood
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                From deep focus to feel-good vibes, I create playlists that fuel
                my day — “Working Energy” is one of my favorites.
              </p>
            </BaseCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
