'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { userLoginHandler } from '@/redux/features/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { InitialValues } from '@/types/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';

const Login = () => {
   const dispatch = useAppDispatch();
   const { push } = useRouter();
   const token = Cookies.get('access_token');
   const userId = localStorage.getItem('id');

   const loginSubmitHandler = (userData: InitialValues) => {
      if (token && userId) {
         console.log('fsff');
         dispatch(userLoginHandler({ userData, push, token, userId }));
      }
   };
   return (
      <FormContainer action="login" onSubmit={loginSubmitHandler} title="ورود">
         <Input name="username" placeholder="نام کاربری" />
         <Input name="password" placeholder="رمز عبور" />
      </FormContainer>
   );
};

export default Login;
