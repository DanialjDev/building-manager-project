import { InitialValues, User } from '@/types/types';
import axios from './axios';

// User Register
export const userRegister = (data: InitialValues) =>
   axios.post<User>('users/', JSON.stringify(data));

// Get Token
export const getToken = () =>
   axios.post<{ refresh: string; access: string }>(
      'users/token/',
      JSON.stringify({
         username: process.env.NEXT_PUBLIC_SUPER_USERNAME,
         password: process.env.NEXT_PUBLIC_SUPER_PASSWORD,
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
