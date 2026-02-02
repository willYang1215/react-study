import React from 'react';
import { Link } from 'react-router-dom';
import './DocsIndex.css';

function DocsIndex() {
  const modules = [
    {
      title: '🚀 快速入门',
      description: '学习 React 的基础知识，包括项目搭建、组件创建和 JSX 语法',
      icon: '⚡',
      link: '/docs/getting-started/project-setup',
      items: ['项目初始化', '第一个组件', 'JSX 语法']
    },
    {
      title: '🔀 路由配置',
      description: '掌握 React Router 的使用方法，实现单页面应用的导航',
      icon: '🛣️',
      link: '/docs/routing/intro',
      items: ['React Router 简介', '基础路由配置', '动态路由']
    },
    {
      title: '📦 状态管理',
      description: '学习 Redux 进行全局状态管理，实现用户认证等功能',
      icon: '📊',
      link: '/docs/state-management/redux-intro',
      items: ['Redux 入门', '用户登录实战', 'Store 配置']
    },
    {
      title: '🪝 Hooks 进阶',
      description: '深入理解 React Hooks，包括 useState、useMemo、useReducer 等',
      icon: '🎣',
      link: '/docs/hooks/useState',
      items: ['useState 基础', 'useMemo 性能优化', 'useReducer 复杂状态', 'useCallback 缓存函数']
    },
    {
      title: '💻 项目实战',
      description: '通过实际项目巩固所学知识，构建完整的功能模块',
      icon: '🛠️',
      link: '/docs/practice/login-feature',
      items: ['登录功能实现', '表单处理', '数据请求']
    }
  ];

  return (
    <div className="docs-index">
      <div className="docs-hero">
        <h1>欢迎来到 React 学习指南</h1>
        <p>
          这是一个系统性的 React 学习路径，从基础到进阶，通过实际项目掌握 React 开发技能。
          每个章节都包含详细的讲解和可运行的代码示例。
        </p>
      </div>

      <div className="modules-grid">
        {modules.map((module, index) => (
          <div key={index} className="module-card">
            <div className="module-icon">{module.icon}</div>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
            <ul className="module-topics">
              {module.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <Link to={module.link} className="module-link">
              开始学习 →
            </Link>
          </div>
        ))}
      </div>

      <div className="docs-footer">
        <h3>学习建议</h3>
        <div className="tips">
          <div className="tip">
            <span className="tip-icon">📖</span>
            <div>
              <h4>按顺序学习</h4>
              <p>建议按照目录顺序学习，每个章节都建立在前一章节的基础上。</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">💻</span>
            <div>
              <h4>动手实践</h4>
              <p>每个示例都尝试自己写一遍，实践是最好的学习方式。</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-icon">🔧</span>
            <div>
              <h4>项目驱动</h4>
              <p>学习最终要落实到实际项目中，尝试构建一个完整的应用。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsIndex;
