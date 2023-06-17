'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { userRegisterHandler } from '@/redux/handlers/user';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { InitialValues, LoginInitialValues } from '@/types/types';
import { useRouter } from 'next/navigation';
import React from 'react';

const Register = () => {
   const disptch = useAppDispatch();
   const { push } = useRouter();

   const submitHandler = (values: InitialValues) => {};
   return (
      <FormContainer
         action="register"
         title="ثبت نام"
         onSubmit={(values: InitialValues) => {
            disptch(
               userRegisterHandler({
                  userData: values,
                  push,
                  password: (values as LoginInitialValues).password,
               })
            );
         }}
      >
         <Input name="username" placeholder="نام کاربری" />
         <Input name="password" placeholder="رمز عبور" />
      </FormContainer>
   );
};

export default Register;
