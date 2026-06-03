/* ==========================================
   Anime Archive Terminal
   启动仪式 · 计数器 · 搜索 · 档案调取
   ========================================== */

// ===== Pillar Particles =====
(function() {
  const c = document.getElementById('pillarParticles');
  if (!c) return;
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'pillar-particle';
    p.style.setProperty('--dur', (3 + Math.random() * 5) + 's');
    p.style.setProperty('--delay', Math.random() * 6 + 's');
    p.style.height = (4 + Math.random() * 10) + 'px';
    c.appendChild(p);
  }
})();

// ===== Card cover palettes =====
const PALETTE = [
  ['#0E1028','#1A1040'], ['#0E1018','#1A0E28'], ['#0A1018','#101828'],
  ['#100E1A','#1A0E28'], ['#0A140C','#102018'], ['#181810','#241C10'],
  ['#0A101C','#101828'], ['#180E18','#240E20'], ['#0A1014','#101C24'],
  ['#180A0A','#240E10'],
];

const POSTER_SEEDS = [
  'frieren','apothecary','oshinoko','sakamoto','zenshu','jigokuraku',
  'kaiju8','demonslayer','windbreaker','fireforce','spyfamily','kuroshitsuji',
  'violet','jujutsu','mushoku','dressup','bocchi','rezero','chainsaw',
  'abyss','neverland','diamond','aot','kiki','madoka','fate','opm',
  'mha','tengoku','mahoyo','onepiece','bleach','eva','edgerunners',
  'fumetsu','berserk','steins','hxh',
];

function coverHTML(anime, i) {
  const [c1, c2] = PALETTE[i % PALETTE.length];
  if (anime.cover) {
    return `
      <div class="archive-card-cover">
        <img class="cover-poster-img" src="${anime.cover}" alt="${anime.title}" loading="lazy"
             onerror="this.style.display='none'">
        <div class="cover-gradient" style="background:linear-gradient(160deg,${c1} 0%,${c2} 100%)"></div>
      </div>`;
  }
  // No cover yet — "SOON" placeholder
  return `
    <div class="archive-card-cover">
      <div class="cover-gradient" style="background:linear-gradient(160deg,${c1} 0%,${c2} 100%)"></div>
      <div class="cover-text" style="font-size:18px;letter-spacing:6px;color:rgba(255,255,255,0.25)">SOON</div>
    </div>`;
}

function statusClass(s) {
  if (!s) return '';
  if (s === '完结' || s === '上映中') return 'done';
  if (s === '放送中') return 'airing';
  return 'upcoming';
}

// ===== Render month nodes =====
function renderMonthNodes() {
  const list = document.getElementById('monthList');
  if (!list) return;
  list.innerHTML = '';
  TIMELINE_NODES.forEach(node => {
    const count = TIMELINE_DATA.filter(a => a.date === node.time).length;
    const el = document.createElement('div');
    el.className = 'month-node';
    el.dataset.time = node.time;
    el.innerHTML = `
      <div class="month-dot"></div>
      <span class="month-label">${node.date}</span>
      <span class="month-count">${count > 0 ? count + ' records' : ''}</span>
      <span class="month-accessing">ACCESSING…</span>
    `;
    list.appendChild(el);
  });
}

// ===== Counter animation =====
function animateCounters() {
  const targets = [
    { id: 'statTotal', end: TIMELINE_DATA.length },
    { id: 'statMonths', end: new Set(TIMELINE_DATA.map(a => a.date)).size },
    { id: 'statFuture', end: TIMELINE_DATA.filter(a => a.date >= '2027').length },
  ];
  targets.forEach(({ id, end }) => {
    const el = document.getElementById(id);
    if (!el) return;
    const start = { val: 0 };
    const duration = 900;
    const startTime = performance.now();
    function tick() {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(start.val + (end - start.val) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ===== Search =====
let searchQuery = '';
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    const monthNodes = document.querySelectorAll('.month-node');
    if (searchQuery) {
      // Show all matching records
      const results = TIMELINE_DATA.filter(a =>
        a.title.toLowerCase().includes(searchQuery) ||
        a.tags.some(t => t.toLowerCase().includes(searchQuery)) ||
        a.type.toLowerCase().includes(searchQuery) ||
        a.status.includes(searchQuery) ||
        a.date.includes(searchQuery)
      );
      monthNodes.forEach(n => n.classList.remove('active'));
      showCards(results, null);
    } else {
      // Reset to default
      showDefault();
    }
  });
}

// ===== Cards zone =====
const cardsZone = document.getElementById('cardsZone');
let activeNodeEl = null;

function showCards(animes, nodeEl) {
  cardsZone.innerHTML = '';
  if (!animes.length) {
    cardsZone.innerHTML = '<div class="cards-placeholder">NO RESULTS</div>';
    return;
  }
  if (nodeEl) {
    nodeEl.classList.add('active');
    activeNodeEl = nodeEl;
  }

  animes.forEach((anime, i) => {
    const card = document.createElement('div');
    card.className = 'archive-card';
    const sClass = statusClass(anime.status);
    card.innerHTML = `
      ${coverHTML(anime, i)}
      <div class="archive-card-info">
        <div class="archive-card-title">${anime.title}</div>
        <div class="archive-card-row">
          <span class="archive-card-type">${anime.type}</span>
          <span class="archive-card-status ${sClass}">${anime.status || ''}</span>
          <span class="archive-card-score">${anime.score ? anime.score.toFixed(1) : ''}</span>
        </div>
        <div class="archive-card-tags">
          ${anime.tags.slice(0, 3).map(t => `<span class="archive-card-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    cardsZone.appendChild(card);
  });

  // Animate cards with staggered CSS transition
  const cards = cardsZone.querySelectorAll('.archive-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px) scale(0.985)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)';
    card.style.transitionDelay = (i * 0.08) + 's';
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===== Toast =====
function showToast(msg) {
  const toast = document.getElementById('statusToast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1400);
}

// ===== Click handler with ACCESSING ritual =====
function bindMonthNodes() {
  document.querySelectorAll('.month-node').forEach(node => {
    node.addEventListener('click', () => {
      document.querySelectorAll('.month-node').forEach(n => n.classList.remove('active'));
      activeNodeEl = null;
      const animes = TIMELINE_DATA.filter(a => a.date === node.dataset.time);
      cardsZone.innerHTML = '<div class="cards-placeholder">ACCESSING ARCHIVE…</div>';
      showToast('ACCESSING ARCHIVE…');

      setTimeout(() => {
        showToast('ARCHIVE OPENED');
        showCards(animes, node);
      }, 400);
    });
  });
}

// ===== Default =====
function showDefault() {
  document.querySelectorAll('.month-node').forEach(n => n.classList.remove('active'));
  const nodes = document.querySelectorAll('.month-node');
  for (const n of nodes) {
    const animes = TIMELINE_DATA.filter(a => a.date === n.dataset.time);
    if (animes.length > 0) {
      showCards(animes, n);
      if (!searchQuery) {
        setTimeout(() => n.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 300);
      }
      return;
    }
  }
}

// ===== Startup ritual =====
async function startupRitual() {
  const overlay = document.getElementById('startupOverlay');
  const dot = document.getElementById('startupDot');
  if (!overlay || !dot) return initDisplay();

  await sleep(400);
  dot.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease';
  dot.style.opacity = '1'; dot.style.transform = 'scale(1)';
  await sleep(1000);

  dot.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1), height 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
  dot.style.width = '1px'; dot.style.height = '80vh';
  await sleep(1800);

  overlay.classList.add('done');
  await sleep(600);

  animateCounters();

  // CSS-based entrance — staggered reveals
  const fadeIn = (sel, delay, y) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(' + (y || 10) + 'px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)';
    el.style.transitionDelay = delay + 's';
    requestAnimationFrame(() => {
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = ''; }, 40);
    });
  };

  fadeIn('.lab-hero-label', 0, 10);
  fadeIn('.lab-hero-title', 0.12, 14);
  fadeIn('.lab-hero-sub', 0.25, 8);
  document.querySelectorAll('.lab-stat').forEach((el, i) => {
    el.style.opacity = '0'; el.style.transform = 'translateY(8px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)';
    el.style.transitionDelay = (0.35 + i * 0.06) + 's';
    requestAnimationFrame(() => setTimeout(() => { el.style.opacity = '1'; el.style.transform = ''; }, 40));
  });
  fadeIn('.scroll-prompt', 0.5, 4);
  fadeIn('.search-section', 0.55, 6);
  fadeIn('.pillar-bg', 0.4, 0);
  document.querySelectorAll('.month-node').forEach((el, i) => {
    el.style.opacity = '0'; el.style.transform = 'translateY(5px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    el.style.transitionDelay = (0.7 + i * 0.08) + 's';
    requestAnimationFrame(() => setTimeout(() => { el.style.opacity = '1'; el.style.transform = ''; }, 40));
  });

  setTimeout(() => showDefault(), 2200);
}

function initDisplay() {
  document.getElementById('startupOverlay').style.display = 'none';
  const el = document.getElementById('statTotal'); if (el) el.textContent = TIMELINE_DATA.length;
  const em = document.getElementById('statMonths'); if (em) em.textContent = new Set(TIMELINE_DATA.map(a => a.date)).size;
  const ef = document.getElementById('statFuture'); if (ef) ef.textContent = TIMELINE_DATA.filter(a => a.date >= '2027').length;
  showDefault();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ===== Init =====
function init() {
  renderMonthNodes();
  bindMonthNodes();
  startupRitual();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
