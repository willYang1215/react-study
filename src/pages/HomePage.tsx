import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1>📚 React 学习指南</h1>
          <p className="subtitle">
            从零开始学习 React，通过系统性的教程和实践项目，掌握现代前端开发技能
          </p>
          <div className="header-actions">
            <Link to="/docs/getting-started/project-setup" className="primary-btn">
              开始学习
            </Link>
            <Link to="/docs/getting-started/project-setup" className="secondary-btn">
              查看文档
            </Link>
          </div>
        </div>
      </header>

      <section className="features">
        <h2>学习内容</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>快速入门</h3>
            <p>从项目初始化到第一个组件，快速掌握 React 基础知识</p>
            <Link to="/docs/getting-started/project-setup">开始学习 →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔀</div>
            <h3>路由配置</h3>
            <p>学习 React Router，实现单页面应用的页面导航</p>
            <Link to="/docs/routing/intro">开始学习 →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>状态管理</h3>
            <p>掌握 Redux 进行全局状态管理，实现用户认证等功能</p>
            <Link to="/docs/state-management/redux-intro">开始学习 →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🪝</div>
            <h3>Hooks 进阶</h3>
            <p>深入理解 useState、useMemo、useReducer 等 Hooks</p>
            <Link to="/docs/hooks/useState">开始学习 →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>项目实战</h3>
            <p>通过实际项目巩固所学知识，构建完整功能模块</p>
            <Link to="/docs/hooks/useState">开始学习 →</Link>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>工具配置</h3>
            <p>学习 Vite、TypeScript、ESLint 等现代开发工具</p>
            <Link to="/docs/getting-started/project-setup">开始学习 →</Link>
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2>为什么选择这个教程？</h2>
        <div className="why-grid">
          <div className="why-item">
            <h4>📖 系统性</h4>
            <p>从基础到进阶，按知识体系循序渐进，每个章节都建立在前一章节的基础上</p>
          </div>
          <div className="why-item">
            <h4>💡 实践导向</h4>
            <p>每个概念都配有可运行的代码示例，边学边练，加深理解</p>
          </div>
          <div className="why-item">
            <h4>🎯 重点突出</h4>
            <p>聚焦实际开发中最常用的功能和最佳实践，避免不必要的深入</p>
          </div>
          <div className="why-item">
            <h4>🔄 持续更新</h4>
            <p>根据 React 最新版本和社区最佳实践，持续更新内容</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>准备好开始了吗？</h2>
        <p>让我们一起开启 React 学习之旅！</p>
        <Link to="/docs/getting-started/project-setup" className="cta-btn">
          立即开始 →
        </Link>
      </section>

      <footer className="home-footer">
        <p>
          基于 <a href="https://zh-hans.react.dev" target="_blank" rel="noopener noreferrer">React 官方文档</a> 和社区最佳实践构建
        </p>
        <p>旨在帮助更多开发者学习 React</p>
      </footer>
    </div>
  );
}

export default HomePage;
