import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.incarnation || initialState;

export const selectIncarnation = createSelector([selectSlice], state => state);
