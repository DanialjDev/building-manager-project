import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
   createChoice,
   createQuestion,
   getChoices,
   getQuestions,
} from '../services/poll';
import { InitialValues } from '@/types/userInputTypes';
import Swal from 'sweetalert2';
import { Polls } from '@/types/pollsTypes';

const initialState: Polls = {
   questions: [],
   selectedQuestion: {
      id: 0,
      created_at: '',
      pub_date: '',
      question_text: '',
   },
   choices: [],
};

export const createQuestionHandler = createAsyncThunk(
   'poll/create-question',
   async ({
      token,
      values,
      back,
   }: {
      token: string;
      values: InitialValues;
      back: () => void;
   }) => {
      try {
         const data = {
            ...values,
            pub_date: new Date(),
         };
         const { status } = await createQuestion(token, data);
         if (status === 200) {
            Swal.fire({
               title: 'سوال با موفقیت ثبت شد',
               icon: 'success',
               confirmButtonText: 'بستن',
            });
            back();
         }
      } catch (e) {
         console.log(e);
      }
   }
);

export const getQuestionsHandler = createAsyncThunk(
   'poll/get-questions',
   async (token: string) => {
      try {
         const { data, status } = await getQuestions(token);

         if (status === 200) {
            return data;
         }
      } catch (e) {
         console.log(e);
      }
   }
);

export const createChoiceHandler = createAsyncThunk(
   'poll/create-choice',
   async ({ token, data }: { token: string; data: InitialValues }) => {
      try {
         const { status } = await createChoice(token, data);

         if (status === 200) {
            Swal.fire({
               title: 'گزینه با موفقیت اضافه شد',
               icon: 'success',
               confirmButtonText: 'بستن',
            });
         }
      } catch (e) {}
   }
);

export const getChoicesHandler = createAsyncThunk(
   'poll/get-choice',
   async (token: string) => {
      try {
         const { data, status } = await getChoices(token);

         if (status === 200) {
            return data;
         }
      } catch (e) {
         console.log(e);
      }
   }
);

const pollSlice = createSlice({
   name: 'poll',
   initialState,
   reducers: {
      getSelectedQuestion: (state, action) => {
         const [question] = state.questions.filter(
            (q) => q.id === Number(action.payload)
         );
         Object.assign(state.selectedQuestion, question);
         console.log(question);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getQuestionsHandler.fulfilled, (state, action) => {
            Object.assign(state.questions, action.payload);
         })
         .addCase(getChoicesHandler.fulfilled, (state, action) => {
            Object.assign(state.choices, action.payload);
         });
   },
});

export const { getSelectedQuestion } = pollSlice.actions;

export default pollSlice.reducer;
