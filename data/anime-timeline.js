/* ==========================================
   神秘实验室 — 动漫开播时间档案馆 数据源
   按月份添加即可自动更新时间轴
   ========================================== */

const TIMELINE_DATA = [
  // ===== 2025 Q1 (1-3月) =====
  { title: '葬送的芙莉莲 S2', cover: 'https://picsum.photos/seed/frieren2/300/420', date: '2025-01', type: 'TV动画', tags: ['奇幻', '冒险'] },
  { title: '药屋少女的呢喃 S2', cover: 'https://picsum.photos/seed/apothecary2/300/420', date: '2025-01', type: 'TV动画', tags: ['悬疑', '宫廷'] },
  { title: '我推的孩子 S3', cover: 'https://picsum.photos/seed/oshinoko3/300/420', date: '2025-01', type: 'TV动画', tags: ['偶像', '悬疑'] },
  { title: '坂本日常', cover: 'https://picsum.photos/seed/sakamoto/300/420', date: '2025-01', type: 'TV动画', tags: ['搞笑', '战斗'] },
  { title: '全修。', cover: 'https://picsum.photos/seed/zenshu/300/420', date: '2025-01', type: 'TV动画', tags: ['奇幻', '原创'] },
  { title: '地狱乐 S2', cover: 'https://picsum.photos/seed/jigokuraku2/300/420', date: '2025-01', type: 'TV动画', tags: ['战斗', '黑暗'] },

  // ===== 2025 Q2 (4-6月) =====
  { title: '怪兽8号 S2', cover: 'https://picsum.photos/seed/kaiju8-2/300/420', date: '2025-04', type: 'TV动画', tags: ['战斗', '科幻'] },
  { title: '鬼灭之刃 无限城篇', cover: 'https://picsum.photos/seed/demonslayer-arc/300/420', date: '2025-04', type: '剧场版', tags: ['战斗', '热血'] },
  { title: '防风铃 S2', cover: 'https://picsum.photos/seed/windbreaker2/300/420', date: '2025-04', type: 'TV动画', tags: ['校园', '战斗'] },
  { title: '炎炎消防队 S3', cover: 'https://picsum.photos/seed/fireforce3/300/420', date: '2025-04', type: 'TV动画', tags: ['战斗', '科幻'] },
  { title: '间谍过家家 S3', cover: 'https://picsum.photos/seed/spyfamily3/300/420', date: '2025-04', type: 'TV动画', tags: ['搞笑', '日常'] },
  { title: '黑执事 绿之魔女篇', cover: 'https://picsum.photos/seed/kuroshitsuji/300/420', date: '2025-04', type: 'TV动画', tags: ['悬疑', '奇幻'] },
  { title: '紫罗兰永恒花园 新作', cover: 'https://picsum.photos/seed/violet-new/300/420', date: '2025-04', type: '剧场版', tags: ['治愈', '催泪'] },

  // ===== 2025 Q3 (7-9月) =====
  { title: '咒术回战 S3', cover: 'https://picsum.photos/seed/jujutsu3/300/420', date: '2025-07', type: 'TV动画', tags: ['战斗', '黑暗'] },
  { title: '无职转生 S3', cover: 'https://picsum.photos/seed/mushoku3/300/420', date: '2025-07', type: 'TV动画', tags: ['奇幻', '冒险'] },
  { title: '更衣人偶 S2', cover: 'https://picsum.photos/seed/dressup2/300/420', date: '2025-07', type: 'TV动画', tags: ['恋爱', '日常'] },
  { title: '孤独摇滚 S2', cover: 'https://picsum.photos/seed/bocchi2/300/420', date: '2025-07', type: 'TV动画', tags: ['音乐', '搞笑'] },
  { title: 'Re:从零开始 S3', cover: 'https://picsum.photos/seed/rezero3/300/420', date: '2025-07', type: 'TV动画', tags: ['奇幻', '悬疑'] },

  // ===== 2025 Q4 (10-12月) =====
  { title: '电锯人 S2', cover: 'https://picsum.photos/seed/chainsaw2/300/420', date: '2025-10', type: 'TV动画', tags: ['战斗', '黑暗'] },
  { title: '来自深渊 S3', cover: 'https://picsum.photos/seed/abyss3/300/420', date: '2025-10', type: 'TV动画', tags: ['冒险', '黑暗'] },
  { title: '约定的梦幻岛 重制', cover: 'https://picsum.photos/seed/neverland-remake/300/420', date: '2025-10', type: 'TV动画', tags: ['悬疑', '黑暗'] },
  { title: '钻石王牌 act III', cover: 'https://picsum.photos/seed/diamond-ace3/300/420', date: '2025-10', type: 'TV动画', tags: ['运动', '热血'] },

  // ===== 2026 Q1 (1-3月) =====
  { title: '进击的巨人 完结篇', cover: 'https://picsum.photos/seed/aot-final/300/420', date: '2026-01', type: '剧场版', tags: ['战斗', '黑暗'] },
  { title: '魔女宅急便 新作', cover: 'https://picsum.photos/seed/kiki-new/300/420', date: '2026-01', type: '剧场版', tags: ['奇幻', '治愈'] },
  { title: '魔法少女小圆 新作', cover: 'https://picsum.photos/seed/madoka-new/300/420', date: '2026-01', type: '剧场版', tags: ['魔法', '黑暗'] },
  { title: 'Fate/strange Fake', cover: 'https://picsum.photos/seed/fate-sf/300/420', date: '2026-01', type: 'TV动画', tags: ['战斗', '奇幻'] },

  // ===== 2026 Q2 (4-6月) =====
  { title: '一拳超人 S3', cover: 'https://picsum.photos/seed/opm3/300/420', date: '2026-04', type: 'TV动画', tags: ['战斗', '搞笑'] },
  { title: '我的英雄学院 最终章', cover: 'https://picsum.photos/seed/mha-final/300/420', date: '2026-04', type: 'TV动画', tags: ['热血', '战斗'] },
  { title: '天国大魔境 S2', cover: 'https://picsum.photos/seed/tengoku2/300/420', date: '2026-04', type: 'TV动画', tags: ['科幻', '悬疑'] },
  { title: '魔法使之夜', cover: 'https://picsum.photos/seed/mahoyo/300/420', date: '2026-04', type: '剧场版', tags: ['奇幻', 'Type-Moon'] },

  // ===== 2026 Q3 (7-9月) =====
  { title: '海贼王 最终章', cover: 'https://picsum.photos/seed/onepiece-final/300/420', date: '2026-07', type: 'TV动画', tags: ['冒险', '热血'] },
  { title: '死神 千年血战篇 终', cover: 'https://picsum.photos/seed/bleach-final/300/420', date: '2026-07', type: 'TV动画', tags: ['战斗', '热血'] },
  { title: '新世纪福音战士 终', cover: 'https://picsum.photos/seed/eva-shin/300/420', date: '2026-07', type: '剧场版', tags: ['科幻', '机战'] },

  // ===== 2026 Q4 (10-12月) =====
  { title: '赛博朋克 边缘行者 S2', cover: 'https://picsum.photos/seed/edgerunners2/300/420', date: '2026-10', type: 'TV动画', tags: ['科幻', '赛博朋克'] },
  { title: '不灭的你 S3', cover: 'https://picsum.photos/seed/fumetsu3/300/420', date: '2026-10', type: 'TV动画', tags: ['奇幻', '治愈'] },
  { title: '剑风传奇 重制', cover: 'https://picsum.photos/seed/berserk-remake/300/420', date: '2026-10', type: 'TV动画', tags: ['黑暗', '奇幻'] },

  // ===== 未来档期 =====
  { title: '命运石之门 重制', cover: 'https://picsum.photos/seed/steins-remake/300/420', date: '2027-01', type: 'TV动画', tags: ['科幻', '悬疑'] },
  { title: '全职猎人 续篇', cover: 'https://picsum.photos/seed/hxh-cont/300/420', date: '2027-01', type: 'TV动画', tags: ['冒险', '战斗'] },
];

/* 时间轴节点定义 */
const TIMELINE_NODES = [
  { date: '2025.01', label: '2025 Q1', time: '2025-01' },
  { date: '2025.04', label: '2025 Q2', time: '2025-04' },
  { date: '2025.07', label: '2025 Q3', time: '2025-07' },
  { date: '2025.10', label: '2025 Q4', time: '2025-10' },
  { date: '2026.01', label: '2026 Q1', time: '2026-01' },
  { date: '2026.04', label: '2026 Q2', time: '2026-04' },
  { date: '2026.07', label: '2026 Q3', time: '2026-07' },
  { date: '2026.10', label: '2026 Q4', time: '2026-10' },
  { date: '2027+', label: '未来', time: '2027-01' },
];
