/* ============================================================
   Portfolio engine — spiral + list, Lenis-driven virtual scroll
   ============================================================ */
(() => {
  const D = window.PORTFOLIO;
  const P = D.projects;
  const N = P.length;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const state = { lang: "en", view: "spiral", pos: 0, active: -1, sound: false };

  /* ---------- text helper ---------- */
  const t = (o) => (o && (o[state.lang] ?? o.en)) || "";

  /* ============================================================
     BUILD DOM
     ============================================================ */
  const listTrack = $("#list-track");
  const spiralInner = $("#spiral-inner");
  const cards = [];
  const items = [];

  P.forEach((p, i) => {
    // list item
    const li = document.createElement("div");
    li.className = "list-item";
    li.innerHTML = `<span class="idx">${String(i + 1).padStart(2, "0")}</span>${p.name}`;
    listTrack.appendChild(li);
    items.push(li);

    // spiral card
    const c = document.createElement("div");
    c.className = "spiral-card";
    c.style.setProperty("--accent", p.accent);
    if (p.images && p.images.length) {
      c.innerHTML = `<img src="${p.images[0]}" alt="${p.name}" loading="eager">`;
    } else {
      c.innerHTML = `<div class="ph"><span>${p.name}</span></div>`;
    }
    spiralInner.appendChild(c);
    cards.push(c);
  });

  /* preview element content per project */
  const preview = $("#preview");
  function setPreview(i) {
    const p = P[i];
    if (p.images && p.images.length) {
      preview.innerHTML = `<img src="${p.images[0]}" alt="${p.name}">`;
    } else {
      preview.innerHTML = `<div class="ph"><span>${t(p.category)}</span></div>`;
    }
  }

  /* ---------- passage: hover detail panel (desc + techstack) ---------- */
  const passage = document.createElement("div");
  passage.id = "passage";
  $("#stage").appendChild(passage);
  function populatePassage(i) {
    const p = P[i];
    passage.innerHTML =
      `<div class="pg-head"><span class="pg-cat">${t(p.category)}</span>` +
      `<span class="pg-nm">${p.name}</span></div>` +
      `<p class="pg-desc">${t(p.desc)}</p>` +
      `<div class="pg-stack">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>`;
  }
  let pfx = 0, pfy = 0, pw = 320, ph = 300, shownIdx = -1;   // follow pos + size + which project is shown
  function passageTargetX(w) { return (cx + 26 + w > innerWidth - 16) ? cx - w - 26 : cx + 26; }
  function showPassage(i) {
    populatePassage(i);
    passage.classList.add("show");
    pw = passage.offsetWidth; ph = passage.offsetHeight;
    pfx = passageTargetX(pw);
    pfy = clamp(cy - ph / 2, 16, innerHeight - ph - 16);
    passage.style.left = pfx + "px"; passage.style.top = pfy + "px";
  }
  function hidePassage() { passage.classList.remove("show"); shownIdx = -1; }
  // hover detection is done per-frame by rect hit-testing (see frame loop) — robust across
  // the whole thumbnail and the 3D-transformed spiral card, unlike mouseenter/leave.
  const inRect = (r) => r && cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;

  /* ---------- marquee circular text ---------- */
  $("#marquee").innerHTML = `
    <svg viewBox="0 0 100 100">
      <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
      <text><textPath href="#circ" startOffset="0">PORTFOLIO • 2026 • SELECTED WORKS • NGUYỄN VŨ BÁCH • </textPath></text>
    </svg>
    <div class="thumb"></div>`;

  /* ============================================================
     LABEL (current project)
     ============================================================ */
  const label = $("#label");
  function renderLabel(i) {
    const p = P[i];
    const visit = p.url
      ? `<a class="visit" data-hover href="${p.url}" target="_blank" rel="noopener">
           <span class="vtxt">${p.urlLabel}</span><span class="varr">↗</span></a>`
      : "";
    label.innerHTML = `
      <div class="cat">${t(p.category)}</div>
      <div class="nm">${p.name}</div>
      <div class="meta"><span>${p.year}</span><span>·</span><span>${p.urlLabel}</span></div>
      ${visit}`;
  }

  /* ============================================================
     ACTIVE PROJECT CHANGE
     ============================================================ */
  function setActive(i) {
    if (i === state.active) return;
    state.active = i;
    const p = P[i];
    document.documentElement.style.setProperty("--accent", p.accent);
    setPreview(i);
    renderLabel(i);
    if (passage.classList.contains("show") && state.view === "list") populatePassage(i);
    tick();
  }

  /* ============================================================
     RENDER LOOP TARGETS
     ============================================================ */
  let itemH = 80, pvRect = null;
  function measure() {
    itemH = items[0] ? items[0].offsetHeight : 80;
    listTrack.style.position = "absolute";
    listTrack.style.left = "50%";
    listTrack.style.top = "0";
    pvRect = preview.getBoundingClientRect();
  }

  function renderList(pos) {
    const cy = window.innerHeight / 2;
    const Ty = cy - (pos * itemH + itemH / 2);
    listTrack.style.transform = `translateX(-50%) translateY(${Ty}px)`;
    items.forEach((li, i) => {
      const d = i - pos, ad = Math.abs(d);
      const sc = 1 - Math.min(ad * 0.05, 0.28);
      li.style.transform = `scale(${sc})`;
      li.style.opacity = clamp(1 - ad * 0.26, 0.07, 1);
      li.style.filter = ad > 1.2 ? `blur(${Math.min((ad - 1.2) * 1.1, 3)}px)` : "none";
      li.classList.toggle("active", ad < 0.5);
    });
  }

  function renderSpiral(pos) {
    const R = Math.min(innerWidth, innerHeight) * 0.34;
    const drift = innerHeight * 0.052;
    const ASTEP = 0.62;
    cards.forEach((c, i) => {
      const d = i - pos, ad = Math.abs(d);
      const a = d * ASTEP;
      const x = Math.sin(a) * R;
      const z = Math.cos(a) * R - R;
      const y = d * drift;
      const sc = clamp(1 - ad * 0.11, 0.5, 1);
      const op = clamp(1.08 - ad * 0.24, 0, 1);
      c.style.transform =
        `translate3d(${x}px,${y}px,${z}px) rotateY(${-a * 57.3}deg) rotateZ(${d * 3.5}deg) scale(${sc})`;
      c.style.opacity = op;
      c.style.zIndex = Math.round(1000 - ad * 12);
    });
  }

  /* ============================================================
     LENIS SCROLL
     ============================================================ */
  const spacer = $("#spacer");
  function sizeSpacer() {
    spacer.style.height = Math.round(window.innerHeight * (N * 0.82 + 1)) + "px";
  }
  sizeSpacer();

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });

  let smoothPos = 0;
  function frame(time) {
    lenis.raf(time);
    const limit = lenis.limit || (document.body.scrollHeight - innerHeight) || 1;
    const progress = clamp(lenis.scroll / limit, 0, 1);
    const target = progress * (N - 1);
    smoothPos = lerp(smoothPos, target, 0.12);
    state.pos = smoothPos;

    if (state.view === "list") renderList(smoothPos);
    else renderSpiral(smoothPos);

    setActive(clamp(Math.round(smoothPos), 0, N - 1));

    // preview show only in list mode & near an item
    const near = Math.abs(smoothPos - Math.round(smoothPos)) < 0.42;
    preview.classList.toggle("show", state.view === "list" && near);

    // rail
    railFill.style.height = (progress * 100) + "%";

    // grid / glow parallax
    grid.style.transform = `translate(${mx * -14}px,${my * -14 - progress * 40}px)`;
    glow.style.transform = `translate(calc(-50% + ${mx * 40}px),calc(-50% + ${my * 40}px))`;

    // cursor
    ringX = lerp(ringX, cx, 0.18); ringY = lerp(ringY, cy, 0.18);
    ring.style.transform = `translate(${ringX}px,${ringY}px)`;
    dot.style.transform = `translate(${cx}px,${cy}px)`;

    // ---- hover detection over the whole thumbnail (rect hit-test, not enter/leave) ----
    let hoverIdx = -1;
    if (state.view === "list") {
      if (preview.classList.contains("show") && inRect(pvRect)) hoverIdx = state.active;
    } else {
      const c = cards[state.active];
      if (c && inRect(c.getBoundingClientRect())) hoverIdx = state.active;
    }
    if (hoverIdx >= 0) {
      if (hoverIdx !== shownIdx) { showPassage(hoverIdx); shownIdx = hoverIdx; }
    } else if (shownIdx !== -1) {
      hidePassage();
    }

    // passage follows the cursor (to the side, vertically centered)
    if (shownIdx >= 0) {
      const tx = passageTargetX(pw);
      const ty = clamp(cy - ph / 2, 16, innerHeight - ph - 16);
      pfx = lerp(pfx, tx, 0.32); pfy = lerp(pfy, ty, 0.32);
      passage.style.left = pfx + "px"; passage.style.top = pfy + "px";
    }

    requestAnimationFrame(frame);
  }

  /* ============================================================
     VIEW TOGGLE
     ============================================================ */
  const listEl = $("#list"), spiralEl = $("#spiral");
  function setView(v) {
    if (v === state.view) return;
    state.view = v;
    hidePassage();
    $$("#viewtoggle button").forEach((b) => b.classList.toggle("active", b.dataset.view === v));
    label.classList.toggle("spiralmode", v === "spiral");
    label.classList.toggle("listmode", v === "list");
    if (v === "spiral") {
      gsap.to(listEl, { opacity: 0, duration: .5, ease: "power2.out" });
      gsap.set(spiralEl, { pointerEvents: "auto" });
      gsap.fromTo(spiralEl, { opacity: 0 }, { opacity: 1, duration: .7, ease: "power2.out" });
      preview.classList.remove("show");
    } else {
      gsap.to(spiralEl, { opacity: 0, duration: .5, ease: "power2.out", onComplete: () => gsap.set(spiralEl, { pointerEvents: "none" }) });
      gsap.fromTo(listEl, { opacity: 0 }, { opacity: 1, duration: .7, ease: "power2.out" });
    }
    tick(680);
  }

  /* ============================================================
     CURSOR
     ============================================================ */
  const cursor = $("#cursor"), dot = $(".dot", cursor), ring = $(".ring", cursor);
  let cx = -1000, cy = -1000, ringX = cx, ringY = cy, mx = 0, my = 0;
  window.addEventListener("mousemove", (e) => {
    cx = e.clientX; cy = e.clientY;
    mx = (e.clientX / innerWidth - 0.5) * 2;
    my = (e.clientY / innerHeight - 0.5) * 2;
  });
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a,button,[data-hover]")) { document.body.classList.add("hovering"); tick(1400, .02); }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a,button,[data-hover]")) document.body.classList.remove("hovering");
  });

  const railFill = $("#rail .fill");
  const grid = $("#grid"), glow = $("#glow");

  /* ============================================================
     MENU
     ============================================================ */
  const menu = $("#menu");
  menu.setAttribute("data-lenis-prevent", "");   // let the overlay scroll natively (Lenis ignores it)
  function buildMenu() {
    const nav = [
      ["works", () => scrollToProjects()],
      ["about", "#m-about"], ["awards", "#m-awards"],
      ["skills", "#m-skills"], ["education", "#m-education"], ["contact", "#m-contact"],
    ];
    const navA = nav.map(([k], i) => {
      const isWorks = k === "works";
      return `<a data-hover href="${isWorks ? "#" : "#m-" + k}"${isWorks ? " data-close" : ""} data-key="${k}">
        <span class="mn-num">0${i + 1}</span>
        <span class="mn-txt">${t(D.ui[k])}</span>
        <span class="mn-arrow">${isWorks ? "↺" : "↗"}</span>
      </a>`;
    });
    const navHTML =
      `<div class="mn-col mn-left">${navA.filter((_, i) => i % 2 === 0).join("")}</div>` +
      `<div class="mn-col mn-right">${navA.filter((_, i) => i % 2 === 1).join("")}</div>`;

    menu.innerHTML = `
      <button class="menu-close" data-hover data-close aria-label="Close menu"></button>
      <div class="menu-inner">
        <nav class="menu-nav">${navHTML}</nav>

        <section class="msec" id="m-about">
          <h3 data-key="about">${t(D.ui.about)}</h3>
          <div class="about-grid">
            <div class="about-text">${t(D.about).map((p) => `<p>${p}</p>`).join("")}</div>
            <div class="about-side">
              <b>${D.profile.name}</b><br>${t(D.profile.role)}<br>${t(D.profile.location)}<br><br>
              ${D.education.map((e) => `<b>${t(e)}</b><br>${e.period}<br>`).join("<br>")}
            </div>
          </div>
        </section>

        <section class="msec" id="m-awards">
          <h3 data-key="awards">${t(D.ui.awards)}</h3>
          <ul class="awards-list">
            ${D.awards.map((a) => `<li><span class="yr">${a.year}</span><span>${t(a)}</span></li>`).join("")}
          </ul>
        </section>

        <section class="msec" id="m-skills">
          <h3 data-key="skills">${t(D.ui.skills)}</h3>
          <ul class="skills-list">
            ${D.skills.map((s) => `<li><span class="yr"></span><span>${t(s)}</span></li>`).join("")}
          </ul>
        </section>

        <section class="msec" id="m-education">
          <h3 data-key="education">${t(D.ui.education)}</h3>
          <ul class="awards-list">
            ${D.education.map((e) => `<li><span class="yr">${e.period}</span><span>${t(e)}</span></li>`).join("")}
          </ul>
        </section>

        <section class="msec" id="m-contact">
          <h3 data-key="contact">${t(D.ui.contact)}</h3>
          <div class="contact-big">
            <a data-hover href="mailto:${D.profile.email}">${D.profile.email}</a>
          </div>
          <div class="contact-row">
            <a class="ext" data-hover href="${D.profile.github}" target="_blank" rel="noopener">${D.profile.githubLabel} <span class="varr">↗</span></a>
            <a data-hover href="tel:${D.profile.phone.replace(/\s/g, "")}">${D.profile.phone}</a>
            <span>${t(D.profile.location)}</span>
          </div>
        </section>
      </div>`;
  }

  let menuOpen = false;
  function openMenu() {
    menuOpen = true; menu.classList.add("open"); document.body.classList.add("menu-open");
    gsap.to(menu, { clipPath: "inset(0% 0 0% 0)", duration: .8, ease: "expo.inOut" });
    gsap.fromTo(".menu-nav a", { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: .05, duration: .7, ease: "power3.out", delay: .25,
        clearProps: "transform" });
    gsap.fromTo(".msec", { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: .07, duration: .7, ease: "power3.out", delay: .35 });
    $("#menubtn .lbl").textContent = t(D.ui.close);
    lenis.stop();
  }
  function closeMenu() {
    menuOpen = false; document.body.classList.remove("menu-open");
    gsap.to(menu, { clipPath: "inset(0% 0 100% 0)", duration: .7, ease: "expo.inOut",
      onComplete: () => menu.classList.remove("open") });
    $("#menubtn .lbl").textContent = t(D.ui.menu);
    lenis.start();
  }
  function scrollToProjects() { closeMenu(); }

  /* ============================================================
     LANGUAGE
     ============================================================ */
  function applyLang() {
    $$("[data-i18n]").forEach((el) => { el.textContent = t(D.ui[el.dataset.i18n]); });
    $$("#langtoggle button").forEach((b) => b.classList.toggle("active", b.dataset.lang === state.lang));
    $("#menubtn .lbl").textContent = menuOpen ? t(D.ui.close) : t(D.ui.menu);
    buildMenu();
    renderLabel(state.active < 0 ? 0 : state.active);
    setPreview(state.active < 0 ? 0 : state.active);
    document.documentElement.lang = state.lang;
  }

  /* ============================================================
     SOUND (synthesized, off by default)
     ============================================================ */
  let actx = null;
  function tick(freq = 520, gainv = 0.05) {
    if (!state.sound || !actx) return;
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = "triangle"; o.frequency.value = freq;
    g.gain.setValueAtTime(gainv, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.12);
    o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime + 0.13);
  }
  function toggleSound() {
    state.sound = !state.sound;
    $("#sound").classList.toggle("on", state.sound);
    if (state.sound && !actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (state.sound) tick(660, .06);
  }

  /* ============================================================
     WIRE EVENTS
     ============================================================ */
  $$("#viewtoggle button").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
  $("#menubtn").addEventListener("click", () => (menuOpen ? closeMenu() : openMenu()));
  $$("#langtoggle button").forEach((b) => b.addEventListener("click", () => {
    if (state.lang === b.dataset.lang) return;
    state.lang = b.dataset.lang; applyLang();
  }));
  $("#sound").addEventListener("click", toggleSound);
  $("#logo").addEventListener("click", () => { closeMenu(); lenis.scrollTo(0, { duration: 1.6 }); });

  // menu nav → smooth scroll within overlay
  menu.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { e.preventDefault(); closeMenu(); return; }
    const a = e.target.closest("a[href^='#m-']");
    if (!a) return;
    e.preventDefault();
    const target = $(a.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Note: thumbnails/cards are NOT clickable — only the "visit" URL link opens the site.
  // (Hover detection is rect-based, so cards don't need pointer-events.)

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) closeMenu();
    if (e.key.toLowerCase() === "v") setView(state.view === "list" ? "spiral" : "list");
  });

  window.addEventListener("resize", () => { sizeSpacer(); measure(); lenis.resize(); });

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    measure();
    applyLang();
    setActive(0);
    if (state.view === "spiral") {
      gsap.set(listEl, { opacity: 0 });
      gsap.set(spiralEl, { pointerEvents: "auto" });
      label.classList.add("spiralmode");
      renderSpiral(0);
      gsap.fromTo(spiralEl, { opacity: 0 }, { opacity: 1, duration: 1.0, ease: "power2.out", delay: .1 });
    } else {
      renderList(0);
      label.classList.add("listmode");
      gsap.fromTo(items, { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: .04, duration: .9, ease: "power3.out", delay: .1,
          onComplete: () => items.forEach((li) => (li.style.opacity = "")) });
    }
    requestAnimationFrame(frame);
  }

  /* loader: quick count, then reveal (no enter-gate, per request) */
  const loader = $("#loader"), num = $("#loader .num");
  let n = 0;
  const li = setInterval(() => {
    n += Math.random() * 18 + 6; if (n >= 100) { n = 100; clearInterval(li); }
    num.textContent = String(Math.floor(n)).padStart(3, "0");
    if (n === 100) {
      gsap.to($("#loader .nm span"), { yPercent: 0, duration: .6, ease: "power3.out", stagger: .04 });
      setTimeout(() => { loader.classList.add("done"); boot(); }, 650);
    }
  }, 90);

  // preload images (non-blocking)
  P.forEach((p) => (p.images || []).forEach((src) => { const im = new Image(); im.src = src; }));
})();
