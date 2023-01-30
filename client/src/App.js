import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading/loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { $userIsLoggedIn } from './redux/selector';

const ViewAuth = React.lazy(() => import('./pages/viewAuth'));

function App() {
  const dispatch = useDispatch();
  // const userIsLoggedIn = useSelector($userIsLoggedIn);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/signup" element={<ViewAuth type="signup" />} />
          <Route path="/signin" element={<ViewAuth type="signin" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
