import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './ProjectSetup.css';

function ProjectSetup() {
  return (
    <div className="doc-page">
      <h1>项目初始化</h1>
      <p className="doc-description">
        本节将介绍如何使用 Vite 构建工具快速搭建 React 项目。Vite 是目前最推荐的 React 构建工具，它具有极速启动、热更新等优点。
      </p>

      <section className="doc-section">
        <h2>1. 安装 Node.js</h2>
        <p>
          在开始之前，确保你的电脑上已经安装了 <strong>Node.js</strong>。推荐使用 LTS 版本。
          你可以通过以下命令检查是否已安装：
        </p>
        <CodeBlock
          code={`# 检查 Node.js 版本
node -v

# 检查 npm 版本
npm -v`}
          title="检查 Node.js 安装"
        />
        <p>
          如果尚未安装，请访问 <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js 官网</a> 下载安装。
        </p>
      </section>

      <section className="doc-section">
        <h2>2. 使用 Vite 创建项目</h2>
        <p>
          Vite 是一个现代化的前端构建工具，它提供了极快的开发服务器启动速度和优化的生产构建。
        </p>
        <CodeBlock
          code={`# 使用 npm 创建 React 项目
npm create vite@latest my-react-app -- --template react-ts

# 进入项目目录
cd my-react-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev`}
          title="创建 Vite React 项目"
        />
        <div className="info-box">
          <strong>💡 提示：</strong> 
          使用 <code>--template react-ts</code> 参数可以创建 TypeScript 模板。
          如果你不需要 TypeScript，可以使用 <code>react</code> 代替 <code>react-ts</code>。
        </div>
      </section>

      <section className="doc-section">
        <h2>3. 项目目录结构</h2>
        <p>
          创建完成后，你会看到以下目录结构：
        </p>
        <CodeBlock
          code={`my-react-app/
├── node_modules/    # 项目依赖
├── public/          # 静态资源目录
├── src/             # 源代码目录
│   ├── assets/      # 资源文件
│   ├── components/  # 组件
│   ├── App.tsx      # 主组件
│   ├── main.tsx     # 入口文件
│   └── index.css    # 全局样式
├── index.html       # HTML 模板
├── package.json     # 项目配置
├── tsconfig.json    # TypeScript 配置
└── vite.config.ts   # Vite 配置`}
          title="项目目录结构"
        />
      </section>

      <section className="doc-section">
        <h2>4. 安装常用依赖</h2>
        <p>
          对于一个完整的 React 学习项目，我们还需要安装以下常用库：
        </p>
        <CodeBlock
          code={`# 路由相关
npm install react-router-dom

# 状态管理
npm install @reduxjs/toolkit react-redux

# UI 组件库（可选）
npm install antd

# HTTP 请求
npm install axios`}
          title="安装常用依赖"
        />
      </section>

      <section className="doc-section">
        <h2>5. 启动项目</h2>
        <p>
          安装完依赖后，启动开发服务器：
        </p>
        <CodeBlock
          code={`npm run dev`}
        />
        <p>
          服务器启动后，打开浏览器访问显示的地址（通常是 <code>http://localhost:5173</code>）。
        </p>
      </section>

      <div className="doc-nav">
        <Link to="/docs/getting-started/first-component" className="next-btn">
          → 下一节：第一个组件
        </Link>
      </div>
    </div>
  );
}

export default ProjectSetup;
