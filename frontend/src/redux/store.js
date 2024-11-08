import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/login/auth';
import articleReducer from './features/article/article';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
  },
});
