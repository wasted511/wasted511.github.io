/* ==========================================
   Y的acg导航站 - 交互逻辑
   ========================================== */

// ============ 天气组件 ============
const weatherIcon = document.querySelector('.weather-icon');
const weatherTemp = document.querySelector('.weather-temp');
const weatherCity = document.querySelector('.weather-city');

const WEATHER_CODES = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌦️', 81: '🌦️', 82: '🌧️',
  95: '⛈️', 96: '⛈️', 99: '⛈️'
};

// 带超时的 fetch
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

async function fetchWeather() {
  const CACHE_KEY = 'weather_cache';
  const CACHE_TTL = 30 * 60 * 1000; // 30 分钟

  // 1. 先尝试显示缓存数据
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.time < CACHE_TTL) {
      weatherIcon.textContent = cached.icon;
      weatherTemp.textContent = cached.temp;
      weatherCity.textContent = cached.city;
      return; // 缓存有效，直接用
    }
  } catch (e) { /* 缓存解析失败，继续请求 */ }

  // 2. 请求新数据
  try {
    // 获取坐标（5秒超时）
    const ipRes = await fetchWithTimeout('https://ipapi.co/json/', {}, 5000);
    const ipData = await ipRes.json();
    const lat = ipData.latitude;
    const lon = ipData.longitude;

    // 反查中文城市 + 天气 并行请求（5秒超时）
    const [geoRes, weatherRes] = await Promise.allSettled([
      fetchWithTimeout(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=zh`,
        { headers: { 'Accept-Language': 'zh-CN' } }, 5000
      ),
      fetchWithTimeout(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto&forecast_days=1`,
        {}, 5000
      )
    ]);

    // 解析城市名
    let city = '未知';
    if (geoRes.status === 'fulfilled') {
      try {
        const geoData = await geoRes.value.json();
        const addr = geoData.address || {};
        city = addr.city || addr.town || addr.county || addr.state || '未知';
      } catch (e) { /* 解析失败 */ }
    }

    // 解析天气
    let icon = '🌤️', temp = '--°';
    if (weatherRes.status === 'fulfilled') {
      try {
        const weatherData = await weatherRes.value.json();
        const code = weatherData.current.weather_code;
        temp = Math.round(weatherData.current.temperature_2m) + '°';
        icon = WEATHER_CODES[code] || '🌤️';
      } catch (e) { /* 解析失败 */ }
    }

    // 更新显示
    weatherIcon.textContent = icon;
    weatherTemp.textContent = temp;
    weatherCity.textContent = city;

    // 写入缓存
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ icon, temp, city, time: Date.now() }));
    } catch (e) { /* localStorage 满 */ }
  } catch (e) {
    console.log('天气加载失败，使用默认显示');
  }
}

// ============ 悬浮搜索栏 ============
const stickySearch = document.getElementById('stickySearch');
const stickySearchInput = document.getElementById('stickySearchInput');
const stickySearchBtn = document.getElementById('stickySearchBtn');
const mainSearchSection = document.querySelector('.search-section');

// 滚动监听
let searchSectionBottom = 0;

function updateSearchSectionPos() {
  searchSectionBottom = mainSearchSection.getBoundingClientRect().bottom + window.scrollY;
}

// === Nav bar scroll effect ===
const navBar = document.getElementById('navBar');
const headerSection = document.querySelector('.header');

function handleNavBarScroll() {
  const headerBottom = headerSection.getBoundingClientRect().bottom;
  if (headerBottom < 20) {
    navBar.classList.add('scrolled');
  } else {
    navBar.classList.remove('scrolled');
  }
}

// === Consolidated scroll handler ===
function handleScroll() {
  // Sticky search
  if (window.scrollY > searchSectionBottom + 40) {
    stickySearch.classList.add('visible');
  } else {
    stickySearch.classList.remove('visible');
  }
  // Back to top
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', () => {
  handleScroll();
  handleNavBarScroll();
});
window.addEventListener('resize', () => {
  updateSearchSectionPos();
});

// ============ DOM 元素 ============
const categoryGrid = document.getElementById('categoryGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const searchResultCount = document.getElementById('searchResultCount');
const searchResultList = document.getElementById('searchResultList');
const clearSearch = document.getElementById('clearSearch');
const modal = document.getElementById('categoryModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = modal.querySelector('.modal-overlay');

// 历史浏览
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// 回到顶部
const backToTopBtn = document.getElementById('backToTop');

// ============ 历史浏览 ============
const HISTORY_KEY = 'site_history';
const MAX_HISTORY = 20;

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function addHistory(siteName, siteUrl, categoryName) {
  let history = getHistory();
  // 移除已有相同URL的记录
  history = history.filter(h => h.url !== siteUrl);
  // 加到最前面
  history.unshift({ name: siteName, url: siteUrl, category: categoryName, time: Date.now() });
  // 最多保留20条
  if (history.length > MAX_HISTORY) history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = getHistory();
  if (history.length === 0) {
    historyList.innerHTML = '<span class="history-empty">暂无浏览记录</span>';
    clearHistoryBtn.style.display = 'none';
  } else {
    historyList.innerHTML = history.map(h => `
      <a href="${h.url}" target="_blank" rel="noopener noreferrer" class="history-item"
         title="分类：${h.category}">
        🔗 ${h.name}
      </a>
    `).join('');
    clearHistoryBtn.style.display = 'inline-block';
  }
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

clearHistoryBtn.addEventListener('click', clearHistory);

// ============ 主题切换 — iOS Segmented Control ============
const THEME_KEY = 'site_theme';
const THEMES = ['green', 'pink', 'blue', 'mono', 'dark'];
const themeSegments = document.querySelectorAll('.theme-segment');
const logoIcon = document.getElementById('logoIcon');

const THEME_LOGOS = {
  green: '🍃',
  pink: '🌸',
  blue: '☁️',
  mono: '🗡️',
  dark: '🌙',
};

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'green';
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  themeSegments.forEach(seg => {
    seg.classList.toggle('active', seg.dataset.theme === theme);
  });
  // Update logo icon
  const icon = THEME_LOGOS[theme] || '🍃';
  if (logoIcon) {
    logoIcon.textContent = icon;
    logoIcon.style.display = icon ? '' : 'none';
  }
}

themeSegments.forEach(segment => {
  segment.addEventListener('click', (e) => {
    e.stopPropagation();
    setTheme(segment.dataset.theme);
  });
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ Header Quote Rotation ============
const ANIME_QUOTES = [
  { text: '如果是去见你，那我一定是用跑的。', source: '——《萤火之森》' },
  { text: '能哭的地方，只有厕所和爸爸的怀里。', source: '——《CLANNAD》' },
  { text: '我不管几次，都会站在你身边。', source: '——《命运石之门》' },
  { text: '人没有牺牲的话就什么都得不到。', source: '——《钢之炼金术师》' },
  { text: '能原谅自己的，只有自己。', source: '——《魔法少女小圆》' },
  { text: '错的不是我，是这个世界。', source: '——《东京喰种》' },
  { text: '我想要的，只是守护重要的东西。', source: '——《火影忍者》' },
  { text: '正因为我们看不见，所以才有了可能性。', source: '——《黑执事》' },
  { text: '活着本来就不是一件容易的事。', source: '——《银魂》' },
  { text: '无论多少次，我都会选择你。', source: '——《你的名字。》' },
  { text: '人生就是不停的战斗。', source: '——《海贼王》' },
  { text: '没有未来的未来，不是我想要的未来。', source: '——《境界的彼方》' },
  { text: '只要有想见的人，就不是孤身一人。', source: '——《夏目友人帐》' },
  { text: '我绝对不要什么遗憾的人生。', source: '——《排球少年》' },
  { text: '已经没事了，接下来只要想着前进就好。', source: '——《鬼灭之刃》' },
  { text: '你并不是一个人，我一直都在看着你。', source: '——《EVA》' },
  { text: '说到做到，这就是我的忍道。', source: '——《火影忍者》' },
  { text: '真相只有一个。', source: '——《名侦探柯南》' },
  { text: '梦总是会醒的，但不会消失。', source: '——《千与千寻》' },
  { text: '我曾以为我讨厌这个小镇，但离开后才发现多么想念。', source: '——《未闻花名》' },
  { text: '如果活着本身就有意义的话，那就活下去吧。', source: '——《进击的巨人》' },
  { text: '我这一生，无怨无悔。', source: '——《北斗神拳》' },
  { text: '因为我最喜欢的是你，所以不想输。', source: '——《四月是你的谎言》' },
  { text: '命运给了我一巴掌，但我也回了它一拳。', source: '——《灵能百分百》' },
  { text: '我不需要什么特别的理由，只是想做而已。', source: '——《一拳超人》' },
  { text: '就算全世界都否定你，我也会站在你这边。', source: '——《龙与虎》' },
  { text: '前进吧，即使只有一步也好。', source: '——《冰菓》' },
  { text: '笑容是能让所有人都幸福的力量。', source: '——《魔卡少女樱》' },
  { text: '你永远不知道明天会发生什么，所以要勇敢地活。', source: '——《星际牛仔》' },
  { text: '我想成为那个能够站在你身边的人。', source: '——《青春猪头少年》' },
  { text: '不甘心的话就努力变强吧。', source: '——《灌篮高手》' },
  { text: '没有人是从一开始就站在天上的。', source: '——《天元突破》' },
  { text: '这个世界没有偶然，只有必然。', source: '——《XXXHOLiC》' },
  { text: '约定好了，我会带你去那个地方。', source: '——《紫罗兰永恒花园》' },
  { text: '要活下去啊，在这个残酷的世界里。', source: '——《来自深渊》' },
  { text: '你的名字，是我听过最美的诗。', source: '——《言叶之庭》' },
  { text: '做自己想做的事，成为自己想成为的人。', source: '——《虫师》' },
  { text: '即使是虚假的爱，我也愿意相信。', source: '——《Fate/Zero》' },
  { text: '只要有你在，我什么都不怕。', source: '——《秒速五厘米》' },
  { text: '比鬼神更可怕的，是人心。', source: '——《犬夜叉》' },
];

const quoteText = document.querySelector('#headerQuote .quote-text');
const quoteSource = document.querySelector('#headerQuote .quote-source');
let quoteIndex = Math.floor(Math.random() * ANIME_QUOTES.length);
let quoteTimer = null;

function showQuote() {
  if (!quoteText || !quoteSource) return;
  quoteText.classList.add('fading');
  quoteSource.classList.add('fading');
  setTimeout(() => {
    const q = ANIME_QUOTES[quoteIndex];
    quoteText.textContent = q.text;
    quoteSource.textContent = q.source;
    quoteText.classList.remove('fading');
    quoteSource.classList.remove('fading');
  }, 400);
}

// Random next, never same as current
function nextQuote() {
  let next;
  do { next = Math.floor(Math.random() * ANIME_QUOTES.length); }
  while (next === quoteIndex && ANIME_QUOTES.length > 1);
  quoteIndex = next;
}

function startQuoteRotation() {
  if (!quoteText || !quoteSource) return;
  showQuote();
  quoteTimer = setInterval(() => {
    nextQuote();
    showQuote();
  }, 6000);
}

// Call in init()

// ============ Swipe-to-Dismiss for Modal ============
const modalContent = modal.querySelector('.modal-content');
let touchStartY = 0;
let touchCurrentY = 0;
let isSwiping = false;

modalContent.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  isSwiping = true;
}, { passive: true });

modalContent.addEventListener('touchmove', (e) => {
  if (!isSwiping) return;
  touchCurrentY = e.touches[0].clientY;
  const delta = Math.max(0, touchCurrentY - touchStartY);
  modalContent.style.transform = 'translateY(' + delta + 'px)';
  modalContent.style.transition = 'none';
});

modalContent.addEventListener('touchend', () => {
  if (!isSwiping) return;
  isSwiping = false;
  const delta = touchCurrentY - touchStartY;
  modalContent.style.transition = '';
  modalContent.style.transform = '';
  if (delta > 80) {
    closeModal();
  }
});

// ============ 渲染分类卡片 ============
function renderCategories() {
  categoryGrid.innerHTML = siteData.map((cat, index) => `
    <div class="category-card" data-category="${cat.id}" data-index="${index}">
      <div class="card-icon">${cat.icon}</div>
      <h3 class="card-title">${cat.name}</h3>
      <p class="card-count">收录 ${cat.sites.length} 个站点</p>
      <div class="card-tags">
        ${cat.sites.slice(0, 4).map(s => `<span class="card-tag">${s.name}</span>`).join('')}
        ${cat.sites.length > 4 ? `<span class="card-tag">+${cat.sites.length - 4}更多</span>` : ''}
      </div>
    </div>
  `).join('');

  // 绑定卡片点击事件
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.dataset.category;
      openCategory(catId);
    });
  });
}

// ============ 打开分类弹窗 ============
function openCategory(catId) {
  const cat = siteData.find(c => c.id === catId);
  if (!cat) return;

  modalTitle.textContent = `${cat.icon} ${cat.name}`;

  modalBody.innerHTML = `
    <div class="site-list">
      ${cat.sites.map(s => `
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="site-item"
           data-site-name="${s.name}" data-site-url="${s.url}" data-category="${cat.name}">
          <span class="s-icon">${s.icon || '🔗'}</span>
          <span class="s-info">
            <span class="s-name">${s.name}</span>
            <span class="s-desc">${s.desc || s.url}</span>
          </span>
          <span class="s-arrow">→</span>
        </a>
      `).join('')}
    </div>
  `;

  // 绑定站点点击 → 记录历史
  modalBody.querySelectorAll('.site-item').forEach(item => {
    item.addEventListener('click', function(e) {
      const name = this.dataset.siteName;
      const url = this.dataset.siteUrl;
      const category = this.dataset.category;
      addHistory(name, url, category);
    });
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ============ 关闭弹窗 ============
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// ESC 关闭弹窗
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('active')) {
      closeModal();
    }
  }
});

// ============ 搜索功能 ============
function searchSites(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    searchResults.style.display = 'none';
    return;
  }

  const results = [];
  siteData.forEach(cat => {
    cat.sites.forEach(site => {
      if (
        site.name.toLowerCase().includes(q) ||
        (site.desc && site.desc.toLowerCase().includes(q)) ||
        cat.name.toLowerCase().includes(q)
      ) {
        results.push({ ...site, category: cat.name, categoryId: cat.id });
      }
    });
  });

  if (results.length === 0) {
    searchResultCount.textContent = '';
    searchResultList.innerHTML = '<div class="search-no-result">😢 没有找到相关站点，试试其他关键词~</div>';
  } else {
    searchResultCount.textContent = `找到 ${results.length} 个结果`;
    searchResultList.innerHTML = results.map(r => `
      <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="search-result-item"
         data-site-name="${r.name}" data-site-url="${r.url}" data-category="${r.category}">
        <span class="site-name">${r.icon || '🔗'} ${r.name}</span>
        <span class="site-category">${r.category}</span>
        <span class="site-link">${r.desc || r.url}</span>
      </a>
    `).join('');
  }

  // 绑定搜索结果点击 → 记录历史
  searchResultList.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', function(e) {
      const name = this.dataset.siteName;
      const url = this.dataset.siteUrl;
      const category = this.dataset.category;
      addHistory(name, url, category);
    });
  });

  searchResults.style.display = 'block';
}

// 搜索输入事件
searchInput.addEventListener('input', () => {
  searchSites(searchInput.value);
});

// 搜索按钮点击
searchBtn.addEventListener('click', () => {
  searchSites(searchInput.value);
});

// 回车搜索
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchSites(searchInput.value);
  }
});

// 清除搜索
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  searchResults.style.display = 'none';
  searchInput.focus();
});

// 点击搜索结果外部关闭
document.addEventListener('click', (e) => {
  if (!searchResults.contains(e.target) && e.target !== searchInput) {
    searchResults.style.display = 'none';
  }
});

// ============ 悬浮搜索栏同步 ============
function setupStickySearch() {
  // 两个搜索框内容互相同步
  stickySearchInput.addEventListener('input', () => {
    searchInput.value = stickySearchInput.value;
    searchSites(stickySearchInput.value);
  });

  searchInput.addEventListener('input', () => {
    stickySearchInput.value = searchInput.value;
  });

  // 悬浮搜索按钮点击
  stickySearchBtn.addEventListener('click', () => {
    searchInput.value = stickySearchInput.value;
    searchSites(stickySearchInput.value);
  });

  // 悬浮搜索回车
  stickySearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      searchInput.value = stickySearchInput.value;
      searchSites(stickySearchInput.value);
    }
  });
}

// ============ 初始化 ============
function init() {
  // 恢复主题
  const savedTheme = getTheme();
  setTheme(savedTheme);

  // 渲染分类卡片
  renderCategories();

  // 渲染历史记录
  renderHistory();

  // 设置悬浮搜索栏同步
  setupStickySearch();

  // 天气延迟加载（不阻塞首屏渲染）
  // 先用缓存立即显示，再后台更新
  setTimeout(() => fetchWeather(), 100);

  // 计算搜索区域位置（用于悬浮搜索栏）
  updateSearchSectionPos();
  handleNavBarScroll();

  // 启动名言轮播
  startQuoteRotation();

  console.log('🍃 Y的acg导航站已就绪！');
  console.log(`   收录 ${siteData.length} 个分类，共 ${siteData.reduce((sum, c) => sum + c.sites.length, 0)} 个站点`);
  console.log(`   当前主题：${savedTheme}`);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============ GSAP Animations ============
function initGSAP() {
  // Header entrance — title slides up, quote fades in
  gsap.from('.logo', {
    y: 40, opacity: 0, duration: 1,
    ease: 'power3.out',
  });
  gsap.from('.header-desc', {
    y: 20, opacity: 0, duration: 0.8, delay: 0.2,
    ease: 'power3.out',
  });
  gsap.from('.header-quote', {
    opacity: 0, duration: 1, delay: 0.5,
    ease: 'power2.out',
  });
  gsap.from('.header-glass', {
    opacity: 0, scale: 0.95, duration: 1.2, delay: 0.15,
    ease: 'power3.out',
  });

  // Search bar drops in
  gsap.from('.search-section', {
    y: 30, opacity: 0, duration: 0.8, delay: 0.6,
    ease: 'power3.out',
  });

  // Cards stagger fade-up with ScrollTrigger
  gsap.utils.toArray('.category-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
      },
      y: 50, opacity: 0, duration: 0.7, delay: i * 0.05,
      ease: 'power3.out',
    });
  });

  // Notice bar slide in
  gsap.from('.notice-bar', {
    scrollTrigger: { trigger: '.notice-section', start: 'top 90%' },
    x: -30, opacity: 0, duration: 0.7,
    ease: 'power3.out',
  });

  // History bar slide in
  gsap.from('.history-bar', {
    scrollTrigger: { trigger: '.history-section', start: 'top 90%' },
    x: -30, opacity: 0, duration: 0.7,
    ease: 'power3.out',
  });
}

// Run GSAP after DOM ready
if (typeof gsap !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGSAP);
  } else {
    initGSAP();
  }
}

