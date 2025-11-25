import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiPostman,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiGithub,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import LogoLoop from "../../components/ui/LogoLoop";

export default function LogoLoopSection() {
  const logos = [
    <SiReact title="React" />,
    <SiTailwindcss title="Tailwind CSS" />,
    <SiJavascript title="JavaScript" />,
    <SiNodedotjs title="Nodedotjs" />,
    <SiHtml5 title="HTML" />,
    <SiCss3 title="CSS" />,
    <SiMongodb title="Mongodb" />,
    <SiMysql title="Mysql" />,
    <BiLogoVisualStudio title="Vscode" />,
    <SiPostman title="Postman" />,
    <SiVercel title="Vercel" />,
    <SiGithub title="GitHub" />,
  ];

  return (
    <section className="container mx-auto  ">
      <LogoLoop
        items={logos}
        speed={28} // ความเร็วการวนหนึ่งรอบ
        gap={64} // ระยะห่างโลโก้
        size={70} // ขนาดโลโก้ (px) ถ้าเป็น react-icons จะส่งต่อเป็น size
        direction="left" // 'left' หรือ 'right'
        grayscale // ทำให้จางนิด ๆ แล้วสว่างเมื่อโฮเวอร์
        className="bg-neutral-900/50 "
        itemClassName="text-neutral-200 md:text-2xl"
      />
    </section>
  );
}
