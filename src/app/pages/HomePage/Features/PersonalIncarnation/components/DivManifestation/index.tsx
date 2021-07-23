/**
 *
 * DivManifestation
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
// import { messages } from './messages';

interface Props {}

export const DivManifestation = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Div>
      {t('DivManifestation')}
      {/*  {t(...messages.someThing())}  */}
    </Div>
  );
});

const Div = styled.div``;
