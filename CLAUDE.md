# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 语言规则

**重要：在此项目中工作时，请始终使用中文进行回复和思考过程。**

- 所有回复都应使用中文
- 思考过程应该用中文进行
- 代码注释和文档应使用中文
- 错误信息和提示也应该用中文

## 项目概述

这是一个基于 Vue 3 + Vite 的网页应用程序，提供一系列实用工具，包括 PDF 处理、颜色转换和 JSON 格式化。应用程序使用 TailwindCSS 进行样式设计，使用 Vue Router 进行导航。

## 开发命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建

## 架构

### 核心技术
- **Vue 3** 使用组合式 API（`<script setup>` 语法）
- **Vite** 作为构建工具和开发服务器
- **TailwindCSS v4** 用于样式（使用新的 @tailwindcss/vite 插件）
- **Vue Router** 用于客户端路由
- **pdf-lib** 用于 PDF 操作
- **tinycolor2** 用于颜色转换

### 项目结构
```
src/
├── main.js              # 应用入口点
├── App.vue              # 根组件（仅包含 router-view）
├── router/index.js      # Vue Router 配置
├── components/
│   └── ToolGrid.vue     # 主页工具网格布局
└── views/
    ├── PrintFax.vue     # PDF 合并工具（将 4 个 PDF 合并到 1 个 A4 页面）
    ├── ColorConverter.vue # 颜色格式转换器（HEX/RGB/HSL）
    └── JsonTools/
        └── index.vue    # JSON 格式化器/压缩器
```

### 主要功能
1. **PDF 合并工具** (`/print-fax`)：接受确切的 4 个 PDF 文件，将它们合并到单个 A4 页面的四个象限中
2. **颜色转换器** (`/color-converter`)：在 HEX、RGB 和 HSL 颜色格式之间进行实时转换
3. **JSON 工具** (`/json-tools`)：格式化/压缩 JSON，支持文件上传

### 样式约定
- 广泛使用 TailwindCSS 工具类
- 支持深色模式，使用 `dark:` 前缀
- 响应式设计，使用断点前缀（`sm:`、`lg:`、`xl:`）
- 毛玻璃效果，使用 backdrop-blur 和透明度
- 一致的配色方案：PDF 工具使用蓝色，颜色工具使用紫色，JSON 工具使用绿色

### 组件模式
- 所有组件都使用 Vue 3 组合式 API 和 `<script setup>`
- 使用 `ref()` 和 `reactive()` 管理响应式数据
- 使用标准 HTML 文件输入处理文件
- 一致实现错误状态和加载指示器
- 导航使用带有悬停效果的 `router-link` 组件

## Javascript 使用规范
- 符合前端Airbnb规范
- 函数做什么需添加注释

### 开发注意事项
- 应用程序支持明暗两种主题
- 所有文本内容均为中文
- PDF 操作使用 pdf-lib 进行客户端处理
- 颜色转换使用 tinycolor2 库确保准确性
- 对 PDF 和 JSON 上传实现了文件验证