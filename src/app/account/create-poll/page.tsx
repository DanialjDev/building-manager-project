'use client';

import React from 'react';
import Input from '@/components/Input';
import CreatePollForm from '@/components/CreatePollForm';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { InitialValues } from '@/types/types';
import { createQuestionHandler } from '@/redux/features/pollSlice';
import Cookies from 'js-cookie';

const CreatePoll = () => {
   const dispatch = useAppDispatch();
   const token = Cookies.get('access_token');

   const createQuestion = (values: InitialValues) => {
      if (token) {
         dispatch(createQuestionHandler({ token, values }));
      }
   };
   return (
      <>
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
      </>
   );
};

export default CreatePoll;
