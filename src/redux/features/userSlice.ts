import { InitialValues, User } from '@/types/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userRegister } from '../services/userServices';
import axios from 'axios';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';

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

export const userRegisterHandler = createAsyncThunk(
   'user/register',
   async ({ userData, push }: RegisterProps, { rejectWithValue }) => {
      try {
         const { data, status } = await userRegister(userData);
         if (status === 201) {
            push('/');
            return data;
         }
      } catch (e) {
         if (axios.isAxiosError(e)) {
            return rejectWithValue(e);
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
         .addCase(userRegisterHandler.rejected, (_, action) => {
            console.log(action.payload);
         });
   },
});

export default userSlice.reducer;
