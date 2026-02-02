import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';

function DynamicRouting() {
  return (
    <div className="doc-page">
      <h1>动态路由</h1>
      <p className="doc-description">
        动态路由允许你使用参数化的 URL 路径，例如 /users/:id 来匹配不同的用户页面。
      </p>

      <section className="doc-section">
        <h2>1. 定义动态路由</h2>
        <p>
          在路由路径中使用 <code>:</code> 来定义参数：
        </p>
        <CodeBlock
          code={`// App.tsx
import { Routes, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Routes>
      {/* 单一参数 */}
      <Route path="/users/:id" element={<UserProfile />} />
      
      {/* 多个参数 */}
      <Route path="/products/:category/:id" element={<ProductDetail />} />
      
      {/* 可选参数 */}
      <Route path="/articles/:slug?" element={<ArticlePage />} />
    </Routes>
  );
}`}
          title="定义动态路由参数"
        />
        <div className="warning-box">
          <strong>⚠️ 注意：</strong>
          参数名使用 <code>:</code> 前缀，如 <code>:id</code>。
          可选参数使用 <code>:slug?</code>（问号表示可选）。
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 获取路由参数</h2>
        <p>
          使用 <code>useParams</code> Hook 获取 URL 参数：
        </p>
        <CodeBlock
          code={`// pages/UserProfile.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Params {
  id: string;
}

function UserProfileDemo() {
  const { id } = useParams<Params>();
  const nextUserId = id ? String(Number(id) + 1) : '1';
  
  return (
    <div>
      <Link to="/">← 返回首页</Link>
      <h1>用户详情页</h1>
      <p>当前用户ID: {id}</p>
      <Link to={"/users/" + nextUserId}>
        查看下一个用户
      </Link>
    </div>
  );
}`}
          title="使用 useParams 获取参数"
        />
      </section>

      <section className="doc-section">
        <h2>3. 多个参数的情况</h2>
        <CodeBlock
          code={`// pages/ProductDetail.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Params {
  category: string;
  id: string;
}

function ProductDetail() {
  const { category, id } = useParams<Params>();

  const products: Record<string, string[]> = {
    electronics: ['手机', '电脑', '平板'],
    books: ['React指南', 'TypeScript入门', 'Node.js实践']
  };

  const productName = products[category]?.[Number(id) - 1] || '未知产品';

  return (
    <div>
      <Link to="/products">← 返回产品列表</Link>
      <h1>产品详情</h1>
      <p>分类: {category}</p>
      <p>产品ID: {id}</p>
      <p>产品名称: {productName}</p>
    </div>
  );
}

export default ProductDetail;`}
          title="处理多个路由参数"
        />
      </section>

      <section className="doc-section">
        <h2>4. 路由参数类型转换</h2>
        <p>
          URL 参数都是字符串类型，如果需要数字类型，需要手动转换：
        </p>
        <CodeBlock
          code={`// 错误示例 - 直接比较
const userId = params.id; // string 类型
if (userId === 1) { // 永远不会匹配，因为类型不匹配
  // ...
}

// 正确示例 - 类型转换
const userId = Number(params.id);
if (userId === 1) {
  // 现在可以正确匹配
}

// 或者使用 == 进行宽松比较
if (params.id == 1) {
  // 可以匹配
}`}
          title="参数类型转换"
        />
      </section>

      <section className="doc-section">
        <h2>5. 搜索参数（Query Parameters）</h2>
        <p>
          使用 <code>useSearchParams</code> 处理 URL 查询参数：
        </p>
        <CodeBlock
          code={`// pages/SearchPage.tsx
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const page = Number(searchParams.get('page') || '1');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search');
    setSearchParams({ q: searchQuery as string, page: '1' });
  };

  return (
    <div>
      <h1>搜索页面</h1>
      
      <form onSubmit={handleSearch}>
        <input 
          name="search" 
          defaultValue={query}
          placeholder="输入搜索关键词..."
        />
        <button type="submit">搜索</button>
      </form>

      {query && (
        <div>
          <p>搜索关键词: "{query}"</p>
          <p>当前页码: {page}</p>
          
          {page > 1 && (
            <Link to={"?q=" + query + "&page=" + (page - 1)}>
              上一页
            </Link>
          )}
          
          <Link to={"?q=" + query + "&page=" + (page + 1)}>
            下一页
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchPage;`}
          title="使用查询参数"
          description="useSearchParams 用于读取和修改 URL 查询参数"
        />
      </section>

      <div className="doc-nav">
        <Link to="/docs/state-management/redux-intro" className="next-btn">
          → 下一节：Redux 入门
        </Link>
      </div>
    </div>
  );
}

export default DynamicRouting;
