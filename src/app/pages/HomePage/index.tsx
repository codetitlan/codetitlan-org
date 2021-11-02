// import { Cubimation } from 'app/components/Cubimation';
import { GenartCore } from 'app/components/GenartCore';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Text } from 'rebass';
import { WelcomeInteraction } from './Features/WelcomeDialogue/components/WelcomeInteraction';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Text color="secondary">
        <WelcomeInteraction />
      </Text>
      {/* <Button>okie dokie</Button> */}
      <GenartCore></GenartCore>
      {/* <Cubimation /> */}
    </>
  );
}
