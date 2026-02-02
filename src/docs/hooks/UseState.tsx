import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './UseState.css';

function UseState() {
  return (
    <div className="doc-page">
      <h1>useState 基础</h1>
      <p className="doc-description">
        <code>useState</code> 是 React 中最基本的 Hook，用于在函数组件中添加状态。
        它让你能够在组件中存储和更新数据，当状态变化时，组件会重新渲染。
      </p>

      <section className="doc-section">
        <h2>1. 为什么需要 useState？</h2>
        <p>
          在 React 中，状态是驱动 UI 更新数据。函数组件本身没有状态，
          使用 <code>useState</code> 可以为函数组件添加内部状态。
        </p>
        <div className="key-concept">
          <strong>🎯 核心概念：</strong>
          状态是组件中随时间变化的数据，当状态更新时，React 会自动重新渲染组件以反映最新状态。
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 基本用法</h2>
        <CodeBlock
          code={`import React, { useState } from 'react';

function Counter() {
  // 声明状态变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
      <button onClick={() => setCount(count - 1)}>
        减少
      </button>
    </div>
  );
}`}
          title="useState 基本用法"
          description="useState 返回当前状态和更新状态的函数"
        />
        <div className="info-box">
          <strong>💡 提示：</strong>
          <code>useState</code> 的参数是状态的初始值，可以是任何类型的值。
        </div>
      </section>

      <section className="doc-section">
        <h2>3. useState 的工作原理</h2>
        <div className="flow-diagram">
          <div className="flow-step">
            <span className="step-number">1</span>
            <span className="step-text">首次渲染：useState 返回初始值，创建状态</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">2</span>
            <span className="step-text">用户触发事件（如点击按钮）</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">3</span>
            <span className="step-text">调用 setXxx(newValue) 更新状态</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">4</span>
            <span className="step-text">React 重新渲染组件，使用新状态值</span>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>4. 不同类型的初始值</h2>
        <CodeBlock
          code={`import React, { useState } from 'react';

function VariousTypes() {
  // 数字
  const [count, setCount] = useState(0);

  // 字符串
  const [name, setName] = useState('张三');

  // 布尔值
  const [isActive, setIsActive] = useState(false);

  // 数组
  const [items, setItems] = useState<string[]>([]);

  // 对象
  const [user, setUser] = useState({
    name: '李四',
    age: 25,
    email: 'lisi@example.com'
  });

  // 函数（惰性初始化）
  const [data] = useState(() => {
    // 这个函数只会在首次渲染时执行
    return expensiveComputation();
  });

  return (
    <div>
      <p>计数: {count}</p>
      <p>姓名: {name}</p>
      <p>状态: {isActive ? '激活' : '未激活'}</p>
      <p>用户: {user.name}, {user.age}岁</p>
    </div>
  );
}`}
          title="不同类型的初始值"
        />
        <div className="warning-box">
          <strong>⚠️ 重要：</strong>
          如果初始状态需要通过复杂计算得到，使用函数形式 
          <code>useState</code> 传入函数来惰性初始化。
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 更新对象状态</h2>
        <CodeBlock
          code={`import React, { useState } from 'react';

function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 错误方式 ❌ - 直接修改状态
  const handleWrongUpdate = () => {
    user.name = '新名字';
    setUser(user); // 这不会触发重新渲染
  };

  // 正确方式 ✅ - 使用展开运算符
  const handleUpdate = (field: string, value: string) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  // 或者使用函数式更新
  const handleAgeIncrement = () => {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  };

  return (
    <div>
      <input
        value={user.name}
        onChange={(e) => handleUpdate('name', e.target.value)}
        placeholder="姓名"
      />
      <input
        value={user.email}
        onChange={(e) => handleUpdate('email', e.target.value)}
        placeholder="邮箱"
      />
    </div>
  );
}`}
          title="更新对象状态"
          description="必须使用展开运算符 ... 创建新对象"
        />
      </section>

      <section className="doc-section">
        <h2>6. 更新数组状态</h2>
        <CodeBlock
          code={`import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (!inputValue.trim()) return;
    
    // 添加到数组末尾
    setTodos(prev => [...prev, inputValue]);
    setInputValue('');
  };

  const removeTodo = (index: number) => {
    // 过滤掉指定索引的项
    setTodos(prev => prev.filter((_, i) => i !== index));
  };

  const updateTodo = (index: number, newText: string) => {
    // 映射更新特定项
    setTodos(prev => prev.map((todo, i) => 
      i === index ? newText : todo
    ));
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="添加待办事项"
      />
      <button onClick={addTodo}>添加</button>
      
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}
          title="更新数组状态"
        />
      </section>

      <div className="doc-nav">
        <Link to="/docs/hooks/useEffect" className="next-btn">
          → 下一节：useEffect 副作用
        </Link>
      </div>
    </div>
  );
}

export default UseState;
