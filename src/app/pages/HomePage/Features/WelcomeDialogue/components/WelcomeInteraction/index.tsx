/**
 *
 * WelcomeInteraction
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { WrittenTextManifestation } from 'app/components/WrittenTextManifestation';

interface Props {}

const dialogue = [
  'WelcomeDialogue.welcomeToCodetitlan',
  'WelcomeDialogue.myNameIsX',
];

export const WelcomeInteraction = (props: Props) => {
  const { t } = useTranslation();

  return (
    <Div>
      <WrittenTextManifestation
        dialogue={dialogue.map(x => t(x))}
        onDone={x => console.log(x)}
        typingDelay={1}
      />
    </Div>
  );
};

const Div = styled.div`
  border: 1px solid #000000;
  margin: 3rem;
  padding: 1rem;
`;
