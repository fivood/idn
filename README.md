# 贝克街私家侦探档案柜

> *"当你排除了一切不可能的因素，剩下的无论多么难以置信，必然是真相。"*
> — 夏洛克·福尔摩斯

一个融合**推理小说双语阅读**与**挂机增量解密**玩法的网页游戏。

[![Live Demo](https://img.shields.io/badge/在线游玩-Cloudflare_Pages-orange?style=flat-square)](https://idn.pages.dev)
[![Release](https://img.shields.io/github/v/release/fivood/idn?style=flat-square&label=桌面端下载)](https://github.com/fivood/idn/releases/latest)
[![License](https://img.shields.io/badge/license-ISC-blue?style=flat-square)](LICENSE)

---

## 📖 游戏简介

你是贝克街的一名私家侦探。通过升级侦查助手、科学仪器等装备积累**侦查经验值（DI）**，DI 将被用于自动破译一部部推理小说的原文密文段落。

随着解密进展，你可以：

- 📚 **逐页阅读**中英双语对照原典，感受推理大师的原著措辞
- 🧩 **发掘案情线索**，在软木板线索墙上连线推理
- 🕵️ **追踪嫌疑人动态**，根据阅读进度解锁角色信息（严格防剧透）
- ⚖️ **指控幕后真凶**，答对赢取高额 DI 奖励
- 🏛️ **结案归档**，让已破获的案卷产生永久生涯加成

---

## 🗂️ 收录案卷

### 经典悬疑（阿加莎·克里斯蒂）

| 案卷 | 原著 | 章节 | 解锁门槛 |
|---|---|---|---|
| 《无人生还》 | *And Then There Were None* | 18 章 | 0 DI（免费） |

### 霍桑探案集（安东尼·霍洛维兹）

| 案卷 | 原著 | 章节 | 解锁门槛 |
|---|---|---|---|
| 《关键词是谋杀》 | *The Word Is Murder* | 24 章 | 0 DI（免费） |
| 《关键句是死亡》 | *The Sentence Is Death* | 24 章 | 需先结案上一卷 |
| 《一行杀人的台词》 | *A Line to Kill* | 24 章 | 需先结案上一卷 |
| 《一把扭曲的匕首》 | *A Twist of the Knife* | 26 章 | 需先结案上一卷 |

---

## ✨ 功能特性

### 🎮 核心挂机系统
- **自动 DI 积累**：基础 0.005 DI/秒，随升级与案件加成动态提升
- **自动解密**：挂机期间助手自动解锁原文密文段落，离线期间以 1/10 效率继续积累
- **生涯荣誉加成**：每结案一卷，全局 DI 产量 +20%、解密速率 +10%，永久叠加

### 📌 案卷线索墙
- 独立软木板弹窗，支持在主窗口侦查的同时另屏查看线索
- 拍立得照片（嫌疑人）、便利贴（物证）、报纸剪报（关键事件）三种卡片样式
- SVG 红毛线实时连线，随阅读进度动态解锁
- 支持拖拽重排，位置自动保存至本地存档
- **多窗口实时同步**：主窗口解密进展即时反映至线索墙

### 🛡️ 严格防剧透机制
- 嫌疑人卡片仅在阅读到该角色登场段落后才会出现
- 死亡印章仅在阅读到对应遇害情节后才会盖上
- 线索红线仅在读过相关剧情后才会连通

### 📱 全平台适配
- 响应式设计，支持桌面端与移动端
- 移动端阅读区优先置顶显示
- 深色 / 浅色主题切换，并持久化记忆

---

## 🚀 快速开始

### 🌐 在线游玩（推荐）

直接访问：**https://idn.pages.dev**

无需安装，进度保存在浏览器本地存储中。

### 💻 下载桌面端离线版

前往 [GitHub Releases](https://github.com/fivood/idn/releases/latest) 下载对应系统的安装包：

| 系统 | 文件格式 |
|---|---|
| Windows | `.msi` 安装包 |
| macOS | `.dmg` 安装包 |
| Linux | `.AppImage` |

### 🛠️ 本地开发部署

```bash
# 克隆仓库
git clone https://github.com/fivood/idn.git
cd idn

# 安装依赖
npm install

# 启动开发服务器（localhost:5173）
npm run dev

# 构建生产版本
npm run build
```

---

## 🏗️ 项目结构

```
idn/
├── src/
│   ├── App.jsx                  # 核心状态引擎、挂机循环、存档逻辑
│   ├── index.css                # 全局设计系统（CSS 变量、深浅主题）
│   ├── components/
│   │   ├── Library.jsx          # 侦探书房（书架 + 升级面板 + 案卷检视器）
│   │   ├── NovelWorkspace.jsx   # 现场侦查工作区（阅读器 + 嫌疑人 + 线索）
│   │   ├── ClueWallModal.jsx    # 软木板线索墙弹窗
│   │   ├── BookReader.jsx       # 已结案卷双语对照阅读器
│   │   └── Logo.jsx             # 贝克街 Logo 组件
│   └── data/
│       ├── game_data.js         # 小说配置、嫌疑人、线索墙节点数据
│       └── novel_data.json      # 编译好的双语段落数据库（5 部小说）
├── src-tauri/                   # Tauri 桌面端封装配置
├── .github/workflows/
│   └── publish.yml              # GitHub Actions 自动发版工作流
└── parse_all_epubs.cjs          # EPUB 双语段落提取与对齐编译脚本
```

---

## 🔄 自动发版流程

推送版本标签即可触发 GitHub Actions 自动为 Windows / macOS / Linux 三端打包并创建 Release：

```bash
# 更新版本号后推送 tag 即可触发自动打包
git tag v1.0.1
git push origin v1.0.1
```

GitHub Actions 将自动：
1. 在三个平台（`windows-latest` / `macos-latest` / `ubuntu-22.04`）并行编译
2. 调用 `npm run build` 构建前端资产
3. 调用 Tauri 打包对应系统安装包
4. 创建 GitHub Release 并上传所有安装包作为附件

---

## 🗃️ 存档说明

游戏进度自动保存在浏览器的 `localStorage` 中（键名：`detective_console_save`）。

- 每 3 秒自动保存一次
- 切换设备或清除浏览器数据会导致进度丢失
- 可在顶栏点击**"重置档案"**手动清空进度重新开始

---

## 📜 版权说明

本项目为**非商业个人爱好项目**，游戏所用小说文本版权归原著作者所有：

- *And Then There Were None* / 《无人生还》— Agatha Christie（阿加莎·克里斯蒂）
- Hawthorne series / 霍桑探案集 — Anthony Horowitz（安东尼·霍洛维兹）
