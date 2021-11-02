import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { personalIncarnationSaga } from './saga';
import { PersonalIncarnationState } from './types';

export const initialState: PersonalIncarnationState = {
  incarnationId: '',
  piState: 'empty',
  lastRefresh: 'never',
  demeanorId: '',
};

const slice = createSlice({
  name: 'personalIncarnation',
  initialState,
  reducers: {
    loadIncarnation(state, action: PayloadAction<string>) {
      state.incarnationId = action.payload;
      state.piState = 'loading';
    },
    initializeIncarnation(
      state,
      action: PayloadAction<PersonalIncarnationState>,
    ) {
      state.incarnationId = action.payload.incarnationId;
      state.piState = action.payload.piState;
      state.lastRefresh = action.payload.lastRefresh;
      state.demeanorId = action.payload.demeanorId;
    },
  },
});

export const { actions: personalIncarnationActions } = slice;

export const usePersonalIncarnationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: personalIncarnationSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = usePersonalIncarnationSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
