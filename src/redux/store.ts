import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './features/userSlice';
import emailReducer from './features/emailSlice';
import pollReducer from './features/pollSlice';

export const store = configureStore({
   reducer: {
      user: userSliceReducer,
      email: emailReducer,
      poll: pollReducer,
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
