import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
import { InitialValues } from '@/types/userInputTypes';
import {
   getUserToken,
   getUserInfo,
   userLogin,
   userRegister,
   userSetInfo,
} from '../services/userServices';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import { verifyEmailHandler } from './email';

interface RegisterProps {
   userData: InitialValues;
   token?: string;
   userId?: string;
   password: string;
   push: (href: string, options?: NavigateOptions | undefined) => void;
}

// Register (step 1)
export const userRegisterHandler = createAsyncThunk(
   'user/register',
   async ({ userData, push, password }: RegisterProps, { dispatch }) => {
      try {
         // send request to server
         const { data, status } = await userRegister(userData);
         if (status === 201) {
            console.log(data);

            localStorage.setItem('password', password!);
            localStorage.setItem('id', String(data.instances.id));
            await dispatch(
               getUserTokenHandler({
                  username: data.instances.username,
                  password,
               })
            );
            push('/register/user-info');
            // return the response data to update the user state
            return data;
         }
      } catch (e) {
         if (axios.isAxiosError(e)) {
            if (e.response?.status === 400) {
               // if user exists
               if (
                  e.response?.data.errors ===
                  'UNIQUE constraint failed: users_user.username'
               ) {
                  Swal.fire({
                     title: 'کاربر با این مشخصات وجود دارد',
                     icon: 'warning',
                  });
               }
            }
         }
      }
   }
);

// Register step 2
export const userSetInfoHandler = createAsyncThunk(
   'user/user-set-info',
   async ({ userData, push, token, userId }: RegisterProps, { dispatch }) => {
      try {
         console.log(userData);

         const { data, status } = await userSetInfo(userData, userId!, token!);

         if (status === 200) {
            if (userId && token) {
               await dispatch(verifyEmailHandler({ userId, token }));
            }
            push('/verify-email');
            return data;
         }
      } catch (e) {}
   }
);

// Get Admin Token
export const getUserTokenHandler = createAsyncThunk(
   'user/get-token',
   async ({ username, password }: { username: string; password: string }) => {
      try {
         // send request to server
         const { data, status } = await getUserToken(username, password);
         if (status === 200) {
            // set the access and refresh token
            Cookies.set('access_token', data.access, { expires: 5 });
            Cookies.set('refresh_token', data.refresh, { expires: 7 });

            localStorage.removeItem('password');
         }
      } catch (e) {}
   }
);

// Get User Info
export const getUserInfoHandler = createAsyncThunk(
   'user/get-user-info',
   async ({ userId, token }: { userId: string; token: string }) => {
      try {
         // send request to server
         const { data, status } = await getUserInfo(userId, token);
         if (status === 200) {
            // return the response data to update the user state
            return data;
         }
      } catch (e) {}
   }
);

// Login
export const userLoginHandler = createAsyncThunk(
   'user/login',
   async ({ userData, token, push, userId }: RegisterProps, { dispatch }) => {
      try {
         // send request to server
         const { status } = await userLogin(userData, token!);
         if (status === 200) {
            if (userId && token) {
               Swal.fire({
                  title: 'شما با موفقیت وارد شدید',
                  icon: 'success',
               });
               // get the user information
               await dispatch(getUserInfoHandler({ userId, token }));
               push('/');
            }
         }
      } catch (e) {
         if (axios.isAxiosError(e)) {
            // if username and password doesn't match
            if (e.response?.status === 404 || e.response?.status === 401) {
               Swal.fire({
                  title: 'اطلاعات وارد شده نادرست است',
                  icon: 'error',
               });
            }
         }
      }
   }
);
