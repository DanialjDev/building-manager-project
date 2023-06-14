'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { InitialValues } from '@/types/types';
import React from 'react';

const Login = () => {
   return (
      <FormContainer
         action='login'
         onSubmit={(values: InitialValues) => console.log(values)}
         title='ورود'>
         <Input name='username' placeholder='نام کاربری' />
         <Input name='password' placeholder='رمز عبور' />
      </FormContainer>
   );
};

export default Login;
