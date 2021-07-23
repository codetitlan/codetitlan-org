/**
 *
 * Asynchronously loads the component for DivManifestation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DivManifestation = lazyLoad(
  () => import('./index'),
  module => module.DivManifestation,
);
