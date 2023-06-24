import { EmailVerification, User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';
import {
   getUserInfoHandler,
   userRegisterHandler,
   userSetInfoHandler,
} from '../handlers/user';

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

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(userRegisterHandler.fulfilled, (_, action) => action.payload)
         .addCase(getUserInfoHandler.fulfilled, (_, action) => action.payload)
         .addCase(userSetInfoHandler.fulfilled, (_, action) => action.payload);
   },
});

export default userSlice.reducer;
