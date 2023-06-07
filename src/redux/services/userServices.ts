import { InitialValues, User } from '@/types/types';
import axios from './axios';

// User Register
export const userRegister = (data: InitialValues) =>
   axios.post<User>('users/', JSON.stringify(data));
