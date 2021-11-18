/**
 *
 * Asynchronously loads the component for LivingBackground
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LivingBackground = lazyLoad(
  () => import('./index'),
  module => module.LivingBackground,
);
