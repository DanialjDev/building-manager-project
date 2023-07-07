'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import CreatePollForm from '@/components/CreatePollForm';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { InitialValues } from '@/types/userInputTypes';
import { createQuestionHandler } from '@/redux/features/pollSlice';
import Cookies from 'js-cookie';
import { Field } from 'formik';

const CreatePoll = () => {
   const dispatch = useAppDispatch();
   const { back } = useRouter();
   const token = Cookies.get('access_token');

   const createQuestion = (values: InitialValues) => {
      if (token) {
         dispatch(createQuestionHandler({ token, values, back }));
      }
   };
   return (
      <div className="w-full h-full flex flex-col">
         <CreatePollForm
            action="create-question"
            title="ایجاد سوال"
            onSubmit={createQuestion}
         >
            <Input
               name="question_text"
               className="!w-[500px]"
               placeholder="سوال"
            />
         </CreatePollForm>
      </div>
   );
};

export default CreatePoll;
