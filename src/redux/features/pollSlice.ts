import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createQuestion } from '../services/poll';
import { InitialValues } from '@/types/types';
import Swal from 'sweetalert2';

const initialState: any = {};

export const createQuestionHandler = createAsyncThunk(
   'poll/create-question',
   async ({ token, values }: { token: string; values: InitialValues }) => {
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
         }
      } catch (e) {
         console.log(e);
      }
   }
);

const pollSlice = createSlice({
   name: 'poll',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(createQuestionHandler.fulfilled, (_, action) => {
         console.log(action);
      });
   },
});
