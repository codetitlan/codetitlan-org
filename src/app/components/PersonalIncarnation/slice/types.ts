/* --- STATE --- */
type Conversation = {
  id: string;
  length: number;
  inputs: string[];
  outputs: string[];
};

type InteractionContext = {
  topics: string[];
  memories: string[];
};

type ShortTermMemory = {
  id: string;
  expires: Date;
  conversations?: Conversation[];
  contexts: InteractionContext[];
};

export interface PersonalIncarnationState {
  incarnationId: string;
  piState: 'empty' | 'loading' | 'loaded';
  lastRefresh: string;
  demeanorId: string;
  shortTermMemory?: ShortTermMemory;
  longTermMemory?: ShortTermMemory[];
}
