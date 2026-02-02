import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// 扩展 MenuItem 接口，添加权限字段
interface MenuItem {
  id: string;
  title: string;
  path: string;
  children?: MenuItem[];
  permission?: string; // 权限标识
  icon?: string;
}

// 模拟从接口获取菜单数据
async function fetchMenuItems(): Promise<MenuItem[]> {
  // 实际项目中这里会调用 API
  // const response = await fetch('/api/menus');
  // return response.json();
  
  // 模拟数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: '快速入门',
          path: '/docs/getting-started',
          permission: 'quickstart:access',
          children: [
            { id: '1-1', title: '项目初始化', path: '/docs/getting-started/project-setup', permission: 'quickstart:project-setup' },
            { id: '1-2', title: '第一个组件', path: '/docs/getting-started/first-component', permission: 'quickstart:first-component' },
            { id: '1-3', title: 'JSX 语法', path: '/docs/getting-started/jsx', permission: 'quickstart:jsx' },
          ]
        },
        {
          id: '2',
          title: '路由配置',
          path: '/docs/routing',
          permission: 'routing:access',
          children: [
            { id: '2-1', title: 'React Router 简介', path: '/docs/routing/intro', permission: 'routing:intro' },
            { id: '2-2', title: '基础路由配置', path: '/docs/routing/basic', permission: 'routing:basic' },
            { id: '2-3', title: '动态路由', path: '/docs/routing/dynamic', permission: 'routing:dynamic' },
          ]
        },
        {
          id: '3',
          title: '状态管理',
          path: '/docs/state-management',
          permission: 'state:access',
          children: [
            { id: '3-1', title: 'Redux 入门', path: '/docs/state-management/redux-intro', permission: 'state:redux' },
            { id: '3-2', title: '用户登录实战', path: '/docs/state-management/login', permission: 'state:login' },
            { id: '3-3', title: 'Store 配置', path: '/docs/state-management/store-config', permission: 'state:store' },
          ]
        },
        {
          id: '4',
          title: 'Hooks 进阶',
          path: '/docs/hooks',
          permission: 'hooks:access',
          children: [
            { id: '4-1', title: 'useState 基础', path: '/docs/hooks/useState', permission: 'hooks:usestate' },
            { id: '4-2', title: 'useEffect 副作用', path: '/docs/hooks/useEffect', permission: 'hooks:useeffect' },
            { id: '4-3', title: 'useMemo 性能优化', path: '/docs/hooks/useMemo', permission: 'hooks:usememo' },
            { id: '4-4', title: 'useCallback 缓存函数', path: '/docs/hooks/useCallback', permission: 'hooks:usecallback' },
            { id: '4-5', title: 'useReducer 复杂状态', path: '/docs/hooks/useReducer', permission: 'hooks:usereducer' },
          ]
        },
        {
          id: '5',
          title: '项目实战',
          path: '/docs/practice',
          permission: 'practice:access',
          children: [
            { id: '5-1', title: '登录功能实现', path: '/docs/practice/login-feature', permission: 'practice:login' },
            { id: '5-2', title: '表单处理', path: '/docs/practice/forms', permission: 'practice:forms' },
            { id: '5-3', title: '数据请求', path: '/docs/practice/data-fetching', permission: 'practice:fetching' },
          ]
        },
      ]);
    }, 500);
  });
}

// 模拟获取用户权限
function getUserPermissions(): string[] {
  // 实际项目中这里会从 Redux 或 localStorage 获取
  // 示例：返回用户拥有的权限
  return [
    'quickstart:access',
    'quickstart:project-setup',
    'quickstart:first-component',
    'quickstart:jsx',
    'routing:access',
    'routing:intro',
    'routing:basic',
    'routing:dynamic',
    'state:access',
    'state:redux',
    'state:login',
    'state:store',
    'hooks:access',
    'hooks:usestate',
    'hooks:usememo',
    'hooks:useeffect',
    'hooks:usecallback',
    'hooks:usereducer',
    'practice:access',
    'practice:login',
    'practice:forms',
    'practice:fetching'
  ];
}

// 检查用户是否有权限访问菜单
function hasPermission(menuItem: MenuItem, userPermissions: string[]): boolean {
  // 如果菜单没有权限要求，则默认允许访问
  if (!menuItem.permission) {
    return true;
  }
  return userPermissions.includes(menuItem.permission);
}

// 过滤菜单，只返回用户有权限的菜单
function filterMenuByPermission(menuItems: MenuItem[], userPermissions: string[]): MenuItem[] {
  return menuItems
    .filter(item => {
      // 检查当前菜单是否有权限
      const hasItemPermission = hasPermission(item, userPermissions);
      
      // 如果有子菜单，递归过滤
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterMenuByPermission(item.children, userPermissions);
        if (filteredChildren.length > 0) {
          item.children = filteredChildren;
          return true; // 即使当前菜单没有权限，但有子菜单有权限，也显示
        }
      }
      
      return hasItemPermission;
    })
    .map(item => ({
      ...item,
      children: item.children && item.children.length > 0 
        ? filterMenuByPermission(item.children, userPermissions)
        : undefined
    }));
}

// 递归渲染菜单组件
function MenuRenderer({ items, userPermissions }: { items: MenuItem[], userPermissions: string[] }) {
  return (
    <>
      {items.map((item) => {
        // 检查权限
        const canAccess = hasPermission(item, userPermissions);
        
        return (
          <div key={item.id} className="menu-group">
            {canAccess && (
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `menu-title ${isActive ? 'active' : ''}`}
                end
              >
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                {item.title}
              </NavLink>
            )}
            
            {item.children && item.children.length > 0 && (
              <ul className="menu-children">
                <MenuRenderer 
                  items={item.children} 
                  userPermissions={userPermissions} 
                />
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

function Sidebar() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const userPermissions = getUserPermissions();

  useEffect(() => {
    // 从接口获取菜单数据
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        // 根据权限过滤菜单
        const filteredItems = filterMenuByPermission(items, userPermissions);
        setMenuItems(filteredItems);
      } catch (error) {
        console.error('Failed to load menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, [userPermissions]);

  if (loading) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>📚 React 学习指南</h2>
        </div>
        <nav className="sidebar-nav">
          <div style={{ padding: '20px', color: '#666' }}>加载菜单中...</div>
        </nav>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📚 React 学习指南</h2>
      </div>
      <nav className="sidebar-nav">
        <MenuRenderer 
          items={menuItems} 
          userPermissions={userPermissions} 
        />
      </nav>
      <div className="sidebar-footer">
        <a href="https://zh-hans.react.dev" target="_blank" rel="noopener noreferrer">
          📖 参考官方文档
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
