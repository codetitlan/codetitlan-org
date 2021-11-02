import { PersonalIncarnationState } from 'app/components/PersonalIncarnation/slice/types';
import { WelcomeDialogueState } from 'app/pages/HomePage/Features/WelcomeDialogue/slice/types';

// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  personalIncarnation?: PersonalIncarnationState;
  welcomeDialogue?: WelcomeDialogueState;

  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
