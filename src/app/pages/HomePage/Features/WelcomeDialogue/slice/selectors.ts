import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.welcomeDialogue || initialState;

export const selectWelcomeDialogue = createSelector(
  [selectSlice],
  state => state,
);
