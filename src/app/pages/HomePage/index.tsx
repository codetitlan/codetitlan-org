import { GenartCore } from 'app/components/GenartCore';
import { LivingBackground, Palettes } from 'app/components/LivingBackground';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Text } from 'rebass';
import { WelcomeInteraction } from './Features/WelcomeDialogue/components/WelcomeInteraction';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Codetitlan </title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Text color="secondary">
        <WelcomeInteraction />
      </Text>
      <LivingBackground
        canvasHeight={600}
        canvasWidth={600}
        step={16}
        varianceFactor={100}
        palette={Palettes.MONOCHROME}
      ></LivingBackground>
      {/* <GenartCore></GenartCore> */}
    </>
  );
}
