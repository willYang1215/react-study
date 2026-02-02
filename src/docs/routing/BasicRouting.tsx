import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './BasicRouting.css';

function BasicRouting() {
  return (
    <div className="doc-page">
      <h1>基础路由配置</h1>
      <p className="doc-description">
        本节将详细介绍如何配置基础路由，包括简单路由、嵌套路由和路由参数。
      </p>

      <section className="doc-section">
        <h2>1. 配置入口文件</h2>
        <p>
          首先在入口文件中启用路由功能：
        </p>
        <CodeBlock
          code={`// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);`}
          title="main.tsx"
          description="使用 BrowserRouter 包裹整个应用"
        />
      </section>

      <section className="doc-section">
        <h2>2. 定义路由规则</h2>
        <p>
          在 App 组件中定义路由规则：
        </p>
        <CodeBlock
          code={`// App.tsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LearningPage from './pages/LearningPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      {/* 导航链接 */}
      <nav style={{ padding: '16px', background: '#f6f8fa' }}>
        <Link to="/" style={{ marginRight: '16px' }}>首页</Link>
        <Link to="/login" style={{ marginRight: '16px' }}>登录</Link>
        <Link to="/learning">学习</Link>
      </nav>

      {/* 路由配置 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/learning" element={<LearningPage />} />
        
        {/* 404 页面 - 使用通配符 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;`}
          title="App.tsx"
          description="使用 Routes 和 Route 组件定义路由"
        />
        <div className="info-box">
          <strong>💡 提示：</strong>
          <code>path="*"</code> 会匹配所有未匹配的 URL，通常用于显示 404 页面。
          它必须作为最后一个 Route。
        </div>
      </section>

      <section className="doc-section">
        <h2>3. 使用 Link 导航</h2>
        <p>
          使用 <code>&lt;Link&gt;</code> 组件创建导航链接：
        </p>
        <CodeBlock
          code={`import { Link } from 'react-router-dom';

// 基本用法
<Link to="/about">关于</Link>

// 带样式的链接
<Link 
  to="/products/123" 
  style={{ color: 'blue', textDecoration: 'none' }}
>
  产品详情
</Link>

// 使用 className
<Link 
  to="/home" 
  className={isActive ? 'active' : ''}
>
  首页
</Link>`}
          title="Link 组件用法"
        />
      </section>

      <section className="doc-section">
        <h2>4. 使用 NavLink 实现高亮</h2>
        <p>
          <code>&lt;NavLink&gt;</code> 是 <code>&lt;Link&gt;</code> 的增强版，
          可以自动添加激活状态的 class：
        </p>
        <CodeBlock
          code={`import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active-link' : ''}
      >
        首页
      </NavLink>
      <NavLink 
        to="/about"
        className={({ isActive }) => isActive ? 'active-link' : ''}
      >
        关于
      </NavLink>
    </nav>
  );
}

// 或者使用 end 属性精确匹配
<NavLink to="/" end>首页</NavLink>`}
          title="NavLink 组件"
          description="NavLink 可以接收 isActive 状态来自定义样式"
        />
      </section>

      <section className="doc-section">
        <h2>5. 完整示例：布局组件</h2>
        <p>
          使用 Layout 组件创建带有侧边栏的页面布局：
        </p>
        <CodeBlock
          code={`// components/Layout.tsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  
  const menuItems = [
    { title: '首页', path: '/' },
    { title: '学习', path: '/learning' },
    { title: '登录', path: '/login' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      {/* 侧边栏 */}
      <aside style={{ width: '200px', padding: '20px', background: '#f6f8fa' }}>
        <h3>菜单</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menuItems.map(item => (
            <li key={item.path} style={{ marginBottom: '8px' }}>
              <Link 
                to={item.path}
                style={{
                  color: location.pathname === item.path ? '#0366d6' : '#24292e',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* 主内容区域 */}
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;`}
          title="Layout.tsx"
          description="使用 Outlet 渲染嵌套路由内容"
        />
      </section>

      <div className="doc-nav">
        <Link to="/docs/routing/dynamic" className="next-btn">
          → 下一节：动态路由
        </Link>
      </div>
    </div>
  );
}

export default BasicRouting;
