import { createSlice } from '@reduxjs/toolkit';
import {getLanguages, translateText} from '../actions/translateActions';

const initialState = {
  
  isLoading: true,
  isError: false,
  languages: [],
  
  isAnswerLoading: false,
  isAnwerError: false,
  answer: '',
};

const translateSlice = createSlice({
  name: 'translate',
  initialState,

  extraReducers: {
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },

    [getLanguages.fulfilled]: (state, action) => {
      state.languages = action.payload;
      state.isLoading = false;
      state.isError = false;
    },

    [getLanguages.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    
    [translateText.pending]: (state) => {
      state.isAnswerLoading = true;
    },

    [translateText.fulfilled]: (state, action) => {
      state.isAnswerLoading = false;
      state.answer = action.payload;
    },

    [translateText.rejected]: (state) => {
      state.isAnswerLoading = false;
      state.isAnwerError = true;
    },
  },

  reducers: {
    clearAnwer: (state) => {
      state.answer = '';
    },
  },
});

export default translateSlice.reducer;

export const clearAnswer = translateSlice.actions.clearAnwer;