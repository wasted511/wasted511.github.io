/* ==========================================
   Anime Archive Terminal
   启动仪式 → 光柱 → 档案浮现
   ========================================== */

// ===== Pillar particles =====
function createPillarParticles() {
  const container = document.getElementById('pillarParticles');
  if (!container) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'pillar-particle';
    p.style.setProperty('--dur', (2.5 + Math.random() * 4) + 's');
    p.style.setProperty('--delay', (Math.random() * 5) + 's');
    p.style.height = (4 + Math.random() * 8) + 'px';
    frag.appendChild(p);
  }
  container.appendChild(frag);
}

// ===== Render month nodes along pillar =====
const cardsZone = document.getElementById('cardsZone');
let activeNodeEl = null;

function getAnimeByMonth(key) {
  return TIMELINE_DATA.filter(a => a.date === key);
}

function renderMonthNodes() {
  const list = document.getElementById('monthList');
  if (!list) return;
  list.innerHTML = '';

  TIMELINE_NODES.forEach(node => {
    const count = getAnimeByMonth(node.time).length;
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

function renderStats() {
  const total = TIMELINE_DATA.length;
  const months = new Set(TIMELINE_DATA.map(a => a.date)).size;
  const future = TIMELINE_DATA.filter(a => a.date >= '2027').length;
  ['statTotal','statMonths','statFuture'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) el.textContent = [total, months, future][i];
  });
}

// ===== Card cover gradient =====
const PALETTE = [
  ['#101020','#1A1A30'], ['#101018','#1A1028'], ['#0E1418','#142028'],
  ['#14101A','#201028'], ['#0E1810','#142018'], ['#181810','#282010'],
  ['#101820','#162030'], ['#1A1018','#281820'], ['#101418','#182228'],
  ['#181010','#281A1A'],
];

function renderCards(animes) {
  cardsZone.innerHTML = '';
  if (!animes.length) {
    cardsZone.innerHTML = '<div class="cards-placeholder">NO RECORDS</div>';
    return;
  }

  animes.forEach((anime, i) => {
    const [c1, c2] = PALETTE[i % PALETTE.length];
    const card = document.createElement('div');
    card.className = 'archive-card';
    card.innerHTML = `
      <div class="archive-card-cover">
        <div class="archive-card-cover-bg" style="background:linear-gradient(155deg,${c1} 0%,${c2} 100%)"></div>
        <div class="archive-card-cover-text">${anime.title}</div>
      </div>
      <div class="archive-card-info">
        <div class="archive-card-title">${anime.title}</div>
        <div class="archive-card-meta">${anime.date}</div>
        <span class="archive-card-type">${anime.type}</span>
      </div>
    `;
    cardsZone.appendChild(card);
  });

  // GSAP: cards emerge slowly, one by one, with subtle lift
  if (typeof gsap !== 'undefined') {
    const cards = cardsZone.querySelectorAll('.archive-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 16, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8,
        stagger: 0.10,
        ease: 'power2.out',
      }
    );
  }
}

// ===== Click handler =====
function bindMonthNodes() {
  document.querySelectorAll('.month-node').forEach(node => {
    node.addEventListener('click', () => {
      document.querySelectorAll('.month-node').forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      activeNodeEl = node;

      // Brief pause, then show records
      const animes = getAnimeByMonth(node.dataset.time);
      cardsZone.innerHTML = '<div class="cards-placeholder">RETRIEVING…</div>';

      setTimeout(() => {
        renderCards(animes);
      }, 300);
    });
  });
}

// ===== Default: show first node with data =====
function showDefault() {
  const nodes = document.querySelectorAll('.month-node');
  for (const n of nodes) {
    if (getAnimeByMonth(n.dataset.time).length > 0) {
      n.classList.add('active');
      activeNodeEl = n;
      renderCards(getAnimeByMonth(n.dataset.time));
      return;
    }
  }
}

// ===== Startup ritual =====
async function startupRitual() {
  const overlay = document.getElementById('startupOverlay');
  const dot = document.getElementById('startupDot');
  if (!overlay || !dot) return initDisplay();

  // Phase 1: Dot appears
  await sleep(400);
  dot.style.transition = 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s ease';
  dot.style.opacity = '1';
  dot.style.transform = 'scale(1)';
  await sleep(1000);

  // Phase 2: Dot stretches into pillar
  dot.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1), height 1.5s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.8s ease';
  dot.style.width = '1px';
  dot.style.height = '80vh';
  dot.style.borderRadius = '1px';
  await sleep(1800);

  // Phase 3: Fade overlay
  overlay.classList.add('done');

  // Phase 4: Reveal page content
  await sleep(600);

  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    tl.from('.lab-hero-label', { opacity: 0, y: 12 }, 0)
      .from('.lab-hero-title', { opacity: 0, y: 16 }, 0.15)
      .from('.lab-hero-sub', { opacity: 0, y: 8 }, 0.3)
      .from('.lab-stat', { opacity: 0, y: 8, stagger: 0.08 }, 0.45)
      .from('.pillar-bg', { opacity: 0, duration: 1.2 }, 0.5)
      .from('.month-node', { opacity: 0, y: 6, stagger: 0.10, duration: 0.7 }, 0.9);
  }

  // Show default records after a beat
  setTimeout(() => {
    showDefault();
  }, 200);
}

function initDisplay() {
  // Fallback: just show everything
  document.getElementById('startupOverlay').style.display = 'none';
  showDefault();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ===== Init =====
function init() {
  createPillarParticles();
  renderMonthNodes();
  renderStats();
  bindMonthNodes();

  // Don't show cards yet — startup handles it
  startupRitual();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
