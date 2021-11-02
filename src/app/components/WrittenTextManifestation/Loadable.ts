/**
 *
 * Asynchronously loads the component for WrittenTextManifestation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const WrittenTextManifestation = lazyLoad(
  () => import('./index'),
  module => module.WrittenTextManifestation,
);
