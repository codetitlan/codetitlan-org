import { IncarnationState } from 'app/pages/HomePage/Features/PersonalIncarnation/components/DivManifestation/slice/types';
import { PersonalIncarnationState } from 'app/pages/HomePage/Features/PersonalIncarnation/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  incarnation?: IncarnationState;
  personalIncarnation?: PersonalIncarnationState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
