/* ==========================================
   神秘实验室 — Anime Archive 数据源
   封面来自 MyAnimeList API
   未播作品显示 SOON 占位
   ========================================== */

const TIMELINE_DATA = [
  // ===== 2025 Q1 =====
  { title: '葬送的芙莉莲 S2', date: '2025-01', type: 'TV', status: '放送中', score: 9.4, cover: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg', tags: ['Fantasy', 'Adventure'] },
  { title: '药屋少女的呢喃 S2', date: '2025-01', type: 'TV', status: '放送中', score: 8.8, cover: 'https://cdn.myanimelist.net/images/anime/1821/108124l.jpg', tags: ['Mystery', 'Historical'] },
  { title: '我推的孩子 S3', date: '2025-01', type: 'TV', status: '放送中', score: 8.7, cover: 'https://cdn.myanimelist.net/images/anime/1817/135815l.jpg', tags: ['Idol', 'Drama'] },
  { title: '坂本日常', date: '2025-01', type: 'TV', status: '放送中', score: 8.2, cover: 'https://cdn.myanimelist.net/images/anime/1836/146835l.jpg', tags: ['Action', 'Comedy'] },
  { title: '全修。', date: '2025-01', type: 'TV', status: '完结', score: 7.9, cover: 'https://cdn.myanimelist.net/images/anime/1930/150000l.jpg', tags: ['Fantasy', 'Original'] },
  { title: '地狱乐 S2', date: '2025-01', type: 'TV', status: '完结', score: 8.4, cover: 'https://cdn.myanimelist.net/images/anime/1547/124235l.jpg', tags: ['Action', 'Dark'] },

  // ===== 2025 Q2 =====
  { title: '怪兽8号 S2', date: '2025-04', type: 'TV', status: '放送中', score: 8.3, cover: 'https://cdn.myanimelist.net/images/anime/1370/140362l.jpg', tags: ['Action', 'Sci-Fi'] },
  { title: '鬼灭之刃 无限城篇', date: '2025-04', type: 'Movie', status: '上映中', score: 9.2, cover: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg', tags: ['Action', 'Fantasy'] },
  { title: '防风铃 S2', date: '2025-04', type: 'TV', status: '完结', score: 7.8, cover: 'https://cdn.myanimelist.net/images/anime/1388/157902l.jpg', tags: ['School', 'Action'] },
  { title: '炎炎消防队 S3', date: '2025-04', type: 'TV', status: '完结', score: 8.1, cover: 'https://cdn.myanimelist.net/images/anime/1664/103275l.jpg', tags: ['Action', 'Sci-Fi'] },
  { title: '间谍过家家 S3', date: '2025-04', type: 'TV', status: '放送中', score: 8.6, cover: 'https://cdn.myanimelist.net/images/anime/1017/118660l.jpg', tags: ['Comedy', 'Slice of Life'] },
  { title: '黑执事 绿之魔女篇', date: '2025-04', type: 'TV', status: '完结', score: 8.0, cover: 'https://cdn.myanimelist.net/images/anime/1583/108598l.jpg', tags: ['Mystery', 'Fantasy'] },
  { title: '紫罗兰永恒花园 新作', date: '2025-04', type: 'Movie', status: '上映中', score: 9.5, cover: 'https://cdn.myanimelist.net/images/anime/1512/131119l.jpg', tags: ['Drama', 'Romance'] },

  // ===== 2025 Q3 =====
  { title: '咒术回战 S3', date: '2025-07', type: 'TV', status: '放送中', score: 8.9, cover: 'https://cdn.myanimelist.net/images/anime/1597/135997l.jpg', tags: ['Action', 'Dark'] },
  { title: '无职转生 S3', date: '2025-07', type: 'TV', status: '放送中', score: 8.7, cover: 'https://cdn.myanimelist.net/images/anime/1729/155794l.jpg', tags: ['Fantasy', 'Adventure'] },
  { title: '更衣人偶 S2', date: '2025-07', type: 'TV', status: '未开播', score: 8.3, cover: 'https://cdn.myanimelist.net/images/anime/1453/158312l.jpg', tags: ['Romance', 'Comedy'] },
  { title: '孤独摇滚 S2', date: '2025-07', type: 'TV', status: '未开播', score: 9.0, cover: 'https://cdn.myanimelist.net/images/anime/1448/127514l.jpg', tags: ['Music', 'Comedy'] },
  { title: 'Re:从零开始 S3', date: '2025-07', type: 'TV', status: '未开播', score: 8.8, cover: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg', tags: ['Fantasy', 'Suspense'] },

  // ===== 2025 Q4 =====
  { title: '电锯人 S2', date: '2025-10', type: 'TV', status: '未开播', score: 8.6, cover: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg', tags: ['Action', 'Dark'] },
  { title: '来自深渊 S3', date: '2025-10', type: 'TV', status: '未开播', score: 9.1, cover: 'https://cdn.myanimelist.net/images/anime/1282/156838l.jpg', tags: ['Adventure', 'Dark'] },
  { title: '约定的梦幻岛 重制', date: '2025-10', type: 'TV', status: '未开播', score: 8.5, cover: 'https://cdn.myanimelist.net/images/anime/1053/144969l.jpg', tags: ['Suspense', 'Dark'] },
  { title: '钻石王牌 act III', date: '2025-10', type: 'TV', status: '未开播', score: 8.4, cover: 'https://cdn.myanimelist.net/images/anime/1993/93837l.jpg', tags: ['Sports', 'School'] },

  // ===== 2026 Q1 =====
  { title: '进击的巨人 完结篇', date: '2026-01', type: 'Movie', status: '未开播', score: 9.7, cover: 'https://cdn.myanimelist.net/images/anime/1948/120625l.jpg', tags: ['Action', 'Dark'] },
  { title: '魔女宅急便 新作', date: '2026-01', type: 'Movie', status: '未开播', score: 8.8, cover: null, tags: ['Fantasy', 'Adventure'] },
  { title: '魔法少女小圆 新作', date: '2026-01', type: 'Movie', status: '未开播', score: 9.3, cover: 'https://cdn.myanimelist.net/images/anime/1269/141123l.jpg', tags: ['Magic', 'Dark'] },
  { title: 'Fate/strange Fake', date: '2026-01', type: 'TV', status: '未开播', score: 8.9, cover: 'https://cdn.myanimelist.net/images/anime/1887/117644l.jpg', tags: ['Action', 'Fantasy'] },

  // ===== 2026 Q2 =====
  { title: '一拳超人 S3', date: '2026-04', type: 'TV', status: '未开播', score: 9.0, cover: 'https://cdn.myanimelist.net/images/anime/1132/111619l.jpg', tags: ['Action', 'Comedy'] },
  { title: '我的英雄学院 最终章', date: '2026-04', type: 'TV', status: '未开播', score: 7.5, cover: 'https://cdn.myanimelist.net/images/anime/1991/151586l.jpg', tags: ['Action', 'School'] },
  { title: '天国大魔境 S2', date: '2026-04', type: 'TV', status: '未开播', score: 8.5, cover: 'https://cdn.myanimelist.net/images/anime/1121/133132l.jpg', tags: ['Sci-Fi', 'Suspense'] },
  { title: '魔法使之夜', date: '2026-04', type: 'Movie', status: '未开播', score: 9.2, cover: null, tags: ['Fantasy', 'Type-Moon'] },

  // ===== 2026 Q3 =====
  { title: '海贼王 最终章', date: '2026-07', type: 'TV', status: '未开播', score: 9.5, cover: null, tags: ['Adventure', 'Action'] },
  { title: '死神 千年血战篇 终', date: '2026-07', type: 'TV', status: '未开播', score: 9.0, cover: 'https://cdn.myanimelist.net/images/anime/1893/136173l.jpg', tags: ['Action', 'Fantasy'] },
  { title: '新世纪福音战士 终', date: '2026-07', type: 'Movie', status: '未开播', score: 9.8, cover: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg', tags: ['Sci-Fi', 'Mecha'] },

  // ===== 2026 Q4 =====
  { title: '赛博朋克 边缘行者 S2', date: '2026-10', type: 'TV', status: '未开播', score: 9.1, cover: 'https://cdn.myanimelist.net/images/anime/1947/123386l.jpg', tags: ['Sci-Fi', 'Cyberpunk'] },
  { title: '不灭的你 S3', date: '2026-10', type: 'TV', status: '未开播', score: 8.6, cover: 'https://cdn.myanimelist.net/images/anime/1544/124684l.jpg', tags: ['Fantasy', 'Drama'] },
  { title: '剑风传奇 重制', date: '2026-10', type: 'TV', status: '未开播', score: 9.4, cover: null, tags: ['Dark', 'Fantasy'] },

  // ===== 未来 =====
  { title: '命运石之门 重制', date: '2027-01', type: 'TV', status: '未开播', score: 9.6, cover: null, tags: ['Sci-Fi', 'Suspense'] },
  { title: '全职猎人 续篇', date: '2027-01', type: 'TV', status: '未开播', score: 9.3, cover: null, tags: ['Adventure', 'Action'] },
];

const TIMELINE_NODES = [
  { date: '2025.01', label: 'Q1', time: '2025-01' },
  { date: '2025.04', label: 'Q2', time: '2025-04' },
  { date: '2025.07', label: 'Q3', time: '2025-07' },
  { date: '2025.10', label: 'Q4', time: '2025-10' },
  { date: '2026.01', label: 'Q1', time: '2026-01' },
  { date: '2026.04', label: 'Q2', time: '2026-04' },
  { date: '2026.07', label: 'Q3', time: '2026-07' },
  { date: '2026.10', label: 'Q4', time: '2026-10' },
  { date: '2027+', label: '未来', time: '2027-01' },
];
