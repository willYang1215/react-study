import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

// 懒加载组件
const ProjectSetup = lazy(() => import('./docs/getting-started/ProjectSetup'));
const FirstComponent = lazy(() => import('./docs/getting-started/FirstComponent'));
const JSX = lazy(() => import('./docs/getting-started/JSX'));
const RoutingIntro = lazy(() => import('./docs/routing/RoutingIntro'));
const BasicRouting = lazy(() => import('./docs/routing/BasicRouting'));
const DynamicRouting = lazy(() => import('./docs/routing/DynamicRouting'));
const ReduxIntro = lazy(() => import('./docs/state-management/ReduxIntro'));
const UseState = lazy(() => import('./docs/hooks/UseState'));
const UseMemo = lazy(() => import('./docs/hooks/UseMemo'));
const UseCallback = lazy(() => import('./docs/hooks/UseCallback'));
const UseReducer = lazy(() => import('./docs/hooks/UseReducer'));

// 加载状态组件
function Loading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      fontSize: '18px',
      color: '#666'
    }}>
      加载中...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/docs" element={<Layout />}>
            <Route index element={<Navigate to="/docs/getting-started/project-setup" replace />} />
            <Route path="getting-started">
              <Route index element={<Navigate to="/docs/getting-started/project-setup" replace />} />
              <Route path="project-setup" element={<ProjectSetup />} />
              <Route path="first-component" element={<FirstComponent />} />
              <Route path="jsx" element={<JSX />} />
            </Route>
            
            <Route path="routing">
              <Route index element={<Navigate to="/docs/routing/intro" replace />} />
              <Route path="intro" element={<RoutingIntro />} />
              <Route path="basic" element={<BasicRouting />} />
              <Route path="dynamic" element={<DynamicRouting />} />
            </Route>
            
            <Route path="state-management">
              <Route index element={<Navigate to="/docs/state-management/redux-intro" replace />} />
              <Route path="redux-intro" element={<ReduxIntro />} />
            </Route>
            
            <Route path="hooks">
              <Route index element={<Navigate to="/docs/hooks/useState" replace />} />
              <Route path="useState" element={<UseState />} />
              <Route path="useMemo" element={<UseMemo />} />
              <Route path="useCallback" element={<UseCallback />} />
              <Route path="useReducer" element={<UseReducer />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
