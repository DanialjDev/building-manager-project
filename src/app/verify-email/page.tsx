'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { verifyCodeHandler, verifyEmailHandler } from '@/redux/handlers/email';
import {
   InitialValues,
   ValidationCodeInitialValues,
} from '@/types/userInputTypes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const VerifyEmail = () => {
   const dispatch = useAppDispatch();
   const { code } = useAppSelector((state) => state.email.instances);

   const token = Cookies.get('access_token');
   const userId = localStorage.getItem('id');
   const { push } = useRouter();
   useEffect(() => {
      if (!token) {
         push('/');
      }
      if (token && userId) {
         dispatch(verifyEmailHandler({ token, userId }));
      }
   }, []);

   const submitHandler = (values: InitialValues) => {
      const validationCode = (values as ValidationCodeInitialValues)
         .validationCode;
      if (userId && token) {
         if (Number(validationCode) === code)
            dispatch(
               verifyCodeHandler({
                  push,
                  userId,
                  token,
               })
            );
         else
            Swal.fire({
               title: 'کد وارد شده صحیح نیست',
               timer: 2500,
               toast: true,
               icon: 'error',
            });
      }
   };
   return (
      <FormContainer
         action="validation-code"
         title="تایید کد"
         onSubmit={submitHandler}
      >
         <Input name="validationCode" placeholder="کد تایید" />
      </FormContainer>
   );
};

export default VerifyEmail;
