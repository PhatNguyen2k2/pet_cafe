import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading/loading';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewSignUp = React.lazy(() => import('./pages/Auth/signUp'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/signup" element={<ViewSignUp />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
