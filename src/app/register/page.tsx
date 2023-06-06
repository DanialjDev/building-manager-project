'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { InitialValues } from '@/types/types';
import React from 'react';

const Register = () => {
   return (
      <FormContainer
         action='register'
         title='ثبت نام'
         onSubmit={(values: InitialValues) => console.log(values)}>
         <Input name='username' placeholder='نام کاربری' />
         <Input name='password' placeholder='رمز عبور' />
         <Input name='email' placeholder='ایمیل' />
      </FormContainer>
   );
};

export default Register;
