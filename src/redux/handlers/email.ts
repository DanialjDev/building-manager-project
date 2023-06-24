import { createAsyncThunk } from '@reduxjs/toolkit';
import { verifyCode, verifyEmail } from '../services/userServices';
import Swal from 'sweetalert2';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';

export const verifyEmailHandler = createAsyncThunk(
   'user/verify-email',
   async ({ userId, token }: { userId: string; token: string }) => {
      try {
         const { status, data } = await verifyEmail(userId, token);

         if (status === 201) {
            Swal.fire({
               toast: true,
               title: 'کد تایید به ایمیل شما ارسال شد',
               icon: 'success',
               timer: 3500,
               position: 'top',
               color: 'green',
            });
            return data;
         }
      } catch (e) {
         console.log(e);
      }
   }
);

export const verifyCodeHandler = createAsyncThunk(
   'user/verify-code',
   async ({
      userId,
      push,
      token,
   }: {
      userId: string;
      push: (href: string, options?: NavigateOptions | undefined) => void;
      token: string;
   }) => {
      try {
         const { status, data } = await verifyCode(userId!, token!);

         if (status === 200) {
            Swal.fire({
               title: 'ثبت نام موفقیت آمیز بود',
               icon: 'success',
               timer: 2500,
               buttonsStyling: true,
               confirmButtonColor: '#c00',
            });
            push('/');
         }
      } catch (e) {
         Swal.fire({
            title: 'کد وارد شده نامعتبر است یا قبلا استفاده شده است',
            icon: 'error',
            timer: 3000,
         });
      }
   }
);
