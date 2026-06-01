/* ==========================================
   Y的acg导航站 - 收录站点数据库
   格式：每个分类下有 name, icon, sites[]
   可自由增删修改 ~
   ========================================== */

const siteData = [
  {
    id: 'anime',
    name: '动漫观看',
    icon: '📺',
    desc: '在线追番、动画资源',
    color: '#7EC8A6',
    sites: [
      // ===== 正版平台 =====
      { name: 'Bilibili 哔哩哔哩', url: 'https://www.bilibili.com', desc: '国内最大弹幕视频网，正版新番' },
      { name: 'AcFun 弹幕网', url: 'https://www.acfun.cn', desc: '老牌弹幕网站，硬核ACG文化' },
      { name: '巴哈姆特动画疯', url: 'https://ani.gamer.com.tw', desc: '台湾正版授权动画平台' },
      { name: 'Niconico', url: 'https://www.nicovideo.jp', desc: '日本弹幕鼻祖，生肉番剧' },

      // ===== 老牌综合动漫站 =====
      { name: 'AGE 动漫', url: 'https://www.agemys.org', desc: '纯净无广告，多线路高清' },
      { name: '樱花动漫', url: 'https://www.yhdm.tv', desc: '老牌霸主，资源最全' },
      { name: '风车动漫', url: 'https://www.dm530w.com', desc: '4K画质，弹幕+倍速+投屏' },
      { name: 'Omofun 动漫', url: 'https://www.omofun.com', desc: '移动端体验最佳，弹幕活跃' },
      { name: 'ZzzFun 动漫', url: 'https://www.zzzfun.com', desc: '老牌无广告动漫平台' },
      { name: '嘶哩嘶哩', url: 'https://www.silisili.in', desc: '独立弹幕动漫视频网' },
      { name: 'MX动漫', url: 'https://www.mxdm9.com', desc: '在线动漫观看，更新快' },
      { name: 'NT动漫', url: 'https://www.ntdm9.com', desc: '番剧资源聚合，分类清晰' },
      { name: '妮可动漫', url: 'https://www.nicotv.me', desc: '界面简洁，老番搜索强' },
      { name: '稀饭动漫', url: 'https://www.xfani.com', desc: '高清动漫在线观看' },

      // ===== 高品质追番站 =====
      { name: 'CLICLI 动漫', url: 'https://clicli.cc', desc: '高颜值无广告，4K资源多' },
      { name: '哈哩哈哩', url: 'https://www.halihali.tv', desc: '独立弹幕网，无广告' },
      { name: '风铃动漫', url: 'https://www.aafun.cc', desc: '画质优秀，界面清新' },
      { name: '番茶屋', url: 'https://www.fanchawu.cc', desc: '追番体验好，更新及时' },
      { name: '嗷呜动漫', url: 'https://www.aowu.tv', desc: '高清无广告动漫站' },
      { name: '蜜桃动漫', url: 'https://www.mitaodm.com', desc: '可爱风界面，女生用户多' },
      { name: 'NyaFun 动漫', url: 'https://www.nyafun.net', desc: '界面漂亮，资源丰富' },
      { name: 'Mifun 动漫', url: 'https://www.mifun.cc', desc: '剧场版/OVA特别全' },
      { name: '喵物次元', url: 'https://www.mwcy.net', desc: '2025新锐动漫站' },

      // ===== 特色资源站 =====
      { name: '囧次元', url: 'https://www.jiongecy.com', desc: '剧场版OVA收藏级' },
      { name: '熔岩番剧库', url: 'https://www.rongyanfj.com', desc: '番剧资源收藏向' },
      { name: '次元城动漫', url: 'https://www.cycdm.com', desc: '社区感强的动漫站' },
      { name: '漫岛动漫', url: 'https://www.mandaodm.com', desc: '动漫资源丰富' },
      { name: '嘀哩嘀哩', url: 'https://www.dilitv.com', desc: '弹幕氛围浓，社区活跃' },
      { name: '咕咕番', url: 'https://www.gugufan.com', desc: '追番体验流畅' },
      { name: '花子动漫', url: 'https://www.huazidm.com', desc: '生肉先行版较多' },
      { name: '异次元动漫', url: 'https://www.ycydm.com', desc: '2025新锐动漫站' },
      { name: '二矿动漫', url: 'https://www.2kuang.com', desc: '主打2K高清画质' },
      { name: '萌番', url: 'https://www.mfan.tv', desc: '萌萌的追番网站' },

      // ===== 老番/下载/字幕 =====
      { name: 'Anime1', url: 'https://anime1.me', desc: '全球最快生肉站，追番首选' },
      { name: '动漫花园', url: 'https://dmhy.org', desc: '动画BT下载资源站' },
      { name: '蜜柑计划', url: 'https://mikanani.me', desc: '新番BT订阅+下载' },
      { name: '天使动漫', url: 'https://www.tsdm39.com', desc: '动漫音乐+高清资源下载' },
      { name: '樱之空动漫', url: 'https://www.sakurakosora.com', desc: '资源覆盖广，更新快' },
      { name: '漫猫动漫', url: 'https://www.comicat.org', desc: 'BT下载+在线观看' },
      { name: '爱恋动漫', url: 'https://www.kisssub.org', desc: 'BT下载+字幕组聚合' },
      { name: 'XDM 动漫', url: 'https://www.xdman.com', desc: '在线+下载双模式' },
    ]
  },
  {
    id: 'comic',
    name: '漫画阅读',
    icon: '📚',
    desc: '漫画在线 & 条漫平台',
    color: '#87CEEB',
    sites: [
      { name: 'Bilibili 漫画', url: 'https://manga.bilibili.com', desc: 'B站正版漫画' },
      { name: '腾讯动漫', url: 'https://ac.qq.com', desc: '腾讯正版漫画平台' },
      { name: '快看漫画', url: 'https://www.kuaikanmanhua.com', desc: '超多国漫作品' },
      { name: '动漫之家', url: 'https://www.dmzj.com', desc: '老牌漫画阅读社区' },
      { name: '漫画柜', url: 'https://www.manhuagui.com', desc: '海量日漫资源' },
      { name: '极速漫画', url: 'https://www.1kkk.com', desc: '极速加载漫画站' },
      { name: '古风漫画', url: 'https://www.gufengmh8.com', desc: '古风漫画专注' },
      { name: 'Coco漫画', url: 'https://www.cocomanhua.com', desc: '在线看漫画' },
      { name: '包子漫画', url: 'https://www.baozimh.com', desc: '免费在线漫画' },
      { name: '拷贝漫画', url: 'https://www.copymanga.site', desc: '漫画在线阅读' },
    ]
  },
  {
    id: 'game',
    name: '游戏天地',
    icon: '🎮',
    desc: '二次元游戏 & 资讯',
    color: '#FFB7C5',
    sites: [
      { name: 'TapTap', url: 'https://www.taptap.cn', desc: '发现好游戏' },
      { name: '米游社', url: 'https://www.miyoushe.com', desc: '米哈游玩家社区' },
      { name: 'NGA 玩家社区', url: 'https://bbs.nga.cn', desc: '精英玩家俱乐部' },
      { name: 'bigfun', url: 'https://www.bigfun.cn', desc: '二次元游戏社区' },
      { name: 'Steam', url: 'https://store.steampowered.com', desc: '全球最大游戏平台' },
      { name: '小黑盒', url: 'https://www.xiaoheihe.cn', desc: '游戏数据 & 社区' },
      { name: '游民星空', url: 'https://www.gamersky.com', desc: '单机游戏资讯' },
      { name: '3DM 游戏网', url: 'https://www.3dmgame.com', desc: '游戏攻略 & 补丁' },
      { name: 'VNDB', url: 'https://vndb.org', desc: '视觉小说数据库' },
      { name: '2DFan', url: 'https://www.2dfan.com', desc: 'GalGame 资料库' },
    ]
  },
  {
    id: 'novel',
    name: '轻小说',
    icon: '📖',
    desc: '日轻 & 网文阅读',
    color: '#F0C78E',
    sites: [
      { name: '轻之国度', url: 'https://www.lightnovel.us', desc: '老牌轻小说论坛' },
      { name: 'ESJ Zone', url: 'https://www.esjzone.cc', desc: '日轻翻译阅读' },
      { name: '成为小说家吧', url: 'https://syosetu.com', desc: '日本最大网文站' },
      { name: 'SF 轻小说', url: 'https://book.sfacg.com', desc: '原创轻小说平台' },
      { name: '轻小说文库', url: 'https://www.wenku8.net', desc: '轻小说在线阅读' },
      { name: '真白萌', url: 'https://masiro.me', desc: 'Web 日轻翻译' },
      { name: '哔哩轻小说', url: 'https://www.bilinovel.com', desc: '轻小说在线看' },
      { name: 'Kakuyomu', url: 'https://kakuyomu.jp', desc: '角川旗下小说站' },
    ]
  },
  {
    id: 'music',
    name: '音乐电台',
    icon: '🎵',
    desc: 'ACG音乐 & 音声',
    color: '#B8A9D4',
    sites: [
      { name: '网易云音乐', url: 'https://music.163.com', desc: '发现 ACG 好音乐' },
      { name: 'QQ音乐', url: 'https://y.qq.com', desc: '腾讯旗下音乐平台' },
      { name: 'Mikufans', url: 'https://www.mikufans.cn', desc: 'VOCALOID 音乐' },
      { name: 'HimeHina', url: 'https://himehina.com', desc: '虚拟偶像音乐' },
      { name: 'VocaDB', url: 'https://vocadb.net', desc: 'VOCALOID 数据库' },
      { name: 'Niconico', url: 'https://www.nicovideo.jp', desc: 'VOCALOID & ACG音乐圣地' },
      { name: 'SoundCloud', url: 'https://soundcloud.com', desc: '独立音乐人平台' },
      { name: '猫耳FM', url: 'https://www.missevan.com', desc: '广播剧 & 有声漫' },
    ]
  },
  {
    id: 'wallpaper',
    name: '壁纸美图',
    icon: '🖼️',
    desc: '高清壁纸 & 插画',
    color: '#8EC8C8',
    sites: [
      { name: 'Pixiv', url: 'https://www.pixiv.net', desc: '全球最大插画社区' },
      { name: 'Wallhaven', url: 'https://wallhaven.cc', desc: '高清壁纸站' },
      { name: 'Konachan', url: 'https://konachan.net', desc: '动漫壁纸图库' },
      { name: 'Yande.re', url: 'https://yande.re', desc: '高清动漫图库' },
      { name: 'Danbooru', url: 'https://danbooru.donmai.us', desc: '动漫图片数据库' },
      { name: 'Zerochan', url: 'https://www.zerochan.net', desc: '动漫图片分享' },
      { name: '极简壁纸', url: 'https://bz.zzzmh.cn', desc: '简约高清壁纸' },
      { name: 'Wallpaper Abyss', url: 'https://wall.alphacoders.com', desc: '海量高清壁纸' },
    ]
  },
  {
    id: 'tools',
    name: '实用工具',
    icon: '🛠️',
    desc: '以图搜图 & 常用工具',
    color: '#E8A0BF',
    sites: [
      { name: 'SauceNAO', url: 'https://saucenao.com', desc: '二次元以图搜图' },
      { name: 'Ascii2D', url: 'https://ascii2d.net', desc: '二次元图片搜索' },
      { name: 'Trace.moe', url: 'https://trace.moe', desc: '动画截图搜番剧' },
      { name: 'WAIFU2X', url: 'https://waifu2x.udp.jp', desc: '动漫图片放大' },
      { name: 'Bigjpg', url: 'https://bigjpg.com', desc: 'AI 无损放大图片' },
      { name: 'AnimeThemes', url: 'https://animethemes.moe', desc: '动漫 OP/ED 资源' },
      { name: 'CloudConvert', url: 'https://cloudconvert.com', desc: '在线格式转换' },
      { name: 'TinyPNG', url: 'https://tinypng.com', desc: '图片在线压缩' },
      { name: 'DeepL 翻译', url: 'https://www.deepl.com', desc: '高质量翻译工具' },
      { name: 'PDF24', url: 'https://tools.pdf24.org', desc: '免费 PDF 工具集' },
    ]
  },
  {
    id: 'community',
    name: '社区论坛',
    icon: '💬',
    desc: 'ACG 交流 & 讨论',
    color: '#7EC8A6',
    sites: [
      { name: '萌娘百科', url: 'https://zh.moegirl.org.cn', desc: '万物皆可萌的百科全书' },
      { name: 'Bangumi', url: 'https://bgm.tv', desc: '番组计划 & 点格子' },
      { name: 'Stage1st', url: 'https://bbs.saraba1st.com', desc: '动漫游戏论坛' },
      { name: 'V2EX', url: 'https://www.v2ex.com', desc: '技术创意社区' },
      { name: '百度贴吧', url: 'https://tieba.baidu.com', desc: '兴趣主题社区' },
      { name: '半次元', url: 'https://bcy.net', desc: 'ACGN 同好社区' },
      { name: '绯月ScarletMoon', url: 'https://bbs.kfmax.com', desc: 'GalGame 爱好者论坛' },
      { name: '灵梦广场', url: 'https://acg123.net', desc: 'ACG 综合社区' },
      { name: '其乐 Keylol', url: 'https://keylol.com', desc: 'Steam 游戏社区' },
      { name: '二次元狂热', url: 'https://www.2cy.org', desc: 'ACG 综合交流社区' },
      { name: 'ACG17', url: 'https://acg17.com', desc: 'ACG 资讯+社区+资源' },
    ]
  },
  {
    id: 'info',
    name: '资讯情报',
    icon: '📰',
    desc: 'ACG 新闻 & 数据库',
    color: '#87CEEB',
    sites: [
      { name: 'AniTama', url: 'https://www.anitama.cn', desc: '专业动漫媒体' },
      { name: 'ACGdoge', url: 'https://www.acgdoge.net', desc: 'ACG 资讯聚合' },
      { name: 'MyAnimeList', url: 'https://myanimelist.net', desc: '全球动漫数据库' },
      { name: 'AniDB', url: 'https://anidb.net', desc: '动画数据库' },
      { name: '番组计划', url: 'https://bgm.tv/calendar', desc: '新番时间表' },
      { name: '动漫星空', url: 'https://acg.gamersky.com', desc: '动漫资讯频道' },
      { name: '和邪社', url: 'https://www.hexieshe.com', desc: 'ACG 文化观察' },
      { name: '机核网', url: 'https://www.gcores.com', desc: '游戏 & ACG 电台' },
    ]
  },
  {
    id: 'more',
    name: '其他推荐',
    icon: '🌟',
    desc: '更多 ACG 资源',
    color: '#B8A9D4',
    sites: [
      { name: 'ACG.Space', url: 'https://acg.space', desc: 'ACG 全方位导航' },
      { name: 'ACG导航网', url: 'https://www.acg123.net', desc: '二次元网址导航' },
      { name: 'Dilidili', url: 'https://www.dilitv.com', desc: '动漫聚合搜索' },
      { name: '次元剑', url: 'https://ciyuanjian.com', desc: '二次元聚合导航' },
      { name: 'ACG Zone', url: 'https://acgzone.org', desc: 'ACG 综合资源站' },
      { name: 'E-hentai', url: 'https://e-hentai.org', desc: '同人志画廊' },
      { name: 'AnimeShare', url: 'https://animeshare.info', desc: '日韩动漫资源' },
      { name: '萌购', url: 'https://www.030buy.com', desc: '日本代购平台' },
      { name: 'animate 中国', url: 'https://www.animate.cn', desc: '动漫周边商城' },
      { name: 'ACG 社区', url: 'https://www.acgsq.com', desc: '二次元爱好者社区' },
    ]
  }
];
