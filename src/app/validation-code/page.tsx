'use client';

import FormContainer from '@/components/FormContainer';
import Input from '@/components/Input';
import { InitialValues } from '@/types/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const ValidationCode = () => {
   const userToken = Cookies.get('access_token');
   const { push } = useRouter();
   useEffect(() => {
      if (!userToken) {
         push('/');
      }
   }, []);
   return (
      <FormContainer
         action="validation-code"
         title="تایید کد"
         onSubmit={(values: InitialValues) => console.log(values)}
      >
         <Input name="validationCode" placeholder="کد تایید" />
      </FormContainer>
   );
};

export default ValidationCode;
