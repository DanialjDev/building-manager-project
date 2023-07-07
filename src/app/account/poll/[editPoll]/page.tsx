'use client';

import CreatePollForm from '@/components/CreatePollForm';
import Input from '@/components/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
   createChoiceHandler,
   getChoicesHandler,
   getQuestionsHandler,
   getSelectedQuestion,
} from '@/redux/features/pollSlice';
import { InitialValues } from '@/types/userInputTypes';
import Cookies from 'js-cookie';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditPoll = () => {
   const dispatch = useAppDispatch();
   const { selectedQuestion } = useAppSelector((state) => state.poll);

   const { editPoll } = useParams();

   const token = Cookies.get('access_token');

   useEffect(() => {
      const fetchSelectedQuestion = async () => {
         if (token) {
            await dispatch(getChoicesHandler(token));
            await dispatch(getQuestionsHandler(token));
            dispatch(getSelectedQuestion(editPoll));
         }
      };
      fetchSelectedQuestion();
   }, []);

   const submitHandler = (values: InitialValues) => {
      const data = {
         ...values,
         question: selectedQuestion.id,
      };
      if (token) {
         dispatch(createChoiceHandler({ token, data }));
         dispatch(getChoicesHandler(token));
      }
   };

   return (
      <div className="w-full h-full flex">
         <CreatePollForm
            action="create-choice"
            title={`اضافه کردن گزینه به ${selectedQuestion.question_text}`}
            onSubmit={submitHandler}
         >
            <Input
               className="!w-[500px]"
               name="choice_text"
               placeholder="متن گزینه"
            />
         </CreatePollForm>
      </div>
   );
};

export default EditPoll;
