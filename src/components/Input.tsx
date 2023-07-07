import React from 'react';
import { ErrorMessage, Field } from 'formik';

const Input = ({
   placeholder,
   name,
   className,
   disabled,
   value,
}: {
   placeholder?: string;
   name: string;
   className?: string;
   disabled?: boolean;
   value?: string;
}) => {
   return (
      <div
         className={`${className} w-full flex justify-center px-5 my-3 relative`}
      >
         <Field
            className={`w-full shadow-lg rounded-full p-2 my-4 outline-none placeholder:text-[#cc00009a]`}
            type="text"
            placeholder={placeholder}
            id={name}
            name={name}
            value={value}
            disabled={disabled}
         />
         <ErrorMessage
            name={name}
            render={(name) => (
               <p className="absolute text-[16px] bottom-[-12px] right-7 text-red">
                  {name}
               </p>
            )}
         />
      </div>
   );
};

export default Input;
