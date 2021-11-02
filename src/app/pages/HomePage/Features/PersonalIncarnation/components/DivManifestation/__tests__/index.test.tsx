import * as React from 'react';
import { render } from '@testing-library/react';

import { DivManifestation } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<DivManifestation  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DivManifestation />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
