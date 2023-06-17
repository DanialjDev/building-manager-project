'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { userSetInfoHandler } from '@/redux/handlers/user';
import { InitialValues } from '@/types/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React from 'react';

const UserInfoPage = () => {
   const dispatch = useAppDispatch();
   const { push } = useRouter();
   const userId = localStorage.getItem('id');
   const token = Cookies.get('access_token');

   const submitHandler = (userData: InitialValues) => {
      if (userId && token)
         dispatch(userSetInfoHandler({ userData, push, token, userId }));
   };
   return (
      <FormContainer
         action="set-user-info"
         title="اطلاعات شخصی"
         onSubmit={submitHandler}
      >
         <Input name="first_name" placeholder="نام" />
         <Input name="last_name" placeholder="نام خانوادگی" />
         <Input name="email" placeholder="ایمیل" />
         <Input name="phone" placeholder="شماره موبایل" />
      </FormContainer>
   );
};

export default UserInfoPage;
