import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './RoutingIntro.css';

function RoutingIntro() {
  return (
    <div className="doc-page">
      <h1>React Router 简介</h1>
      <p className="doc-description">
        React Router 是 React 生态中最流行的路由库，它让你能够构建单页面应用（SPA），
        在不刷新页面的情况下切换不同的视图。
      </p>

      <section className="doc-section">
        <h2>1. 什么是路由？</h2>
        <p>
          路由是指根据 URL 路径决定显示哪个组件或页面。在传统的多页面应用中，
          每次 URL 变化都会向服务器请求新的页面。而在单页面应用（SPA）中，
          路由只在客户端进行切换，速度更快，用户体验更好。
        </p>
        <div className="key-concept">
          <strong>🎯 核心概念：</strong>
          React Router 监听浏览器 URL 的变化，根据路由配置匹配对应的组件并渲染。
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 安装 React Router</h2>
        <CodeBlock
          code={`npm install react-router-dom`}
          title="安装路由库"
        />
        <p>
          React Router 提供了多个版本：
        </p>
        <ul>
          <li><strong>react-router-dom</strong>：用于浏览器环境（Web 应用）</li>
          <li><strong>react-router-native</strong>：用于 React Native 应用</li>
          <li><strong>react-router</strong>：核心包</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>3. 核心组件</h2>
        <p>
          React Router 提供了几个核心组件：
        </p>

        <div className="component-list">
          <div className="component-item">
            <h4>&lt;BrowserRouter&gt;</h4>
            <p>
              路由器的容器组件，使用 HTML5 的 History API 来保持 UI 与 URL 同步。
            </p>
          </div>
          <div className="component-item">
            <h4>&lt;Routes&gt; 和 &lt;Route&gt;</h4>
            <p>
              用于定义路由规则，匹配 URL 并渲染对应的组件。
            </p>
          </div>
          <div className="component-item">
            <h4>&lt;Link&gt;</h4>
            <p>
              创建导航链接，不会导致页面刷新。
            </p>
          </div>
          <div className="component-item">
            <h4>&lt;NavLink&gt;</h4>
            <p>
              类似于 Link，但可以知道当前是否处于激活状态。
            </p>
          </div>
          <div className="component-item">
            <h4>&lt;Outlet&gt;</h4>
            <p>
              用于嵌套路由中渲染子路由的内容。
            </p>
          </div>
          <div className="component-item">
            <h4>&lt;Navigate&gt;</h4>
            <p>
              用于编程式导航，重定向到其他路由。
            </p>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>4. 第一个路由示例</h2>
        <CodeBlock
          code={`import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link> | <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;`}
          title="基础路由配置"
          description="最简单的路由配置示例"
        />
        <div className="info-box">
          <strong>💡 提示：</strong>
          推荐将 <code>BrowserRouter</code> 放在应用的根组件中，通常是在 <code>main.tsx</code> 或 <code>App.tsx</code> 中。
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 工作原理</h2>
        <div className="flow-diagram">
          <div className="flow-step">
            <span className="step-number">1</span>
            <span className="step-text">用户点击 <code>&lt;Link&gt;</code> 或浏览器地址栏输入 URL</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">2</span>
            <span className="step-text">React Router 捕获 URL 变化</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">3</span>
            <span className="step-text">遍历 Routes 配置，找到匹配的 Route</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">4</span>
            <span className="step-text">卸载旧组件，渲染新组件</span>
          </div>
        </div>
      </section>

      <div className="doc-nav">
        <Link to="/docs/routing/basic" className="next-btn">
          → 下一节：基础路由配置
        </Link>
      </div>
    </div>
  );
}

export default RoutingIntro;
