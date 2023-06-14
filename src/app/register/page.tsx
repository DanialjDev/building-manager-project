'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { userRegisterHandler } from '@/redux/features/userSlice';
import { useAppDispatch } from '@/redux/hooks';
import { InitialValues } from '@/types/types';
import { useRouter } from 'next/navigation';
import React from 'react';

const Register = () => {
   const disptch = useAppDispatch();
   const { push } = useRouter();
   return (
      <FormContainer
         action="register"
         title="ثبت نام"
         onSubmit={(values: InitialValues) =>
            disptch(userRegisterHandler({ userData: values, push }))
         }
      >
         <Input name="username" placeholder="نام کاربری" />
         <Input name="password" placeholder="رمز عبور" />
         <Input name="email" placeholder="ایمیل" />
      </FormContainer>
   );
};

export default Register;
