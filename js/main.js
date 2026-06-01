/* ==========================================
   Y的acg导航站 - 交互逻辑
   ========================================== */

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

// 主题切换
const themeToggle = document.getElementById('themeToggle');
const themePalette = document.getElementById('themePalette');
const themeDots = document.querySelectorAll('.theme-dot');
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

// ============ 主题切换 ============
const THEME_KEY = 'site_theme';
const THEMES = ['green', 'pink', 'blue', 'dark'];

function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'green';
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  // 更新选中状态
  themeDots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.theme === theme);
  });
}

// 主题色点点击
themeDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation();
    setTheme(dot.dataset.theme);
    themePalette.classList.remove('show');
  });
});

// 主题按钮点击 - 展开/收起调色板
themeToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  themePalette.classList.toggle('show');
});

// 点击外部关闭调色板
document.addEventListener('click', () => {
  themePalette.classList.remove('show');
});

// ============ 回到顶部 ============
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// ============ 关闭弹窗 ============
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// ESC 关闭弹窗
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.style.display === 'flex') {
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

// ============ 初始化 ============
function init() {
  // 恢复主题
  const savedTheme = getTheme();
  setTheme(savedTheme);

  // 渲染分类卡片
  renderCategories();

  // 渲染历史记录
  renderHistory();

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
