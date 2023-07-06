'use client';

import { getUserInfoHandler } from '@/redux/handlers/user';
import { useAppDispatch } from '@/hooks/reduxHooks';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';

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
   return (
      <div className="w-full h-screen bg-light-gray">
         <Navbar />

         {children}
      </div>
   );
};

export default MainLayout;
