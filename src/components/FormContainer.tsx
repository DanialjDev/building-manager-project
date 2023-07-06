'use client';

import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import useValidation from '@/hooks/useValidation';
import { verifyEmailHandler } from '@/redux/handlers/email';
import { InitialValues, ValidationSchemaType } from '@/types/types';
import { Formik, Form } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

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
   const { is_email_activated } = useAppSelector(
      (state) => state.user.instances
   );
   useEffect(() => {
      if (token && is_email_activated) {
         push('/');
      }
   }, []);

   const reVerifyEmail = () => {
      if (token && userId) {
         dispatch(verifyEmailHandler({ token, userId }));
      }
   };
   return (
      <div className="w-full h-screen bg-light-gray flex items-center relative px-10 overflow-hidden before:bg-[url('/images/photo-1.png')] before:w-[800px] before:h-[800px] before:absolute before:bg-no-repeat before:-left-[300px] before:bottom-0 before:bg-left-bottom before:origin-bottom-left before:scale-[3] before:blur-sm">
         <p className="absolute left-[350px] bottom-[168px] font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-black via-red to-black">
            سامانه مدیریت ساختمان
         </p>
         <div className="w-[35%] z-20 h-[80%] flex justify-center items-center">
            <div className="w-[500px] mt-16 py-5 rounded-lg">
               <div className="w-full flex justify-start items-center px-6 mb-10 relative">
                  <h3 className="text-xl border-b-2 border-dark-gray text-red">
                     {title}
                  </h3>
               </div>
               <Formik
                  onSubmit={onSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
               >
                  <Form>
                     {children}
                     <div className="w-full flex flex-col justify-center items-center mt-12">
                        <button
                           className="bg-slate-800 w-[50%] p-3 text-white bg-red rounded-full"
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
                        {action === 'login' && (
                           <Link
                              href={'/register'}
                              className="bg-slate-800 w-[50%] p-3 text-red rounded-lg flex justify-center my-3"
                           >
                              ثبت نام
                           </Link>
                        )}
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </div>
   );
};

export default FormContainer;
