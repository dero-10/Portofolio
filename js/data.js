/* ==========================================================
   DATA PORTOFOLIO
   Semua konten website diambil dari file ini.
   - Tugas lab baru → taruh folder di /labs, tambah objek di PROJECTS
   - Aset UI baru   → taruh gambar di /assets/img/game-ui, tambah objek di WORKS
   ========================================================== */

const PROFILE = {
  name: "Darren Keith Kho",
  callsign: "DERO",
  nim: "01082240017",
  role: "Web · Android · Game UI",
  faction: "FRONT-END",
  location: "Indonesia",
  status: "Mahasiswa Informatika",
  focus: "Front-end & Game UI",
  photo: "assets/img/profile.jpg", // kalau file tidak ada, inisial yang tampil
  bio: [
    "Mahasiswa Informatika. Fokus di front-end web dan UI game.",
    "Di sini ada tugas lab kuliah (HTML, CSS, JavaScript, Android) dan aset UI dari game Roblox yang saya kerjakan.",
  ],
  taglines: ["WEB DEV", "GAME UI", "ANDROID"],
  tools: ["VS Code", "Figma", "Roblox Studio", "Android Studio", "Git"],
  contacts: [
    { label: "GitHub", value: "github.com/dero-10", href: "https://github.com/dero-10", icon: "gh" },
    { label: "Email", value: "darren05122017@gmail.com", href: "mailto:darren05122017@gmail.com", icon: "mail" },
  ],
};

/* Statistik skill — bar + radar */
const SKILLS = [
  { name: "HTML", short: "HTML", level: 85, tag: "STRUCTURE" },
  { name: "CSS", short: "CSS", level: 80, tag: "LAYOUT" },
  { name: "JavaScript", short: "JS", level: 65, tag: "LOGIC" },
  { name: "UI Design", short: "UI", level: 80, tag: "FIGMA" },
  { name: "Game UI", short: "GAME", level: 75, tag: "ROBLOX" },
  { name: "Android", short: "MOBILE", level: 50, tag: "COMPOSE" },
];

/* Skill di luar batas — kartu "LIMIT BREAK" LV 999 */
const LIMIT_BREAK = [
  { name: "Claude", level: 999, tag: "AI" },
  { name: "Codex", level: 999, tag: "AI" },
  { name: "Vibe Coder of the Century", level: 999, tag: "TITLE" },
];

/* Riwayat belajar — "Mission Log" */
const TIMELINE = [
  { code: "EP.01", title: "HTML Dasar", text: "Heading, list, tabel, link, video.", tag: "HTML" },
  { code: "EP.04", title: "CSS Grid & Layout", text: "Grid presisi dan layout responsif.", tag: "CSS" },
  { code: "EP.05", title: "JavaScript DOM", text: "Elemen dinamis dan toggle animasi.", tag: "JS" },
  { code: "EP.06", title: "Jetpack Compose", text: "Aplikasi Android pertama.", tag: "MOBILE" },
  { code: "SP.01", title: "Sword Inventory", text: "UI game Roblox, v5 sampai v10.", tag: "GAME UI" },
  { code: "EP.??", title: "Next", text: "Coming soon.", tag: "SOON" },
];

/* Tugas lab — "Commissions" */
const PROJECTS = [
  {
    id: "lab05-magicbox",
    code: "LAB-05",
    title: "Magic Box",
    rank: "S",
    isNew: true,
    category: ["js", "css"],
    stack: ["HTML", "CSS", "JS"],
    summary: "Grid kotak 3D dari JavaScript. Klik Magic!",
    learned: ["createElement + nested loop", "background-position per kotak", "classList.toggle + transition"],
    path: "labs/lab05-magicbox/",
    files: ["index.html", "style.css", "script.js"],
    video: "labs/lab05-magicbox/tugas-lab05-demo.mp4",
    thumb: null,
    thumbStyle: "magic",
  },
  {
    id: "lab04-2-agency",
    code: "LAB-04.2",
    title: "Design Agency",
    rank: "A",
    category: ["css", "html"],
    stack: ["HTML", "CSS"],
    summary: "Landing page responsif dengan media query.",
    learned: ["Layout float dua kolom", "Sticky footer flexbox", "Media query mobile"],
    path: "labs/lab04-2-agency/",
    files: ["index.html", "style.css"],
    video: "labs/lab04-2-agency/tugas-lab04.2-demo.mp4",
    thumb: "labs/lab04-2-agency/assets/images/construction.jpg",
  },
  {
    id: "lab04-1-mondrian",
    code: "LAB-04.1",
    title: "Mondrian",
    rank: "A",
    category: ["css"],
    stack: ["HTML", "CSS Grid"],
    summary: "Lukisan Mondrian murni dari CSS Grid.",
    learned: ["grid-template presisi", "span & grid-area", "gap sebagai garis"],
    path: "labs/lab04-1-mondrian/",
    files: ["index.html"],
    video: null,
    thumb: "labs/lab04-1-mondrian/goal.png",
  },
  {
    id: "lab01-earth-facts",
    code: "LAB-01",
    title: "Earth Facts",
    rank: "B",
    category: ["html"],
    stack: ["HTML"],
    summary: "Halaman HTML pertama.",
    learned: ["Struktur HTML5", "List, tabel, link", "Button & video"],
    path: "labs/lab01-earth-facts/",
    files: ["index.html"],
    video: null,
    thumb: null,
    thumbStyle: "earth",
  },
  {
    id: "android-hellocompose",
    code: "MOB-01",
    title: "HelloCompose",
    rank: "A",
    category: ["android"],
    stack: ["Kotlin", "Compose"],
    summary: "App profil Android, light & dark mode.",
    learned: ["Composable & Modifier", "Preview light / dark", "Git commit & push"],
    path: null, // bukan web — tidak ada live preview
    repo: "https://github.com/dero-10/hellocompose",
    files: [],
    video: null,
    thumb: "assets/img/hellocompose.png",
  },
];

/* UI game — "UI Archive" (Sword Inventory v5 — v10 dari Figma) */
const SHOWCASE = {
  title: "Sword Inventory",
  platform: "Roblox",
  summary: "UI inventory pedang game Roblox, didesain di Figma dari v5 sampai v10.",
};

const ui = (id, title, cat, rarity, dir = "game-ui") => ({ id, title, cat, rarity, img: `assets/img/${dir}/${id}.webp` });

const WORKS = [
  ui("v10-cards", "v10 — Cards", "screen", "mythic"),
  ui("v10-rack", "v10 — Rack", "screen", "mythic"),
  ui("v9-rack", "v9 — Cartridge Rack", "screen", "legendary"),
  ui("v9-compare", "v9 — VS Equipped", "screen", "legendary"),
  ui("v8-icons", "v8 — Icons", "screen", "legendary"),
  ui("v8-cards", "v8 — Cards", "screen", "legendary"),
  ui("v7", "v7 — Armory Ledger", "screen", "rare"),
  ui("v6", "v6 — Hero Stage", "screen", "rare"),
  ui("v5", "v5 — Sword Storage", "screen", "common"),
  ui("v8-parts", "v8 — Parts Board", "asset", "epic"),
  ui("v9-parts", "v9 — Parts Board", "asset", "epic"),
  ui("v8g-kit", "v8G — UI Kit", "asset", "epic"),
  ui("sword-1", "Model 01", "model", "legendary", "models"),
  ui("sword-2", "Model 02", "model", "mythic", "models"),
  ui("sword-5", "Model 03", "model", "epic", "models"),
  ui("sword-4", "Model 04", "model", "legendary", "models"),
  ui("sword-7", "Model 05", "model", "epic", "models"),
  ui("sword-3", "Model 06", "model", "rare", "models"),
  ui("sword-8", "Model 07", "model", "rare", "models"),
  ui("sword-6", "Model 08", "model", "common", "models"),
];

const WORK_CATEGORIES = { all: "All", screen: "Screen", asset: "Asset", model: "Model" };
