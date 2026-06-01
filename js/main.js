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
        <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="site-item">
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
      <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="search-result-item">
        <span class="site-name">${r.icon || '🔗'} ${r.name}</span>
        <span class="site-category">${r.category}</span>
        <span class="site-link">${r.desc || r.url}</span>
      </a>
    `).join('');
  }

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
  renderCategories();
  console.log('🍃 Y的acg导航站已就绪！');
  console.log(`   收录 ${siteData.length} 个分类，共 ${siteData.reduce((sum, c) => sum + c.sites.length, 0)} 个站点`);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
