import { EmailVerification } from '@/types/userInputTypes';
import { createSlice } from '@reduxjs/toolkit';
import { verifyEmailHandler } from '../handlers/email';

const initialState: EmailVerification = {
   instances: {
      code: 0,
      expire_date: '',
      id: 0,
      otp_for: 'EMAIL',
      used: false,
      user: 0,
   },
};

const emailSlice = createSlice({
   name: 'email',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         verifyEmailHandler.fulfilled,
         (_, action) => action.payload
      );
   },
});

export default emailSlice.reducer;
