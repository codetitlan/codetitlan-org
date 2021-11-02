/**
 *
 * Asynchronously loads the component for GenartCore
 *
 */

import { lazyLoad } from 'utils/loadable';

export const GenartCore = lazyLoad(
  () => import('./index'),
  module => module.GenartCore,
);
