/* ============================================================
   Portfolio data — Nguyễn Vũ Bách
   Bilingual (en / vi). Edit here; the UI reads from this file.
   ============================================================ */

window.PORTFOLIO = {
  profile: {
    name: "Nguyễn Vũ Bách",
    handle: "bachkane79 · DrownKid",
    role: {
      en: "Fullstack & ML/DL Engineer",
      vi: "Kỹ sư Fullstack & ML/DL",
    },
    tagline: {
      en: "I build AI products end-to-end — and I like optimizing models, not just training them.",
      vi: "Mình xây sản phẩm AI end-to-end — và thích tối ưu mô hình, không chỉ train chúng.",
    },
    location: { en: "Ho Chi Minh City, Vietnam", vi: "TP. Hồ Chí Minh, Việt Nam" },
    email: "bachkane79@gmail.com",
    phone: "+84 857 724 726",
    github: "https://github.com/bachkane79",
    githubLabel: "github.com/bachkane79",
  },

  /* Order = scroll order in the gallery */
  projects: [
    {
      id: "vierochat",
      name: "VieroChat",
      accent: "#2563ff",
      year: "2026",
      url: "https://vieroc.com",
      urlLabel: "vieroc.com",
      category: { en: "AI Agent Ecosystem", vi: "Hệ sinh thái AI Agent" },
      desc: {
        en: "The core of the Vieroc AI ecosystem — specialized agents that chat, call, translate and act like top virtual employees. Fullstack web plus a fine-tuned model backend.",
        vi: "Trung tâm của hệ sinh thái Vieroc AI — các agent chuyên biệt biết chat, gọi, dịch và làm việc như nhân viên ảo. Web fullstack cùng backend model đã fine-tune.",
      },
      stack: ["Next.js", "PostgreSQL", "Tailwind", "Better Auth", "Python", "FastAPI", "Redis"],
      images: ["assets/img/vierochat.png", "assets/img/vierochat-2.png"],
    },
    {
      id: "vierocolab",
      name: "Viero AI Worker",
      accent: "#ff5a1f",
      year: "2026",
      url: "https://colab.vieroc.com",
      urlLabel: "colab.vieroc.com",
      category: { en: "Workflow Automation", vi: "Tự động hoá quy trình" },
      desc: {
        en: "Build, manage and scale intelligent workflows that cut up to 90% of manual work. Web frontend with a Rust + LLM automation engine and MCP tooling.",
        vi: "Xây dựng, quản lý và mở rộng các workflow thông minh, cắt tới 90% việc thủ công. Frontend web với engine tự động hoá Rust + LLM và công cụ MCP.",
      },
      stack: ["Next.js", "PostgreSQL", "Tailwind", "Rust", "LLM Fine-tuning", "MCP", "SQLite"],
      images: ["assets/img/vierocolab.png", "assets/img/vierocolab-2.png"],
    },
    {
      id: "vierocrm",
      name: "VieroCRM",
      accent: "#1e3a8a",
      year: "2026",
      url: "https://crm.vieroc.com",
      urlLabel: "crm.vieroc.com",
      category: { en: "AI CRM", vi: "CRM tích hợp AI" },
      desc: {
        en: "A CRM with AI messaging automations baked into the workflow — manage conversations, leads and follow-ups without leaving the pipeline.",
        vi: "CRM với tự động hoá nhắn tin AI ngay trong quy trình — quản lý hội thoại, lead và follow-up mà không rời khỏi pipeline.",
      },
      stack: ["Next.js", "PostgreSQL", "Tailwind", "AI workflow"],
      images: ["assets/img/vierocrm.png"],
    },
    {
      id: "vieroclick",
      name: "VieroClick",
      accent: "#ef7b56",
      year: "2026",
      url: "https://click.vieroc.com",
      urlLabel: "click.vieroc.com",
      category: { en: "AI Project Manager", vi: "Quản lý dự án AI" },
      desc: {
        en: "An AI virtual project manager. Fullstack web with a Python + Cron automation layer that keeps projects moving on their own.",
        vi: "Một project manager ảo chạy bằng AI. Web fullstack với lớp tự động hoá Python + Cron giúp dự án tự vận hành.",
      },
      stack: ["Next.js", "PostgreSQL", "Tailwind", "Python", "Cron"],
      images: ["assets/img/vieroclick.png"],
    },
    {
      id: "mymira",
      name: "MyMira",
      accent: "#ff4d97",
      year: "2026",
      url: "https://mimimira.netlify.app",
      urlLabel: "mimimira.netlify.app",
      category: { en: "Personal OS · AI Companion", vi: "Personal OS · Trợ lý AI" },
      desc: {
        en: "A personal OS guided by an AI companion — tasks, habits, health, knowledge and goals in one place, with a proactive agent that nudges at the right time.",
        vi: "Một personal OS được dẫn dắt bởi trợ lý AI — công việc, thói quen, sức khoẻ, tri thức và mục tiêu trong một chỗ, với agent chủ động nhắc đúng lúc.",
      },
      stack: ["Next.js", "PostgreSQL", "Tailwind", "Better Auth"],
      images: ["assets/img/mymira.png", "assets/img/mymira-2.png"],
    },
    {
      id: "tuvihihi",
      name: "Tuvihihi",
      accent: "#c026d3",
      year: "2026",
      url: "https://tuvihihi.netlify.app",
      urlLabel: "tuvihihi.netlify.app",
      category: { en: "Astrology · AI Reading", vi: "Tử vi · Luận giải AI" },
      desc: {
        en: "East meets West in one birth profile — Tử Vi charts, a natal star map and a source-cited AI reading, accurate to the minute of birth.",
        vi: "Đông gặp Tây trong một hồ sơ sinh — lá số Tử Vi, bản đồ sao natal và luận giải AI có trích dẫn nguồn, chính xác tới từng phút sinh.",
      },
      stack: ["Next.js", "PostgreSQL", "Tailwind", "AI reading"],
      images: ["assets/img/tuvihihi.png", "assets/img/tuvihihi-app.png"],
    },
    {
      id: "alphasign",
      name: "AlphaSign",
      accent: "#22c55e",
      year: "2026",
      url: "https://github.com/Dankguy17/AlphaSign",
      urlLabel: "github.com/Dankguy17/AlphaSign",
      category: { en: "Web App · Open Source", vi: "Web App · Mã nguồn mở" },
      desc: {
        en: "A web application built with a modern component stack and custom agent tooling.",
        vi: "Ứng dụng web xây bằng bộ component hiện đại và công cụ agent tuỳ biến.",
      },
      stack: ["Tailwind", "ShadCN UI", "BandAgent"],
      images: [],
      placeholder: "gh",
    },
    {
      id: "bioturing",
      name: "DL for Modern Biology",
      accent: "#14b8a6",
      year: "2024",
      url: "",
      urlLabel: "BioTuring × HCMUT",
      category: { en: "Research", vi: "Nghiên cứu" },
      desc: {
        en: "Researcher in the Deep Learning for Modern Biology program — variational deep learning applied to biology, in Python & C++ with LaTeX write-ups.",
        vi: "Nghiên cứu viên chương trình Deep Learning for Modern Biology — variational deep learning ứng dụng vào sinh học, dùng Python & C++ và viết báo cáo LaTeX.",
      },
      stack: ["Python", "C++", "Variational DL", "LaTeX"],
      images: [],
      placeholder: "research",
    },
  ],

  awards: [
    { year: "2025", en: "Top 10 — National Startup Program (Khởi nghiệp Quốc gia)", vi: "Top 10 — Chương trình Khởi nghiệp Quốc gia" },
    { year: "2025", en: "Runner-up — Chung Challenge (Korean OCR Deep Learning)", vi: "Á quân — Chung Challenge (OCR tiếng Hàn, Deep Learning)" },
    { year: "2024", en: "Outstanding Award — SCUDEM IX", vi: "Giải Xuất sắc — SCUDEM IX" },
    { year: "2023 · 2024", en: "Double Third Prize — Provincial Mathematics Competition", vi: "Hai lần giải Ba — Toán cấp Tỉnh" },
    { year: "2023 · 2024", en: "Double First Prize — Provincial Internet Olympiad of English (IOE)", vi: "Hai lần giải Nhất — Olympic Tiếng Anh trên Internet (IOE) cấp Tỉnh" },
    { year: "2024", en: "Fourth Prize — Provincial Science & Engineering Fair (App Programming)", vi: "Giải Tư — Khoa học Kỹ thuật cấp Tỉnh (Lập trình ứng dụng)" },
    { year: "2023", en: "Silver Medal — 10/3 Traditional Olympiad (Mathematics)", vi: "Huy chương Bạc — Olympic Truyền thống 10/3 (Toán)" },
  ],

  skills: [
    { en: "Machine Learning & Deep Learning — 3 yrs", vi: "Machine Learning & Deep Learning — 3 năm" },
    { en: "Web Fullstack — 1 yr (Next.js, PostgreSQL, Tailwind, ShadCN)", vi: "Web Fullstack — 1 năm (Next.js, PostgreSQL, Tailwind, ShadCN)" },
    { en: "C++ — reimplemented GPT-2 from scratch", vi: "C++ — từng viết lại toàn bộ GPT-2" },
    { en: "Mathematics — portfolio optimization research, PiMA mentee", vi: "Toán học — nghiên cứu tối ưu danh mục, mentee PiMA" },
    { en: "LaTeX — academic papers & presentations", vi: "LaTeX — bài báo & trình bày học thuật" },
    { en: "Mentoring & communication", vi: "Dẫn dắt & giao tiếp" },
  ],

  education: [
    { en: "Ho Chi Minh City University of Technology — Computer Science", vi: "ĐH Bách Khoa TP.HCM — Khoa học Máy tính", period: "2024 — Now" },
    { en: "Phan Dinh Phung Highschool — Ranked 1st Graduate", vi: "THPT Phan Đình Phùng — Thủ khoa tốt nghiệp", period: "2022 — 2024" },
  ],

  about: {
    en: [
      "I'm a Computer Science student at HCMUT who works across ML/DL and web fullstack at the same time.",
      "Three years in machine learning taught me to love optimizing a model's structure, not just training it — I once reimplemented the whole of GPT-2 in C++.",
      "On the web side, I started in early 2025, then spent eight months (7–9 hours a day) building the Vieroc AI agent ecosystem across Next.js, PostgreSQL, Tailwind and ShadCN.",
      "Alongside that: mathematics research, LaTeX, mentoring high-school researchers, and being a very extroverted person who likes talking about all of it.",
    ],
    vi: [
      "Mình là sinh viên Khoa học Máy tính tại ĐH Bách Khoa TP.HCM, làm song song cả ML/DL lẫn web fullstack.",
      "Ba năm với machine learning dạy mình yêu việc tối ưu cấu trúc mô hình, chứ không chỉ train — từng viết lại toàn bộ GPT-2 bằng C++.",
      "Về web, mình bắt đầu đầu năm 2025, rồi dành tám tháng (7–9 giờ mỗi ngày) xây hệ sinh thái Vieroc AI với Next.js, PostgreSQL, Tailwind và ShadCN.",
      "Song song đó: nghiên cứu toán, LaTeX, mentor cho các bạn nghiên cứu cấp 3, và là một người khá hướng ngoại thích kể về tất cả những điều này.",
    ],
  },

  ui: {
    view_spiral: { en: "spiral", vi: "xoắn ốc" },
    view_list: { en: "list", vi: "danh sách" },
    menu: { en: "menu", vi: "menu" },
    close: { en: "close", vi: "đóng" },
    works: { en: "works", vi: "dự án" },
    about: { en: "about", vi: "giới thiệu" },
    awards: { en: "awards", vi: "thành tích" },
    skills: { en: "skills", vi: "kỹ năng" },
    education: { en: "education", vi: "học vấn" },
    contact: { en: "contact", vi: "liên hệ" },
    visit: { en: "visit site", vi: "xem trang" },
    scroll: { en: "scroll to explore", vi: "cuộn để khám phá" },
    selected_works: { en: "selected works", vi: "dự án tiêu biểu" },
  },
};
