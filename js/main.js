/* ==========================================================
   MAIN SCRIPT — merender konten dari data.js dan
   mengatur interaksi (navbar, filter, modal, viewer, animasi).
   ========================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const escapeHTML = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const pad = (n) => String(n).padStart(2, "0");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ICONS = {
  gh: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  in: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm7 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6v5.4h-4v-4.8c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v4.9h-4v-11Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
};

/* ---------- 1. Render dari data ---------- */
function loadPhoto(img) {
  // Foto profil opsional: kalau gagal dimuat, elemen dihapus dan inisial/latar tampil
  img.addEventListener("error", () => img.remove());
  img.src = PROFILE.photo;
}

function renderHero() {
  $("#heroName").textContent = PROFILE.name;
  $("#heroFaction").textContent = PROFILE.faction;
  $("#heroNim").textContent = PROFILE.nim;
  $("#cardNim").textContent = PROFILE.nim;
  $("#cardCallsign").textContent = PROFILE.callsign;
  $("#cardRole").textContent = PROFILE.role;
  $("#footerName").textContent = PROFILE.name;
  $("#footerGiant").textContent = PROFILE.name;
  $("#year").textContent = new Date().getFullYear();
  $("#cardInitials").textContent = PROFILE.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  loadPhoto($("#cardPhoto"));

  const counters = [
    { value: PROJECTS.length, label: "Commissions" },
    { value: WORKS.length, label: "Game UI Shots" },
    { value: 999, label: "Vibe Level" },
  ];
  $("#heroCounters").innerHTML = counters
    .map((c) => `<li><strong data-count="${c.value}">0</strong><span>${c.label}</span></li>`)
    .join("");
}

function renderProfile() {
  loadPhoto($("#idPhoto"));
  $("#bio").innerHTML = PROFILE.bio.map((p) => `<p>${escapeHTML(p)}</p>`).join("");
  const info = [
    ["NAMA", PROFILE.name],
    ["NIM", PROFILE.nim],
    ["CALLSIGN", PROFILE.callsign],
    ["STATUS", PROFILE.status],
    ["FOKUS", PROFILE.focus],
    ["LOKASI", PROFILE.location],
  ];
  $("#profileInfo").innerHTML = info
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${escapeHTML(v)}</dd></div>`)
    .join("");
  $("#tools").innerHTML = PROFILE.tools
    .map((t, i) => `<li><span>${pad(i + 1)}</span>${escapeHTML(t)}</li>`)
    .join("");
}

function renderSkills() {
  $("#skills").innerHTML = SKILLS.map((s) => `
    <div class="panel stat" data-level="${s.level}">
      <div class="stat__row">
        <span><span class="stat__name">${escapeHTML(s.name)}</span><span class="stat__tag">${s.tag}</span></span>
        <span class="stat__lv"><small>LV</small>${s.level}</span>
      </div>
      <div class="stat__bar" role="progressbar" aria-label="${escapeHTML(s.name)}"
           aria-valuenow="${s.level}" aria-valuemin="0" aria-valuemax="100">${"<i></i>".repeat(20)}</div>
    </div>`).join("");

  const avg = Math.round(SKILLS.reduce((sum, s) => sum + s.level, 0) / SKILLS.length);
  $("#overall").textContent = avg;
  renderRadar();
}

/* Grafik radar SVG dibangun dari array SKILLS */
function renderRadar() {
  const cx = 150, cy = 150, r = 100, n = SKILLS.length;
  const point = (i, scale) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(a) * r * scale, cy + Math.sin(a) * r * scale];
  };
  const poly = (scale) => SKILLS.map((_, i) => point(i, scale).join(",")).join(" ");

  let svg = "";
  [0.25, 0.5, 0.75, 1].forEach((s) => (svg += `<polygon class="radar__grid" points="${poly(s)}"/>`));
  SKILLS.forEach((_, i) => {
    const [x, y] = point(i, 1);
    svg += `<line class="radar__axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
  });
  const shape = SKILLS.map((s, i) => point(i, s.level / 100).join(",")).join(" ");
  svg += `<polygon class="radar__shape" points="${shape}"/>`;
  SKILLS.forEach((s, i) => {
    const [x, y] = point(i, s.level / 100);
    svg += `<circle class="radar__dot" cx="${x}" cy="${y}" r="5"/>`;
    const [lx, ly] = point(i, 1.24);
    svg += `<text class="radar__label" x="${lx}" y="${ly}" text-anchor="middle">${s.short}</text>`;
    svg += `<text class="radar__val" x="${lx}" y="${ly + 14}" text-anchor="middle">${s.level}</text>`;
  });
  $("#radar").innerHTML = svg;
}

function renderLimitBreak() {
  $("#limitBreak").innerHTML = LIMIT_BREAK.map((s) => `
    <article class="lb-card">
      <div class="lb-card__top">
        <div>
          <h3 class="lb-card__name">${escapeHTML(s.name)}</h3>
          <span class="lb-card__tag">${s.tag}</span>
        </div>
        <span class="lb-card__max">MAX</span>
      </div>
      <p class="lb-card__lv"><small>LV</small>${s.level}</p>
      <div class="lb-card__bar" role="img" aria-label="${escapeHTML(s.name)}: level ${s.level}, melewati batas maksimum"></div>
      <p class="lb-card__note">${escapeHTML(s.note)}</p>
    </article>`).join("");
}

function thumbHTML(p) {
  if (p.thumb) return `<img src="${p.thumb}" alt="" loading="lazy">`;
  if (p.thumbStyle === "magic")
    return `<div class="thumb-art thumb-art--magic"><div class="mini-grid">${"<i></i>".repeat(16)}</div></div>`;
  if (p.thumbStyle === "earth")
    return `<div class="thumb-art thumb-art--earth"><div class="planet"></div></div>`;
  return "";
}

function renderProjects() {
  $("#projects").innerHTML = PROJECTS.map((p) => `
    <article class="card reveal" data-id="${p.id}" data-rank="${p.rank}" data-category="${p.category.join(" ")}"
             tabindex="0" role="button" aria-label="Buka detail ${escapeHTML(p.title)}">
      <div class="card__thumb">
        <span class="rank rank--${p.rank} card__rank">${p.rank}</span>
        <span class="chip card__code">${p.code}</span>
        ${p.isNew ? '<span class="card__new">NEW!</span>' : ""}
        ${thumbHTML(p)}
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapeHTML(p.title)}</h3>
        <p class="card__summary">${escapeHTML(p.summary)}</p>
        <div class="card__foot">
          <div class="tags">${p.stack.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
          <span class="card__enter">ENTER ▶</span>
        </div>
      </div>
    </article>`).join("");
  updateProjectCount();
}

function updateProjectCount() {
  const visible = $$(".card:not(.is-hidden)").length;
  $("#projectCount").textContent = `${pad(visible)} / ${pad(PROJECTS.length)} FILES`;
}

function renderTimeline() {
  $("#timeline").innerHTML = TIMELINE.map((t) => `
    <li class="panel timeline__item reveal">
      <div class="timeline__screen">
        <span class="timeline__code">${t.code}</span>
        <span class="timeline__tag">${t.tag}</span>
      </div>
      <div class="timeline__content">
        <h3 class="timeline__title">${escapeHTML(t.title)}</h3>
        <p class="timeline__text">${escapeHTML(t.text)}</p>
      </div>
    </li>`).join("");
}

function renderContacts() {
  $("#contactList").innerHTML = PROFILE.contacts.map((c) => {
    const external = c.href.startsWith("http") ? ' target="_blank" rel="noopener"' : "";
    return `
      <li>
        <a class="contact" href="${c.href}"${external}>
          <span class="contact__icon">${ICONS[c.icon] || ""}</span>
          <span><span class="contact__label">${c.label}</span><span class="contact__value">${escapeHTML(c.value)}</span></span>
        </a>
      </li>`;
  }).join("");
}

/* Pita caution-tape: isi diulang 2x agar animasi marquee mulus */
function renderTickers() {
  $$("[data-ticker]").forEach((track) => {
    const html = track.dataset.ticker.split(",").map((w) => `<span>${escapeHTML(w)}</span>`).join("");
    track.innerHTML = html + html;
  });
}

/* ---------- 2. Game UI archive (viewer + filmstrip) ---------- */
let workIndex = 0;
let workFilter = "all";

const visibleWorks = () => WORKS.filter((w) => workFilter === "all" || w.cat === workFilter);

function renderArchive() {
  $("#gameTitle").textContent = SHOWCASE.title;
  $("#gameSummary").textContent = SHOWCASE.summary;
  const stats = [
    { value: WORKS.length, label: "Assets" },
    { value: Object.keys(WORK_CATEGORIES).length - 1, label: "Kategori" },
    { value: WORKS.filter((w) => w.rarity === "legendary" || w.rarity === "mythic").length, label: "Rare+" },
  ];
  $("#gameStats").innerHTML = stats
    .map((s) => `<li><strong data-count="${s.value}">${s.value}</strong><span>${s.label}</span></li>`)
    .join("");

  $("#workFilters").innerHTML = Object.entries(WORK_CATEGORIES)
    .map(([key, label]) =>
      `<button class="filter${key === "all" ? " is-active" : ""}" data-cat="${key}" aria-pressed="${key === "all"}">${label}</button>`)
    .join("");

  $("#filmstrip").innerHTML = WORKS.map((w) => `
    <button class="film" role="listitem" data-id="${w.id}" data-rarity="${w.rarity}" aria-label="Lihat ${escapeHTML(w.title)}">
      <img src="${w.img}" alt="" loading="lazy">
      <span>${escapeHTML(w.title)}</span>
    </button>`).join("");

  showWork(0, false);
}

function showWork(index, animate = true) {
  const list = visibleWorks();
  if (!list.length) return;
  workIndex = (index + list.length) % list.length;
  const w = list[workIndex];
  const img = $("#viewerImg");
  img.onload = () => img.classList.toggle("is-small", img.naturalWidth < 500);

  const apply = () => {
    img.src = w.img;
    img.alt = `${w.title} — aset UI game`;
    img.classList.remove("is-swapping");
  };
  if (animate && !reduceMotion) {
    img.classList.add("is-swapping");
    setTimeout(apply, 180);
  } else {
    apply();
  }

  $("#viewer").dataset.rarity = w.rarity;
  $("#viewerRarity").textContent = w.rarity;
  $("#viewerIndex").textContent = `${pad(workIndex + 1)} / ${pad(list.length)}`;
  $("#viewerTitle").textContent = w.title;
  $("#viewerCat").textContent = WORK_CATEGORIES[w.cat];

  $$(".film").forEach((f) => {
    const active = f.dataset.id === w.id;
    f.classList.toggle("is-active", active);
    f.setAttribute("aria-current", active);
    if (active && animate) {
      // geser filmstrip secara horizontal saja, tanpa menggulir halaman
      const strip = $("#filmstrip");
      strip.scrollTo({ left: f.offsetLeft - strip.clientWidth / 2 + f.clientWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });
    }
  });
}

function initArchive() {
  $("#viewerPrev").addEventListener("click", () => showWork(workIndex - 1));
  $("#viewerNext").addEventListener("click", () => showWork(workIndex + 1));

  $("#filmstrip").addEventListener("click", (e) => {
    const film = e.target.closest(".film");
    if (!film) return;
    const idx = visibleWorks().findIndex((w) => w.id === film.dataset.id);
    if (idx >= 0) showWork(idx);
  });

  $("#workFilters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    workFilter = btn.dataset.cat;
    $$("#workFilters .filter").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    $$(".film").forEach((f) => {
      const w = WORKS.find((x) => x.id === f.dataset.id);
      f.classList.toggle("is-hidden", workFilter !== "all" && w.cat !== workFilter);
    });
    showWork(0);
  });

  // panah kiri/kanan saat fokus ada di dalam section archive
  $("#archive").addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "ArrowLeft") showWork(workIndex - 1);
    if (e.key === "ArrowRight") showWork(workIndex + 1);
  });

  // lightbox
  const lb = $("#lightbox");
  const openLb = () => {
    const w = visibleWorks()[workIndex];
    $("#lightboxImg").src = w.img;
    $("#lightboxImg").alt = w.title;
    $("#lightboxCap").textContent = w.title;
    lb.hidden = false;
    document.body.classList.add("is-locked");
    $("[data-lb-close]").focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    document.body.classList.remove("is-locked");
    $("#viewerOpen").focus();
  };
  $("#viewerOpen").addEventListener("click", openLb);
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.closest("[data-lb-close]")) closeLb();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lb.hidden) closeLb();
  });
}

/* ---------- 3. Boot screen ---------- */
function initBoot() {
  const boot = $("#boot");
  const bar = $("#bootBar");
  const log = $("#bootLog");
  const lines = ["PROFILE", "STATS", "LABS", "GAME UI"];
  let progress = 0;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(timer);
    bar.style.width = "100%";
    setTimeout(() => {
      boot.classList.add("is-done");
      $$("#heroCounters [data-count]").forEach(animateCounter);
    }, 150);
  };
  const timer = setInterval(() => {
    progress += Math.random() * 18 + 4;
    bar.style.width = Math.min(progress, 100) + "%";
    const shown = Math.min(lines.length, Math.floor(progress / 25) + 1);
    if (log.children.length < shown) log.insertAdjacentHTML("beforeend", `<li>${lines[log.children.length]}</li>`);
    if (progress >= 100) finish();
  }, 120);

  boot.addEventListener("click", finish);
  if (new URLSearchParams(location.search).has("noboot")) {
    boot.style.transition = "none";
    finish();
  }
}

/* ---------- 4. Navbar, rail, progress ---------- */
function initNav() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  $$(".nav__link").forEach((link) => link.addEventListener("click", () => setOpen(false)));

  // tick di rail kanan, satu per section
  const ids = $$(".nav__link").map((l) => l.getAttribute("href").slice(1));
  $("#railTicks").innerHTML = ids.map((id) => `<li><a href="#${id}" tabindex="-1" data-id="${id}"></a></li>`).join("");

  // highlight menu & rail sesuai section yang sedang terlihat
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      $$(".nav__link").forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
      $$("#railTicks a").forEach((a) => a.classList.toggle("is-active", a.dataset.id === id));
      $("#railNum").textContent = pad(ids.indexOf(id) + 1);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ids.forEach((id) => observer.observe(document.getElementById(id)));

  // progress bar scroll
  const bar = $("#progressBar");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 5. Efek ketik & tilt kartu ---------- */
function initTyped() {
  const el = $("#typed");
  const lines = PROFILE.taglines;
  if (reduceMotion) {
    el.textContent = lines[0];
    return;
  }
  let line = 0, char = 0, deleting = false;
  const tick = () => {
    const text = lines[line];
    char += deleting ? -1 : 1;
    el.textContent = text.slice(0, char);
    let delay = deleting ? 35 : 70;
    if (!deleting && char === text.length) { deleting = true; delay = 1600; }
    else if (deleting && char === 0) { deleting = false; line = (line + 1) % lines.length; delay = 300; }
    setTimeout(tick, delay);
  };
  tick();
}

function initTilt() {
  const card = $("#agentCard");
  if (reduceMotion || !matchMedia("(hover: hover)").matches) return;
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}

/* ---------- 6. Animasi saat scroll ---------- */
function animateCounter(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) {
    el.textContent = target;
    return;
  }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1100, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function fillStat(stat) {
  const on = Math.round(Number(stat.dataset.level) / 5);
  $$(".stat__bar i", stat).forEach((seg, i) => {
    if (i < on) setTimeout(() => seg.classList.add("on"), i * 40);
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => observer.observe(el));

  // skill bar, radar, dan angka statistik game dianimasikan saat terlihat
  const once = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.id === "skills") $$(".stat", el).forEach(fillStat);
      if (el.id === "radar") el.classList.add("is-on");
      if (el.id === "gameStats") $$("[data-count]", el).forEach(animateCounter);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });
  ["#skills", "#radar", "#gameStats"].forEach((s) => once.observe($(s)));
}

/* ---------- 7. Filter proyek ---------- */
function initFilters() {
  const buttons = $$("#filters .filter");
  buttons.forEach((btn) => btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    buttons.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-pressed", b === btn);
    });
    $$(".card").forEach((card) => {
      const match = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.classList.toggle("is-hidden", !match);
    });
    updateProjectCount();
  }));
}

/* ---------- 8. Modal detail proyek ---------- */
const modal = $("#modal");
let lastFocus = null;

function buildTabs(p) {
  const tabs = [];
  if (p.path) tabs.push({ id: "live", label: "▶ LIVE PREVIEW" });
  if (p.video) tabs.push({ id: "video", label: "● DEMO VIDEO" });
  if (!p.path && p.thumb) tabs.push({ id: "shot", label: "■ SCREENSHOT" });
  if (p.files.length) tabs.push({ id: "code", label: "</> SOURCE" });
  return tabs;
}

async function showSource(p, file) {
  const pre = $(".code-view pre");
  $$(".code-view__file").forEach((b) => b.classList.toggle("is-active", b.dataset.file === file));
  pre.textContent = "Loading…";
  try {
    const res = await fetch(p.path + file);
    if (!res.ok) throw new Error(res.status);
    pre.textContent = await res.text();
  } catch {
    pre.textContent =
      "// Source tidak bisa dimuat di mode file://\n" +
      "// Jalankan lewat Live Server / GitHub Pages, atau buka langsung:\n// " + p.path + file;
  }
}

function showTab(p, tab) {
  const stage = $("#modalStage");
  $$(".tab").forEach((t) => {
    t.classList.toggle("is-active", t.dataset.tab === tab);
    t.setAttribute("aria-selected", t.dataset.tab === tab);
  });

  if (tab === "live") {
    stage.innerHTML = `<iframe src="${p.path}" title="Live preview ${escapeHTML(p.title)}" loading="lazy"></iframe>`;
  } else if (tab === "video") {
    stage.innerHTML = `<video src="${p.video}" controls autoplay muted playsinline></video>`;
  } else if (tab === "shot") {
    stage.innerHTML = `<img src="${p.thumb}" alt="Screenshot ${escapeHTML(p.title)}">`;
  } else if (tab === "code") {
    stage.innerHTML = `
      <div class="code-view">
        <div class="code-view__files">
          ${p.files.map((f) => `<button class="code-view__file" data-file="${f}">${f}</button>`).join("")}
        </div>
        <pre></pre>
      </div>`;
    $$(".code-view__file", stage).forEach((b) => b.addEventListener("click", () => showSource(p, b.dataset.file)));
    showSource(p, p.files[0]);
  }
}

function openModal(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  lastFocus = document.activeElement;

  $("#modalCode").textContent = `COMMISSION ${p.code} · RANK ${p.rank}`;
  $("#modalTitle").textContent = p.title;

  const tabs = buildTabs(p);
  $("#modalTabs").innerHTML = tabs
    .map((t) => `<button class="tab" role="tab" data-tab="${t.id}">${escapeHTML(t.label)}</button>`)
    .join("");
  $$(".tab").forEach((t) => t.addEventListener("click", () => showTab(p, t.dataset.tab)));

  const actions = [];
  if (p.path) actions.push(`<a class="btn btn--lime btn--sm" href="${p.path}" target="_blank" rel="noopener">Buka Halaman ↗</a>`);
  if (p.repo) actions.push(`<a class="btn btn--ghost btn--sm" href="${p.repo}" target="_blank" rel="noopener">GitHub Repo ↗</a>`);

  $("#modalInfo").innerHTML = `
    <div><h4>// BRIEFING</h4><p>${escapeHTML(p.summary)}</p></div>
    <div><h4>// SKILLS GAINED</h4><ul>${p.learned.map((l) => `<li>${escapeHTML(l)}</li>`).join("")}</ul></div>
    <div><h4>// LOADOUT</h4><div class="tags">${p.stack.map((t) => `<span class="chip">${t}</span>`).join("")}</div></div>
    <div class="modal__actions">${actions.join("")}</div>`;

  modal.hidden = false;
  document.body.classList.add("is-locked");
  if (tabs.length) showTab(p, tabs[0].id);
  $(".modal__close").focus();
}

function closeModal() {
  modal.hidden = true;
  $("#modalStage").innerHTML = ""; // hentikan video / iframe
  document.body.classList.remove("is-locked");
  lastFocus?.focus();
}

function initModal() {
  const projects = $("#projects");
  projects.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModal(card.dataset.id);
  });
  projects.addEventListener("keydown", (e) => {
    const card = e.target.closest(".card");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openModal(card.dataset.id);
    }
  });
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

/* ---------- 9. Form kontak (mailto, tanpa backend) ---------- */
function initContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  const email = PROFILE.contacts.find((c) => c.icon === "mail")?.href.replace("mailto:", "");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const message = form.message.value.trim();
    if (!name || !message) {
      status.textContent = "> ERROR: nama dan pesan wajib diisi.";
      status.classList.add("is-error");
      return;
    }
    status.classList.remove("is-error");
    status.textContent = "> TRANSMISSION READY — membuka aplikasi email…";
    const subject = encodeURIComponent(`[Portfolio] Pesan dari ${name}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`;
    form.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderProfile();
  renderSkills();
  renderLimitBreak();
  renderProjects();
  renderArchive();
  renderTimeline();
  renderContacts();
  renderTickers();

  initBoot();
  initNav();
  initTyped();
  initTilt();
  initReveal();
  initFilters();
  initArchive();
  initModal();
  initContactForm();
});
