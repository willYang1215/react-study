import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './UseMemo.css';

function UseMemoDemo() {
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState('');

  const numbers = [1, 5, 8, 3, 12, 7, 20, 15];

  const filteredNumbers = useMemo(() => {
    console.log('计算过滤后的数字...');
    return numbers.filter(n => n.toString().includes(filter));
  }, [filter]);

  const expensiveResult = useMemo(() => {
    console.log('执行复杂计算...');
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
      result += i * 0.000001;
    }
    return result;
  }, [count]);

  return (
    <div className="demo-section">
      <h3>useMemo 实时演示</h3>
      <div className="demo-controls">
        <button onClick={() => setCount(c => c + 1)}>
          点击次数: {count}
        </button>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="过滤数字..."
        />
      </div>
      <div className="demo-results">
        <p>过滤结果: {filteredNumbers.join(', ')}</p>
        <p>复杂计算结果: {expensiveResult.toFixed(2)}</p>
      </div>
      <p className="demo-hint">
        💡 观察控制台，只有依赖项变化时才会重新计算
      </p>
    </div>
  );
}

function UseMemo() {
  return (
    <div className="doc-page">
      <h1>useMemo 性能优化</h1>
      <p className="doc-description">
        <code>useMemo</code> 是一个用于性能优化的 Hook，它会记住计算结果，
        只有当依赖项变化时才重新计算。这对于避免昂贵的计算重复执行非常有用。
      </p>

      <section className="doc-section">
        <h2>1. 为什么需要 useMemo？</h2>
        <p>
          在 React 中，每次组件渲染都会重新执行函数体中的代码。
          如果有一些复杂的计算，每次渲染都重新计算会导致性能问题。
          <code>useMemo</code> 可以缓存计算结果，避免不必要的重复计算。
        </p>
        <div className="key-concept">
          <strong>🎯 使用场景：</strong>
          当你需要根据某些数据计算派生数据，且这个计算比较昂贵时，使用 useMemo 可以提升性能。
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 基本用法</h2>
        <CodeBlock
          code={`import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 5, 8, 3, 12, 7, 20, 15]);

  // 使用 useMemo 缓存计算结果
  const sum = useMemo(() => {
    console.log('计算总和...');
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]); // 只有 numbers 变化时才重新计算

  const average = useMemo(() => {
    console.log('计算平均值...');
    return sum / numbers.length;
  }, [sum, numbers.length]);

  return (
    <div>
      <p>数字: {numbers.join(', ')}</p>
      <p>总和: {sum}</p>
      <p>平均值: {average.toFixed(2)}</p>
      <button onClick={() => setCount(c => c + 1)}>
        点击次数: {count}
      </button>
    </div>
  );
}`}
          title="useMemo 基本用法"
          description="点击按钮不会触发求和计算，因为 count 不在依赖数组中"
        />
      </section>

      <section className="doc-section">
        <h2>3. 实时演示</h2>
        <UseMemoDemo />
      </section>

      <section className="doc-section">
        <h2>4. useMemo vs 没有 useMemo</h2>
        <div className="comparison">
          <div className="comparison-item">
            <h4>没有 useMemo ❌</h4>
            <CodeBlock
              code={`function BadExample({ data }) {
  // 每次渲染都会执行
  const processed = heavyComputation(data);
  return <ExpensiveResult result={processed} />;
}`}
              language="typescript"
            />
          </div>
          <div className="comparison-item">
            <h4>使用 useMemo ✅</h4>
            <CodeBlock
              code={`function GoodExample({ data }) {
  // 只在 data 变化时执行
  const processed = useMemo(
    () => heavyComputation(data), 
    [data]
  );
  return <ExpensiveResult result={processed} />;
}`}
              language="typescript"
            />
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 常见使用场景</h2>
        <div className="scenarios">
          <div className="scenario">
            <h4>场景一：过滤和排序</h4>
            <CodeBlock
              code={`const visibleTodos = useMemo(() => {
  return todos
    .filter(todo => todo.status === 'active')
    .sort((a, b) => b.createdAt - a.createdAt);
}, [todos]);`}
            />
          </div>
          <div className="scenario">
            <h4>场景二：派生数据</h4>
            <CodeBlock
              code={`const summary = useMemo(() => ({
  total: items.length,
  completed: items.filter(i => i.done).length,
  pending: items.filter(i => !i.done).length
}), [items]);`}
            />
          </div>
          <div className="scenario">
            <h4>场景三：格式化</h4>
            <CodeBlock
              code={`const formattedDate = useMemo(() => {
  return new Date(timestamp).toLocaleDateString('zh-CN');
}, [timestamp]);`}
            />
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>6. 注意事项</h2>
        <div className="warning-box">
          <strong>⚠️ 重要提示：</strong>
          <ul style={{ marginTop: '8px' }}>
            <li>useMemo 不是越少越好，过度使用会增加内存开销</li>
            <li>只有当计算确实昂贵时才使用</li>
            <li>依赖数组要完整包含所有使用的变量</li>
            <li>空依赖数组 [] 表示只在首次渲染时计算一次</li>
          </ul>
        </div>
      </section>

      <div className="doc-nav">
        <Link to="/docs/hooks/useCallback" className="next-btn">
          → 下一节：useCallback 缓存函数
        </Link>
      </div>
    </div>
  );
}

export default UseMemo;
