import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { personalIncarnationSaga } from './saga';
import { PersonalIncarnationState } from './types';

export const initialState: PersonalIncarnationState = {
  currentDialogset: 0,
  currentDialog: 0,
  currentText: '',
  defaultText: 'Sorry, I am not feeling well right now 🤒',
};

const slice = createSlice({
  name: 'personalIncarnation',
  initialState,
  reducers: {
    moveAhead(state, action: PayloadAction<string>) {
      state.currentDialog += 1;
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
