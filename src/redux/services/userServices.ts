import { EmailVerification, InitialValues, User } from '@/types/types';
import axios from './axios';

// User Register (step 1)
export const userRegister = (data: InitialValues) => {
   return axios.post<User>('users/', JSON.stringify(data));
};

// User Register (step 2)
export const userSetInfo = (data: InitialValues, id: string, token: string) =>
   axios.put<User>(`users/${id}/`, JSON.stringify(data), {
      headers: {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
      },
   });

// Get Token
export const getUserToken = (username: string, password: string) =>
   axios.post<{ refresh: string; access: string }>(
      'users/token/',
      JSON.stringify({
         username,
         password,
      })
   );

// Get User Info
export const getUserInfo = (id: string, token: string) =>
   axios.get<User>(`users/${id}/`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

// User Login
export const userLogin = (data: InitialValues, token: string) =>
   axios.post<User>('users/login/', JSON.stringify(data), {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

// Verify Email
export const verifyEmail = (id: string, token: string) =>
   axios.post<EmailVerification>(
      `users/${id}/send_verification/`,
      JSON.stringify({
         otp_for: 'EMAIL',
      }),
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );

// Verify Code
export const verifyCode = (id: string, token: string) =>
   axios.post(
      `users/${id}/verification/`,
      JSON.stringify({
         otp_for: 'EMAIL',
         otp: id,
      }),
      {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      }
   );
