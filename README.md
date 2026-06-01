# 🍃 开元导航站

> ACG 二次元资源聚合导航 —— 为 ACG 爱好者而生

一个简洁清新的静态导航网站，收录了 100+ ACG 优质站点，涵盖动漫观看、漫画阅读、游戏天地、轻小说、音乐电台、壁纸美图、实用工具、社区论坛等分类。

---

## ✨ 特点

- 🎨 **小清新设计**：薄荷绿 + 天空蓝配色，卡片式布局
- 🔍 **实时搜索**：输入关键词即时过滤站点
- 📱 **响应式布局**：电脑 / 平板 / 手机都能看
- ⚡ **纯静态**：无需服务器，无需数据库，零依赖
- 🛠️ **易于维护**：网站数据集中在 `data/sites.js`，修改方便

---

## 🚀 快速开始

### 本地预览

直接用浏览器打开 `index.html` 即可！

### 部署到 GitHub Pages（免费）

#### 第 1 步：注册 GitHub 账号

访问 [github.com](https://github.com) 注册一个免费账号。

#### 第 2 步：创建仓库

1. 登录后点击右上角 `+` → `New repository`
2. **仓库名称**必须填：`你的用户名.github.io`
   - 比如你的用户名是 `xiaoming`，就填 `xiaoming.github.io`
3. 选择 `Public`（公开）
4. 点击 `Create repository`

#### 第 3 步：上传文件

有两种方式，选一种即可：

**方式 A：网页直接上传（最简单）**
1. 在仓库页面点击 `uploading an existing file`
2. 把本项目所有文件和文件夹拖进去
3. 点击 `Commit changes`

**方式 B：用 Git 命令（推荐，方便更新）**
```bash
# 在项目目录下打开终端，依次输入：
git init
git add .
git commit -m "开元导航站上线"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

#### 第 4 步：访问网站

等待 1-2 分钟后，浏览器打开 `https://你的用户名.github.io`

🎉 你的导航站就上线了！

---

## 📝 如何添加/修改站点

打开 `data/sites.js` 文件，按照格式增删即可：

```javascript
{
  id: 'anime',           // 分类ID（唯一，英文）
  name: '动漫观看',       // 分类名称
  icon: '📺',            // 分类图标（Emoji）
  desc: '在线追番',       // 分类描述
  color: '#7EC8A6',      // 主题色
  sites: [
    {
      name: '网站名称',         // 必填
      url: 'https://xxx.com',  // 必填
      desc: '简短描述',         // 选填
      icon: '🔗'               // 选填（Emoji图标）
    },
    // ... 更多站点
  ]
}
```

---

## 🎨 自定义配色

打开 `css/style.css`，修改开头的 CSS 变量即可换主题：

```css
:root {
  --primary: #7EC8A6;       /* 主色 */
  --bg: #FBF8F4;            /* 背景色 */
  /* ...更多变量见文件头部 */
}
```

---

## 📂 项目结构

```
wasted/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── main.js         # 交互逻辑
├── data/
│   └── sites.js        # 站点数据（改这个加链接）
└── README.md           # 本文件
```

---

## 📄 许可

MIT License · 自由使用，欢迎修改分享~
