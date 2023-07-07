'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getQuestionsHandler } from '@/redux/features/pollSlice';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { AiOutlineEdit, AiFillPlusCircle } from 'react-icons/ai';

const Question = ({ text, id }: { text: string; id: number }) => {
   return (
      <div className="w-full flex items-center justify-between border-2 border-red rounded-md p-3 mt-5">
         <Link href={`/account/poll/${id}`} className="text-lg">
            {text}
         </Link>
         <AiOutlineEdit className="text-red cursor-pointer" size={23} />
      </div>
   );
};

const Title = ({ title }: { title: string }) => {
   return <div></div>;
};

const PollPage = () => {
   const dispatch = useAppDispatch();
   const { questions } = useAppSelector((state) => state.poll);
   const token = Cookies.get('access_token');

   useEffect(() => {
      if (token) dispatch(getQuestionsHandler(token));
   }, []);
   return (
      <div className="w-full h-full flex flex-col items-center">
         <div className="w-full flex justify-center items-center">
            <h3 className="text-3xl text-center">سوالات ایجاد شده</h3>
         </div>
         <div className="w-[50%] flex flex-col items-center mt-10">
            {questions.map((poll) => (
               <Question key={poll.id} id={poll.id} text={poll.question_text} />
            ))}
         </div>
         <Link
            href="/account/poll/create-question"
            className="w-[50%] mt-8 flex items-center"
         >
            <p className="text-xl text-center">اضافه کردن سوال جدید</p>
            <AiFillPlusCircle size={22} className="mr-2 text-red" />
         </Link>
      </div>
   );
};

export default PollPage;
