import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { PersonalIncarnation } from './Features/PersonalIncarnation';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Codetitlan </title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <PersonalIncarnation />
    </>
  );
}
