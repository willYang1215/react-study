import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './UseCallback.css';

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<number[]>([]);

  const addItem = useCallback(() => {
    setItems(prev => [...prev, count]);
    setCount(c => c + 1);
  }, [count]);

  const resetItems = useCallback(() => {
    setItems([]);
    setCount(0);
  }, []);

  return (
    <div className="demo-section">
      <h3>useCallback 实时演示</h3>
      <div className="demo-info">
        <p>点击次数（传递给子组件）: {count}</p>
        <p>添加的项目: {items.join(', ') || '无'}</p>
      </div>
      <div className="demo-buttons">
        <button onClick={addItem}>添加项目</button>
        <button onClick={resetItems}>重置</button>
      </div>
      <p className="demo-hint">
        💡 注意：如果没有 useCallback，每次父组件渲染都会创建新的函数实例
      </p>
    </div>
  );
}

function UseCallback() {
  return (
    <div className="doc-page">
      <h1>useCallback 缓存函数</h1>
      <p className="doc-description">
        <code>useCallback</code> 是一个用于性能优化的 Hook，它会缓存函数实例，
        只有当依赖项变化时才创建新的函数。这对于避免不必要的子组件渲染非常有用。
      </p>

      <section className="doc-section">
        <h2>1. 为什么需要 useCallback？</h2>
        <p>
          在 React 中，每次组件渲染都会重新执行函数体，包括创建新的函数实例。
          如果你将函数作为 props 传递给子组件，每次渲染都会导致子组件接收到新的函数引用，
          即使函数逻辑没有变化。这会导致子组件不必要的重新渲染。
        </p>
        <div className="key-concept">
          <strong>🎯 核心概念：</strong>
          useCallback 类似于 useMemo，但专门用于缓存函数。它返回函数的缓存版本。
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 基本用法</h2>
        <CodeBlock
          code={`import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存函数
  const handleClick = useCallback(() => {
    console.log('按钮被点击');
    setCount(prev => prev + 1);
  }, []); // 空依赖数组，函数只创建一次

  return <ChildComponent onClick={handleClick} count={count} />;
}

function ChildComponent({ onClick, count }: { onClick: () => void; count: number }) {
  // 只有 onClick 变化时才会重新渲染
  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={onClick}>增加</button>
    </div>
  );
}`}
          title="useCallback 基本用法"
        />
      </section>

      <section className="doc-section">
        <h2>3. 实时演示</h2>
        <UseCallbackDemo />
      </section>

      <section className="doc-section">
        <h2>4. useCallback vs useMemo</h2>
        <CodeBlock
          code={`// useMemo 用于缓存值
const memoizedValue = useMemo(() => expensiveComputation(a, b), [a, b]);

// useCallback 用于缓存函数
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// 这两者是等价的
const memoizedCallback2 = useMemo(() => () => {
  doSomething(a, b);
}, [a, b]);`}
          title="useCallback 和 useMemo 的关系"
        />
      </section>

      <section className="doc-section">
        <h2>5. 典型使用场景</h2>
        <div className="scenarios">
          <div className="scenario">
            <h4>场景一：传递给优化过的子组件</h4>
            <CodeBlock
              code={`function Parent() {
  const [query, setQuery] = useState('');

  // 只有 query 变化时才创建新函数
  const handleSearch = useCallback(() => {
    fetchResults(query);
  }, [query]);

  return <SearchList onSearch={handleSearch} />;
}

// SearchList 使用 React.memo 优化
const SearchList = React.memo(({ onSearch }) => {
  // 只有 onSearch 变化时才重新渲染
  return <button onClick={onSearch}>搜索</button>;
});`}
            />
          </div>
          <div className="scenario">
            <h4>场景二：事件处理器</h4>
            <CodeBlock
              code={`function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleComplete = useCallback((id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: true } : todo
    ));
  }, []);

  return todos.map(todo => (
    <TodoItem 
      key={todo.id} 
      todo={todo} 
      onComplete={handleComplete}
    />
  ));
}`}
            />
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>6. 注意事项</h2>
        <div className="warning-box">
          <strong>⚠️ 重要提示：</strong>
          <ul style={{ marginTop: '8px' }}>
            <li>不是所有函数都需要 useCallback，过度使用会增加代码复杂度</li>
            <li>依赖数组要完整，否则可能导致闭包问题</li>
            <li>通常与 React.memo 配合使用效果最佳</li>
            <li>在性能敏感的场景（如大型列表）中使用效果更明显</li>
          </ul>
        </div>
      </section>

      <div className="doc-nav">
        <Link to="/docs/hooks/useReducer" className="next-btn">
          → 下一节：useReducer 复杂状态
        </Link>
      </div>
    </div>
  );
}

export default UseCallback;
