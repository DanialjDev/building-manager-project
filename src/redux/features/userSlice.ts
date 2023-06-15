import { InitialValues, User } from '@/types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
   getToken,
   getUserInfo,
   userLogin,
   userRegister,
} from '../services/userServices';
import axios from 'axios';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';

interface RegisterProps {
   userData: InitialValues;
   token?: string;
   userId?: string;
   push: (href: string, options?: NavigateOptions | undefined) => void;
}

const initialState: User = {
   instances: {
      id: 0,
      is_manager: false,
      is_resident: false,
      last_login: null,
      is_superuser: false,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      is_staff: false,
      is_active: false,
      date_joined: '',
      phone: null,
      role: '',
      is_phone_activated: false,
      is_email_activated: false,
   },
};

// Register (step 1)
export const userRegisterHandler = createAsyncThunk(
   'user/register',
   async ({ userData, push }: RegisterProps, { dispatch }) => {
      try {
         // send request to server
         const { data, status } = await userRegister(userData);
         if (status === 201) {
            Swal.fire({
               title: 'شما با موفقیت وارد شدید',
               icon: 'success',
            });
            localStorage.setItem('id', String(data.instances.id));
            await dispatch(getTokenHandler());
            push('/validation-code');
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

// Get User Token
export const getTokenHandler = createAsyncThunk('user/get-token', async () => {
   try {
      // send request to server
      const { data, status } = await getToken();
      if (status === 200) {
         // set the access and refresh token
         Cookie.set('access_token', data.access);
         Cookie.set('refresh_token', data.refresh);
      }
   } catch (e) {
      if (axios.isAxiosError(e)) {
         console.log(e);
      }
   }
});

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

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(userRegisterHandler.fulfilled, (_, action) => action.payload)
         .addCase(getUserInfoHandler.fulfilled, (_, action) => action.payload);
   },
});

export default userSlice.reducer;
