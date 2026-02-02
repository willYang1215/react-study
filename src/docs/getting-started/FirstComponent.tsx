import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './FirstComponent.css';

function FirstComponent() {
  return (
    <div className="doc-page">
      <h1>第一个组件</h1>
      <p className="doc-description">
        React 应用程序是由组件构成的。组件是 UI 的一部分，它拥有自己的逻辑和外观。
        本节将创建你的第一个 React 组件。
      </p>

      <section className="doc-section">
        <h2>1. 什么是 React 组件？</h2>
        <p>
          React 组件是一个返回 JSX（HTML -like 语法）的 JavaScript 函数。
          组件可以小到一个按钮，也可以大到整个页面。
        </p>
        <div className="key-concept">
          <strong>🎯 关键概念：</strong>
          React 组件必须以<strong>大写字母开头</strong>，这样 React 才能区分它们和原生 HTML 标签。
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 创建你的第一个组件</h2>
        <p>
          让我们创建一个简单的按钮组件：
        </p>
        <CodeBlock
          code={`import React from 'react';

function MyButton() {
  return (
    <button>我是一个按钮</button>
  );
}

export default MyButton;`}
          title="MyButton.tsx"
          description="这是一个最简单的 React 组件，只返回一个按钮元素"
        />
      </section>

      <section className="doc-section">
        <h2>3. 使用组件</h2>
        <p>
          创建组件后，你可以像使用 HTML 标签一样使用它：
        </p>
        <CodeBlock
          code={`import React from 'react';
import MyButton from './MyButton';

function App() {
  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  );
}

export default App;`}
          title="App.tsx"
          description="可以在一个组件中多次使用另一个组件"
        />
      </section>

      <section className="doc-section">
        <h2>4. 组件的属性（Props）</h2>
        <p>
          组件可以接收参数，叫做 <strong>props</strong>。这使得组件更加灵活和可复用。
        </p>
        <CodeBlock
          code={`import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'default';
  onClick?: () => void;
}

function Button({ children, type = 'default', onClick }: ButtonProps) {
  const style = {
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: type === 'primary' ? '#0366d6' : '#f6f8fa',
    color: type === 'primary' ? 'white' : '#24292e',
  };

  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;`}
          title="Button.tsx"
          description="使用 props 让组件更加灵活"
        />
        <div className="info-box">
          <strong>💡 提示：</strong>
          TypeScript 中，我们可以使用 <code>interface</code> 或 <code>type</code> 来定义 props 的类型，
          这有助于在开发时发现错误。
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 完整示例</h2>
        <p>
          让我们看一个完整的可运行示例：
        </p>
        <CodeBlock
          code={`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
      <button onClick={() => setCount(count - 1)}>
        减少
      </button>
      <button onClick={() => setCount(0)}>
        重置
      </button>
    </div>
  );
}

export default Counter;`}
          title="Counter.tsx"
          description="一个完整的计数器组件，包含状态管理"
        />
      </section>

      <div className="doc-nav">
        <Link to="/docs/getting-started/jsx" className="next-btn">
          → 下一节：JSX 语法
        </Link>
      </div>
    </div>
  );
}

export default FirstComponent;
