import React, { useEffect, useState, useRef, Suspense } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Auth from './pages/auth/Index';
import Chat from './pages/chat/Index';
import Profile from './pages/profile/Index';
import { useAppStore } from './store/Index';
import { apiClient } from './lib/api-client';
import { GET_USER_INFO } from './utils/constants';
import HypnoticLoader from './utils/HypnoticLoader';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  return userInfo ? children : <Navigate to='/auth' />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  return userInfo ? <Navigate to='/chat' /> : children;
};

function App() {
  const { setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  const fetchedData = useRef(false);

  useEffect(() => {
    if (fetchedData.current) return;
    fetchedData.current = true;

    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.log(error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [setUserInfo]); // ✅ Removed `userInfo` dependency

  if (loading) {
    return <HypnoticLoader />;
  }

  return (
    <Suspense fallback={<HypnoticLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          } />
          <Route path='/chat' element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } />
          <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;