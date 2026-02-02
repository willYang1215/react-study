import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import CodeBlock from '../../components/CodeBlock';
import './UseReducer.css';

interface State {
  count: number;
  step: number;
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

const initialState: State = { count: 0, step: 1 };

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function UseReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="demo-section">
      <h3>useReducer 实时演示</h3>
      <div className="demo-controls">
        <div className="demo-display">
          <span className="count">{state.count}</span>
          <span className="step">步长: {state.step}</span>
        </div>
        <div className="demo-buttons">
          <button onClick={() => dispatch({ type: 'DECREMENT' })}>
            减少
          </button>
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>
            增加
          </button>
          <button onClick={() => dispatch({ type: 'RESET' })}>
            重置
          </button>
        </div>
        <div className="step-control">
          <label>设置步长: </label>
          <input
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ 
              type: 'SET_STEP', 
              payload: Number(e.target.value) 
            })}
            min="1"
          />
        </div>
      </div>
    </div>
  );
}

function UseReducer() {
  return (
    <div className="doc-page">
      <h1>useReducer 复杂状态</h1>
      <p className="doc-description">
        <code>useReducer</code> 是 React 中用于管理复杂状态的 Hook。
        当状态逻辑较复杂，或者下一个状态依赖于前一个状态时，useReducer 比 useState 更合适。
      </p>

      <section className="doc-section">
        <h2>1. useState 的局限性</h2>
        <p>
          当状态涉及多个子值，或者状态更新逻辑较复杂时，useState 会变得难以管理：
        </p>
        <CodeBlock
          code={`// 使用 useState 管理复杂状态
function ComplexForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 每个状态更新都需要单独的函数或复杂的对象更新
  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    // 复杂的验证逻辑
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // 提交逻辑
  };

  // ... 更多的状态更新逻辑
}`}
          title="useState 管理复杂状态的困境"
        />
      </section>

      <section className="doc-section">
        <h2>2. 基本用法</h2>
        <CodeBlock
          code={`import React, { useReducer } from 'react';

// 1. 定义状态类型
interface State {
  count: number;
  step: number;
}

// 2. 定义 Action 类型
type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'RESET' };

// 3. 创建 reducer 函数
function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

// 4. 在组件中使用
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { 
    count: 0, 
    step: 1 
  });

  return (
    <div>
      <p>计数: {state.count}</p>
      <p>步长: {state.step}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        增加
      </button>
      <button onClick={() => dispatch({ type: 'SET_STEP', payload: 5 })}>
        设置步长为 5
      </button>
    </div>
  );
}`}
          title="useReducer 基本结构"
          description="reducer 函数接收当前状态和 action，返回新状态"
        />
      </section>

      <section className="doc-section">
        <h2>3. 实时演示</h2>
        <UseReducerDemo />
      </section>

      <section className="doc-section">
        <h2>4. useReducer vs useState</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>useState</th>
                <th>useReducer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>适用场景</td>
                <td>简单状态</td>
                <td>复杂状态</td>
              </tr>
              <tr>
                <td>状态更新逻辑</td>
                <td>分散在各处理函数中</td>
                <td>集中在 reducer 中</td>
              </tr>
              <tr>
                <td>状态关联性</td>
                <td>多个状态独立</td>
                <td>状态相互关联</td>
              </tr>
              <tr>
                <td>调试</td>
                <td>较难追踪</td>
                <td>可以使用 Redux DevTools</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="doc-section">
        <h2>5. 实际应用场景</h2>
        <div className="scenarios">
          <div className="scenario">
            <h4>场景一：表单处理</h4>
            <CodeBlock
              code={`interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

type FormAction = 
  | { type: 'SET_VALUE'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SET_TOUCHED'; field: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_END' }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' }
      };
    // ... 其他 action 处理
    default:
      return state;
  }
}`}
            />
          </div>
          <div className="scenario">
            <h4>场景二：Todo 应用</h4>
            <CodeBlock
              code={`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'SET_FILTER'; filter: TodoState['filter'] }
  | { type: 'CLEAR_COMPLETED' };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.text,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    // ... 其他 action
    default:
      return state;
  }
}`}
            />
          </div>
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

export default UseReducer;
