import { InitialValues, ValidationSchemaType } from '@/types/types';
import { Form, Formik } from 'formik';
import React, { ReactNode } from 'react';
import useValidation from '@/hooks/useValidation';

const CreatePollForm = ({
   action,
   children,
   title,
   onSubmit,
}: {
   action: 'create-question';
   children: ReactNode;
   title: string;
   onSubmit: (values: InitialValues) => void;
}) => {
   const [initialValues, validationSchema] = useValidation(action) as [
      InitialValues: InitialValues,
      validationSchema: ValidationSchemaType
   ];
   return (
      <div className="w-full h-full flex flex-col">
         <div className="w-full flex justify-center items-center">
            <h2 className="text-center text-3xl">{title}</h2>
         </div>
         <div className="flex w-full justify-center mt-10">
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={onSubmit}
            >
               <Form className="w-[60%] flex justify-around items-center">
                  {children}
                  <div className="flex justify-center items-center">
                     <button
                        type="submit"
                        className="w-[150px] py-2 text-center rounded-md bg-red text-white"
                     >
                        ثبت
                     </button>
                  </div>
               </Form>
            </Formik>
         </div>
      </div>
   );
};

export default CreatePollForm;
