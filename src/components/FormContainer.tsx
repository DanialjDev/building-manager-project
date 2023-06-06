'use client';

import useValidation from '@/hooks/useValidation';
import { InitialValues, ValidationSchemaType } from '@/types/types';
import { Formik, Form } from 'formik';
import React, { ReactNode } from 'react';

interface FormProps {
   action: 'login' | 'register';
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
   const [initialValues, validationSchema] = useValidation(action) as [
      initialValues: InitialValues,
      validationSchema: ValidationSchemaType
   ];
   return (
      <div className='w-full h-screen flex justify-center items-center relative'>
         <div className='w-[500px] border-2 shadow-md mt-16 py-5 rounded-lg'>
            <div className='w-full flex justify-center items-center'>
               <h3 className='text-center text-lg'>{title}</h3>
            </div>
            <Formik
               onSubmit={onSubmit}
               initialValues={initialValues}
               validationSchema={validationSchema}>
               <Form>
                  {children}
                  <div className='w-full flex justify-center items-center mt-4'>
                     <button
                        className='bg-slate-800 w-[50%] p-3 text-white rounded-lg'
                        type='submit'>
                        {title}
                     </button>
                  </div>
               </Form>
            </Formik>
         </div>
      </div>
   );
};

export default FormContainer;
