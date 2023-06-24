'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useValidation from '@/hooks/useValidation';
import { verifyEmailHandler } from '@/redux/handlers/email';
import { InitialValues, ValidationSchemaType } from '@/types/types';
import { Formik, Form } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

interface FormProps {
   action: 'login' | 'register' | 'validation-code' | 'set-user-info';
   title: string;
   onSubmit: (values: InitialValues) => void;
   children: ReactNode;
}

const FormContainer: React.FC<FormProps> = ({
   action,
   title,
   onSubmit,
   children,
}) => {
   const dispatch = useAppDispatch();
   const { push } = useRouter();
   const [initialValues, validationSchema] = useValidation(action) as [
      initialValues: InitialValues,
      validationSchema: ValidationSchemaType
   ];

   const token = Cookies.get('access_token');
   const userId = localStorage.getItem('id');
   const { is_email_activated, is_phone_activated } = useAppSelector(
      (state) => state.user.instances
   );
   useEffect(() => {
      if (token && (is_email_activated || is_phone_activated)) {
         push('/');
      }
   }, []);

   const reVerifyEmail = () => {
      if (token && userId) {
         dispatch(verifyEmailHandler({ token, userId }));
      }
   };
   return (
      <div className="w-full h-screen flex justify-center items-center relative">
         <div className="w-[500px] border-2 shadow-md mt-16 py-5 rounded-lg">
            <div className="w-full flex justify-center items-center">
               <h3 className="text-center text-lg">{title}</h3>
            </div>
            <Formik
               onSubmit={onSubmit}
               initialValues={initialValues}
               validationSchema={validationSchema}
            >
               <Form>
                  {children}
                  <div className="w-full flex flex-col justify-center items-center mt-4">
                     <button
                        className="bg-slate-800 w-[50%] p-3 text-white rounded-lg"
                        type="submit"
                     >
                        {title}
                     </button>
                     {action === 'validation-code' && (
                        <button
                           type="button"
                           onClick={reVerifyEmail}
                           className="bg-slate-800 w-[50%] p-3 text-white rounded-lg flex justify-center my-3"
                        >
                           ارسال مجدد کد
                        </button>
                     )}
                  </div>
               </Form>
            </Formik>
         </div>
      </div>
   );
};

export default FormContainer;
