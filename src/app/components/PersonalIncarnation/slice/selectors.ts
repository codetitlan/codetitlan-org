import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) =>
  state.personalIncarnation || initialState;

export const selectIncarnationId = createSelector(
  [selectSlice],
  ({ incarnationId }) => incarnationId,
);

export const selectShortTermMemory = createSelector(
  [selectSlice],
  ({ shortTermMemory }) => shortTermMemory,
);

export const selectPiState = createSelector(
  [selectSlice],
  ({ piState }) => piState,
);
