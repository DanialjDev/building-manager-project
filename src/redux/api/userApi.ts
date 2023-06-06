import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://127.0.0.1:8000/',
   }),
   endpoints: (builder) => ({}),
});
