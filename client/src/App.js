import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading/loading';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewHome = React.lazy(() => import('./pages/viewHome'));
const ViewAuth = React.lazy(() => import('./pages/viewAuth'));
const ViewDetail = React.lazy(() => import('./pages/viewDetail'));
const ViewProfile = React.lazy(() => import('./pages/viewProfile'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/signup" element={<ViewAuth type="signup" />} />
          <Route path="/signin" element={<ViewAuth type="signin" />} />
          <Route path="/product/:productId" element={<ViewDetail />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
