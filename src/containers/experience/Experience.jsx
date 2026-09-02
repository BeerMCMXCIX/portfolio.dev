import { useMemo, useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaLaptopCode,
  FaWarehouse,
  FaClipboardList,
  FaBoxOpen,
} from "react-icons/fa";

// =====================
// ข้อมูล (แก้ไข)
// =====================
const education = [
  {
    period: "2019",
    title: "Vocational Certificate",
    subtitle: "Business Computer",
    org: "BANGKOK TECHNICAL OF BUSINESS ADMINISTRATION VOCATION COLLEGE",
    description:
      "Foundation in business computer systems, graphic design and basic programming concepts.",
    icon: <FaGraduationCap />,
    tone: "blue",
  },
  {
    period: "2024",
    title: "High Vocational Certificate",
    subtitle: "Digital Business Technology",
    org: "BANGKOK TECHNICAL OF BUSINESS ADMINISTRATION VOCATION COLLEGE",
    description:
      "Foundation in business computer systems, video editing, graphic design, coursework in networking, databases, and programming fundamentals.",
    icon: <FaLaptopCode />,
    tone: "indigo",
  },
  {
    period: "2026",
    title: "Bachelor's degree",
    subtitle: "Digital Technology in Business",
    org: "BANGKOK SUVARNABHUMI UNIVERSITY",
    description:
      "Bridging the gap between Business and Tech. Learning core programming, database management, web applications, and basic IoT technology.",
    icon: <FaLaptopCode />,
    tone: "green",
  },
];

const work = [
  {
    period: "2022-2024",
    title: "Service staff",
    subtitle: "Customer Service",
    org: "CP ALL PUBLIC COMPANY LIMITED",
    description:
      "Customer service, cashier operations, coffee preparation, product document verification, stock checking and ordering, shift closing with cash reconciliation and handover to next shift.",
    icon: <FaBoxOpen />,
    tone: "blue",
  },
  {
    period: "2024",
    title: "Store Assistant",
    subtitle: "Warehouse & Stock Control",
    org: "ROYAL THAI HERB COMPANY LIMITED",
    description:
      "Data entry, document filing and stock organization, inventory counting, quality checking upon receiving, and accurate product labeling.",
    icon: <FaClipboardList />,
    tone: "indigo",
  },
  {
    period: "2024-2025",
    title: "Data entry",
    subtitle: "Business Data Management",
    org: "RAT PREMIUM TRANSPORT LIMITED PARTNERSHIP",
    description:
      "Data entry, expense categorization, invoicing, document filing, income-expense summary, AppSheet for car repair reports, generating PDF receipts and sending automated emails (JavaScript).",
    icon: <FaWarehouse />,
    tone: "blue",
  },
  {
    period: "2025 - 2026",
    title: "IT Outsource",
    subtitle: "Retail Information Systems (RIS)",
    org: "Maxnetic Core Co., Ltd. (Central Group Warehouse, Bang Phli)",
    description:
      "Providing comprehensive IT support for the Retail Information Systems team. Responsible for troubleshooting hardware and software issues, maintaining system operations, and ensuring smooth IT workflows within the warehouse environment.",
    icon: <FaLaptopCode />,
    tone: "indigo",
  },
  {
    period: "2026 - Present",
    title: "IT Support",
    subtitle: "Technical Support & System Operations",
    org: "THAI PARCELS PUBLIC COMPANY LIMITED",
    description:
      "Providing technical support for computer hardware and software installations. Managing and monitoring backend data transmission systems to ensure seamless, secure, and efficient information flow across organizational platforms.",
    icon: <FaLaptopCode />,
    tone: "green",
  },
];

const toneMap = {
  blue: {
    bg: "bg-blue-600/90",
    ring: "ring-blue-400/40",
  },
  indigo: {
    bg: "bg-indigo-600/90",
    ring: "ring-indigo-400/40",
  },
  green: {
    bg: "bg-green-600/90",
    ring: "ring-green-400/40",
  },
};

function Badge({ children, tone = "blue" }) {
  const t = toneMap[tone] ?? toneMap.blue;
  return (
    <span
      className={`${t.bg} text-white text-xs font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full`}
    >
      <FaCalendarAlt className="opacity-90" />
      {children}
    </span>
  );
}

function TimelineDot({ icon, tone = "blue" }) {
  const t = toneMap[tone] ?? toneMap.blue;
  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${t.bg} shadow-lg ring-8 ${t.ring} z-10 relative`}
    >
      <span className="text-white text-lg">{icon}</span>
    </div>
  );
}

function TimelineCard({ item, index, isLast }) {
  // สลับซ้าย-ขวา (บนจอ lg ขึ้นไป)
  const isLeft = index % 2 === 0;
  return (
    // 1. นำ items-center ออก เพื่อให้ Grid ยืดความสูงเท่ากัน และใส่ pb-12 เป็นระยะห่างแทน
    <div className="grid grid-cols-9 gap-6 relative pb-12 lg:pb-16">
      {/* ฝั่งซ้าย (การ์ด) */}
      <div
        className={`col-span-9 lg:col-span-4 ${isLeft ? "lg:order-1" : "lg:order-3"
          }`}
      >
        <div className="bg-white/5 backdrop-blur rounded-2xl p-5 shadow-xl border border-white/10">
          <div className="mb-3">
            <Badge tone={item.tone}>{item.period}</Badge>
          </div>
          <h3 className="text-white font-semibold text-lg">{item.title}</h3>
          <p className="text-sky-300 text-sm mt-1">{item.subtitle}</p>
          <p className="text-gray-300 text-sm mt-1">{item.org}</p>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* จุด + แกนกลาง */}
      <div className="col-span-9 lg:col-span-1 lg:order-2">
        <div className="relative flex flex-col items-center h-full w-full">
          {/* จุดไอคอน */}
          <TimelineDot icon={item.icon} tone={item.tone} />

          {/* 3. ลากเส้นตั้งแต่ใต้ไอคอน (top-12) ไปจนสุดขอบล่างของแถว (bottom-0) */}
          {!isLast && (
            <div className="hidden lg:block absolute top-12 bottom-[-120px] w-1 bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent rounded-full" />
          )}
        </div>
      </div>

      {/* ฝั่งขวา (เว้นที่ให้สลับ) */}
      <div
        className={`hidden lg:block lg:col-span-4 ${isLeft ? "lg:order-3" : "lg:order-1"
          }`}
      />
    </div>
  );
}

export default function ExperienceSection() {
  const [tab, setTab] = useState("education"); // 'education' | 'work'
  const data = useMemo(() => (tab === "education" ? education : work), [tab]);

  return (
    <section
      aria-labelledby="experience-heading"
      className="container mx-auto text-white px-4 py-4"
    >
      {/* หัวข้อ + แท็บ */}
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-3 text-gray-300">
          <span className="text-xl font-bold">Timeline</span>
          <span className="text-gray-500">—</span>
          <span className="text-gray-400">Noppol.dev</span>
        </div>

        <div
          role="tablist"
          aria-label="Experience tabs"
          className="bg-white/5 border border-white/10 rounded-full p-1 flex items-center gap-1"
        >
          <button
            role="tab"
            aria-selected={tab === "education"}
            onClick={() => setTab("education")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${tab === "education"
                ? "bg-white text-black shadow"
                : "text-white hover:bg-white/10"
              }`}
          >
            <span className="inline-flex items-center gap-2">
              <FaGraduationCap /> Education
            </span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "work"}
            onClick={() => setTab("work")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${tab === "work"
                ? "bg-white text-black shadow"
                : "text-white hover:bg-white/10"
              }`}
          >
            <span className="inline-flex items-center gap-2">
              <FaBriefcase /> Work Experience
            </span>
          </button>
        </div>
      </div>

      {/* เส้นกลางหน้าบนมือถือ */}
      <div className="relative mt-10 lg:hidden">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-transparent" />
      </div>

      {/* ไทม์ไลน์ */}
      <div className="mt-10 mx-auto md:mx-30">
        {data.map((item, i, arr) => (
          <TimelineCard
            key={`${tab}-${i}`}
            item={item}
            index={i}
            isLast={i === arr.length - 1} //ตัดเส้นสุดท้ายออก
          />
        ))}
      </div>
    </section>
  );
}