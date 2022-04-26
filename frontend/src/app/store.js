import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import surveyReducer from '../features/surveys/surveySlice'
import answerReducer from '../features/answers/answerSlice'
import questionReducer from '../features/questions/questionSlice'
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'

// const persistedReducer = persistReducer(persistConfig, rootReduce )
const persistConfig = {
  key: 'surveys',
  storage,
}

const persistedReducer = persistReducer(persistConfig, surveyReducer)

export const store = configureStore({
  reducer: {
    auth: authReducer,
    surveys: surveyReducer,
    questions: questionReducer,
    answers: answerReducer,
  },
});

export const persistor = persistStore(store)
