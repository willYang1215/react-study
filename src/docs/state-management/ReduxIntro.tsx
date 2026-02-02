import React from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './ReduxIntro.css';

function ReduxIntro() {
  return (
    <div className="doc-page">
      <h1>Redux 入门</h1>
      <p className="doc-description">
        Redux 是一个用于 JavaScript 应用的可预测状态容器。
        它帮助你编写一致的行为良好的代码，特别适合大型应用的状态管理。
      </p>

      <section className="doc-section">
        <h2>1. 为什么需要 Redux？</h2>
        <p>
          在大型 React 应用中，组件之间的状态传递会变得复杂。
          Redux 提供了一个集中式的状态管理方案，使得状态变化可预测且易于调试。
        </p>
        <div className="problem-solution">
          <div className="problem">
            <h4>不使用 Redux 的问题</h4>
            <ul>
              <li>状态在多层组件间传递困难（props drilling）</li>
              <li>状态更新逻辑分散，难以追踪</li>
              <li>兄弟组件间通信复杂</li>
            </ul>
          </div>
          <div className="solution">
            <h4>使用 Redux 的优势</h4>
            <ul>
              <li>集中管理所有状态</li>
              <li>状态更新可预测、可追踪</li>
              <li>任何组件都可以访问和更新状态</li>
              <li>强大的开发工具支持</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>2. Redux 核心概念</h2>
        <div className="concepts">
          <div className="concept">
            <h4>Store</h4>
            <p>存储整个应用状态的对象。整个应用只有一个 Store。</p>
            <CodeBlock code={`import { createStore } from 'redux';
const store = createStore(reducer);`} />
          </div>
          <div className="concept">
            <h4>Action</h4>
            <p>描述发生了什么的事件。它是一个普通对象，必须有 type 字段。</p>
            <CodeBlock code={`{ type: 'ADD_TODO', payload: { text: '学习 Redux' } }`} />
          </div>
          <div className="concept">
            <h4>Reducer</h4>
            <p>纯函数，指定状态如何响应 Action 更新。</p>
            <CodeBlock code={`function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
}`} />
          </div>
          <div className="concept">
            <h4>Dispatch</h4>
            <p>发送 Action 到 Store 的方法，触发状态更新。</p>
            <CodeBlock code={`store.dispatch({ type: 'ADD_TODO', payload: newTodo });`} />
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>3. 数据流</h2>
        <div className="flow-diagram">
          <div className="flow-step">
            <span className="step-number">1</span>
            <span className="step-text">用户点击按钮，调用 dispatch</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">2</span>
            <span className="step-text">Store 调用 reducer，传入当前状态和 Action</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">3</span>
            <span className="step-text">Reducer 计算新状态并返回</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step">
            <span className="step-number">4</span>
            <span className="step-text">Store 保存新状态，通知所有订阅的组件</span>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <h2>4. 安装 Redux</h2>
        <CodeBlock
          code={`# 安装 Redux Toolkit（推荐）
npm install @reduxjs/toolkit react-redux

# 或者安装基础版
npm install redux react-redux`}
          title="安装 Redux"
        />
        <div className="info-box">
          <strong>💡 推荐使用 Redux Toolkit！</strong>
          Redux Toolkit 是官方推荐的方式，它简化了 Redux 的使用，提供了更好的开发体验。
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 第一个 Redux 示例</h2>
        <CodeBlock
          code={`// 1. 创建 Slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;`}
          title="创建 Counter Slice"
          description="使用 Redux Toolkit 的 createSlice 创建"
        />
      </section>

      <section className="doc-section">
        <h2>6. 配置 Store</h2>
        <CodeBlock
          code={`// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 可以添加更多 reducer
    // user: userReducer,
    // todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
          title="配置 Store"
          description="使用 configureStore 创建 store"
        />
      </section>

      <section className="doc-section">
        <h2>7. 在 React 中使用</h2>
        <CodeBlock
          code={`// main.tsx - 包裹应用
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);`}
          title="入口文件配置"
        />
        <CodeBlock
          code={`// Counter.tsx - 使用状态
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../store/counterSlice';
import type { RootState } from '../store';

function Counter() {
  // 获取状态
  const count = useSelector((state: RootState) => state.counter.value);
  
  // 获取 dispatch 函数
  const dispatch = useDispatch();

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}`}
          title="在组件中使用 Redux"
        />
      </section>

      <div className="doc-nav">
        <Link to="/docs/state-management/login" className="next-btn">
          → 下一节：用户登录实战
        </Link>
      </div>
    </div>
  );
}

export default ReduxIntro;
