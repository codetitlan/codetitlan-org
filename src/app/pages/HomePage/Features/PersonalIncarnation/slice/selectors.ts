import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.personalIncarnation || initialState;

export const selectCurrentDialog = createSelector(
  [selectSlice],
  ({ currentDialogset, currentDialog }) => ({
    currentDialog,
    currentDialogset,
  }),
);

export const selectDefaultText = createSelector(
  [selectSlice],
  ({ defaultText }) => defaultText,
);
