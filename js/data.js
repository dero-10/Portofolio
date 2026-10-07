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
  { code: "SP.01", title: "Game UI", text: "Menu, popup, reward, HUD.", tag: "GAME UI" },
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

/* UI game — "UI Archive" (frame dari Figma UI Census) */
const SHOWCASE = {
  title: "Game UI",
  platform: "Roblox",
  summary: "UI dari game Roblox yang saya kerjakan.",
};

const ui = (id, title, cat, rarity) => ({ id, title, cat, rarity, img: `assets/img/game-ui/${id}.webp` });

const WORKS = [
  ui("inventory", "Inventory", "menu", "legendary"),
  ui("reveal-mythic", "Reward — Mythic", "reward", "mythic"),
  ui("reveal-legendary", "Reward — Legendary", "reward", "legendary"),
  ui("reveal-epic", "Reward — Epic", "reward", "epic"),
  ui("ranks", "Ranks", "menu", "legendary"),
  ui("upgrades", "Upgrades", "menu", "epic"),
  ui("index", "Index", "menu", "epic"),
  ui("items", "Items", "menu", "rare"),
  ui("potion", "Brewing", "menu", "rare"),
  ui("reforge", "Reforge", "menu", "rare"),
  ui("market", "Market", "menu", "rare"),
  ui("teleport", "Teleport", "menu", "rare"),
  ui("crate", "Crate Picker", "menu", "common"),
  ui("settings", "Settings", "menu", "common"),
  ui("welcome", "Welcome Back", "popup", "legendary"),
  ui("rank-benefits", "Rank Benefits", "popup", "epic"),
  ui("tutorial-card", "Tutorial", "popup", "rare"),
  ui("tutorial-step", "Tutorial Step", "popup", "common"),
  ui("skill-check", "Skill Check", "hud", "epic"),
  ui("victory", "Victory", "hud", "epic"),
  ui("potion-pouch", "Pouch", "hud", "rare"),
  ui("menu-rail", "Menu Rail", "hud", "common"),
  ui("hp-plate", "HP Plate", "hud", "common"),
  ui("coins", "Wallet", "hud", "common"),
];

const WORK_CATEGORIES = { all: "All", menu: "Menu", popup: "Popup", reward: "Reward", hud: "HUD" };
