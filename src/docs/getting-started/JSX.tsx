import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './JSX.css';

function JSX() {
  return (
    <div className="doc-page">
      <h1>JSX 语法</h1>
      <p className="doc-description">
        JSX 是 JavaScript 的语法扩展，允许你在 JavaScript 中编写 HTML 风格的代码。
        它是 React 的核心特性之一，让代码更加直观和易于理解。
      </p>

      <section className="doc-section">
        <h2>1. 为什么使用 JSX？</h2>
        <p>
          React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如事件处理、状态更新等。
          JSX 让你能够在 JavaScript 中编写 UI 代码，使代码更加简洁和直观。
        </p>
        <div className="comparison">
          <div className="comparison-item">
            <h4>不使用 JSX</h4>
            <CodeBlock
              code={`React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, '标题'),
  React.createElement('p', null, '段落内容')
)`}
              language="javascript"
            />
          </div>
          <div className="comparison-item">
            <h4>使用 JSX</h4>
            <CodeBlock
              code={`<div className="container">
  <h1>标题</h1>
  <p>段落内容</p>
</div>`}
              language="jsx"
            />
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>2. 在 JSX 中使用 JavaScript</h2>
        <p>
          你可以使用 <strong>大括号</strong> 在 JSX 中嵌入 JavaScript 表达式：
        </p>
        <CodeBlock
          code={`import React from 'react';

function App() {
  const name = 'React';
  const欢迎语 = '你好';

  return (
    <div>
      <h1>欢迎学习 {name}</h1>
      <p>{欢迎语}，世界！</p>
      <p>1 + 1 = {1 + 1}</p>
    </div>
  );
}`}
          title="嵌入 JavaScript 表达式"
        />
      </section>

      <section className="doc-section">
        <h2>3. JSX 属性</h2>
        <p>
          使用大括号在属性中嵌入 JavaScript 表达式：
        </p>
        <CodeBlock
          code={`import React from 'react';

function Avatar() {
  const user = {
    name: '张三',
    avatarUrl: 'https://example.com/avatar.jpg'
  };

  return (
    <img
      className="avatar"
      src={user.avatarUrl}
      alt={user.name + '的头像'}
      style={{
        width: 100,
        height: 100,
        borderRadius: '50%'
      }}
    />
  );
}`}
          title="JSX 属性使用"
          description="className 替代 class，style 使用对象语法"
        />
      </section>

      <section className="doc-section">
        <h2>4. JSX 规则</h2>
        <div className="rules-list">
          <div className="rule-item">
            <h4>规则一：必须闭合标签</h4>
            <p>HTML 中可以省略的闭合标签，在 JSX 中必须显式闭合：</p>
            <CodeBlock
              code={`// 错误 ❌
<br>

// 正确 ✅
<br />

// 自闭合标签
<input type="text" />`}
            />
          </div>

          <div className="rule-item">
            <h4>规则二：只能返回一个根元素</h4>
            <p>组件不能返回多个 JSX 标签，必须包裹在一个父元素中：</p>
            <CodeBlock
              code={`// 错误 ❌
function MyComponent() {
  return (
    <h1>标题</h1>
    <p>段落</p>
  );
}

// 正确 ✅ - 使用 Fragment
function MyComponent() {
  return (
    <>
      <h1>标题</h1>
      <p>段落</p>
    </>
  );
}

// 或者使用 div
function MyComponent() {
  return (
    <div>
      <h1>标题</h1>
      <p>段落</p>
    </div>
  );
}`}
            />
          </div>

          <div className="rule-item">
            <h4>规则三：使用 camelCase</h4>
            <p>React 中使用 camelCase 命名属性：</p>
            <CodeBlock
              code={`// HTML (kebab-case)
class="container"
onclick="handleClick"

// JSX (camelCase)
className="container"
onClick={handleClick}
aria-label="标签"
data-value="值"`}
            />
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 条件渲染</h2>
        <p>
          在 JSX 中使用普通的 JavaScript 条件语句：
        </p>
        <CodeBlock
          code={`import React, { useState } from 'react';

function Greeting({ isLoggedIn }) {
  // 方法一：使用 if 语句
  if (isLoggedIn) {
    return <h1>欢迎回来！</h1>;
  }
  return <h1>请登录</h1>;
}

// 方法二：使用三元运算符
function Status({ status }) {
  return (
    <div>
      {status === 'loading' ? (
        <p>加载中...</p>
      ) : status === 'error' ? (
        <p>出错了</p>
      ) : (
        <p>加载成功</p>
      )}
    </div>
  );
}

// 方法三：使用 && 运算符
function UnreadMessages({ messages }) {
  return (
    <div>
      {messages.length > 0 && (
        <p>你有 {messages.length} 条未读消息</p>
      )}
    </div>
  );
}`}
          title="条件渲染的各种方式"
        />
      </section>

      <section className="doc-section">
        <h2>6. 列表渲染</h2>
        <p>
          使用数组的 <code>map()</code> 方法渲染列表：
        </p>
        <CodeBlock
          code={`import React from 'react';

function TodoList() {
  const todos = [
    { id: 1, text: '学习 React', done: true },
    { id: 2, text: '构建项目', done: false },
    { id: 3, text: '部署应用', done: false }
  ];

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{ 
            textDecoration: todo.done ? 'line-through' : 'none' 
          }}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
}`}
          title="渲染列表"
          description="使用 map() 遍历数组，注意 key 属性的重要性"
        />
        <div className="warning-box">
          <strong>⚠️ 注意：</strong>
          列表中的每个元素都需要一个唯一的 <code>key</code> 属性，
          这有助于 React 识别哪些元素发生了变化，提高了渲染性能。
        </div>
      </section>

      <div className="doc-nav">
        <Link to="/docs/routing/intro" className="next-btn">
          → 下一节：React Router 简介
        </Link>
      </div>
    </div>
  );
}

export default JSX;
