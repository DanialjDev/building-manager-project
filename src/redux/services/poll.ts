import { InitialValues } from '@/types/types';
import axios from './axios';

export const createQuestion = (token: string, data: InitialValues) =>
   axios.post('polls/question/', JSON.stringify(data), {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
