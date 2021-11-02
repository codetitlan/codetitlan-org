/**
 *
 * Asynchronously loads the component for WelcomeInteraction
 *
 */

import { lazyLoad } from 'utils/loadable';

export const WelcomeInteraction = lazyLoad(
  () => import('./index'),
  module => module.WelcomeInteraction,
);
