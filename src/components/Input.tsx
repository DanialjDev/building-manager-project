import React from 'react';
import { ErrorMessage, Field } from 'formik';

const Input = ({
   placeholder,
   name,
}: {
   placeholder?: string;
   name: string;
}) => {
   return (
      <div className='w-full flex justify-center px-5 my-1 relative'>
         <Field
            className={`w-full border border-gray-300 rounded-md p-1 my-4 outline-none`}
            type='text'
            placeholder={placeholder}
            id={name}
            name={name}
         />
         <ErrorMessage
            name={name}
            render={(name) => (
               <p className='absolute text-[16px] bottom-[-6px] right-5 text-rose-500'>
                  {name}
               </p>
            )}
         />
      </div>
   );
};

export default Input;
