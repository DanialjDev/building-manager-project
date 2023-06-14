import { InitialValues, User } from '@/types/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getToken, userRegister } from '../services/userServices';
import axios from 'axios';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
import Cookie from 'js-cookie';
import Swal from 'sweetalert2';

interface RegisterProps {
   userData: InitialValues;
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
   async ({ userData, push }: RegisterProps, { rejectWithValue, dispatch }) => {
      try {
         const { data, status } = await userRegister(userData);
         if (status === 201) {
            Swal.fire({
               title: 'شما با موفقیت وارد شدید',
               icon: 'success',
            });
            await dispatch(getTokenHandler());
            push('/validation-code');
            return data;
         }
      } catch (e) {
         if (axios.isAxiosError(e)) {
            if (e.response?.status === 400) {
               if (
                  e.response?.data.errors ===
                  'UNIQUE constraint failed: users_user.username'
               ) {
                  return rejectWithValue(e.response.data.errors);
               }
            }
         }
      }
   }
);

// get user token
export const getTokenHandler = createAsyncThunk('user/get-token', async () => {
   try {
      const { data, status } = await getToken();
      if (status === 200) {
         return data;
      }
   } catch (e) {
      if (axios.isAxiosError(e)) {
         console.log(e);
      }
   }
});

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(userRegisterHandler.fulfilled, (_, action) => action.payload)
         .addCase(getTokenHandler.fulfilled, (_, action) => {
            if (action.payload) {
               Cookie.set('access_token', action.payload?.access);
               Cookie.set('refresh_token', action.payload?.refresh);
            }
         });
   },
});

export default userSlice.reducer;
