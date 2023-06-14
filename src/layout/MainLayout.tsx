'use client';

import { getUserInfoHandler } from '@/redux/features/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const dispatch = useAppDispatch();

   const token = Cookies.get('access_token');
   const userId = localStorage.getItem('id');

   useEffect(() => {
      if (userId && token) {
         console.log(userId);
         dispatch(getUserInfoHandler({ userId, token }));
      }
   }, []);
   return <>{children}</>;
};

export default MainLayout;
