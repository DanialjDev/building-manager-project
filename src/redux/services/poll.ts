import { InitialValues } from '@/types/userInputTypes';
import axios from './axios';
import { Choice, Question } from '@/types/pollsTypes';

export const createQuestion = (token: string, data: InitialValues) =>
   axios.post('polls/question/', JSON.stringify(data), {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

export const getQuestions = (token: string) =>
   axios.get<Question[]>('polls/question', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

export const createChoice = (token: string, data: InitialValues) =>
   axios.post('polls/choice/', JSON.stringify(data), {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

export const getChoices = (token: string) =>
   axios.get<Choice[]>('polls/choice/', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
