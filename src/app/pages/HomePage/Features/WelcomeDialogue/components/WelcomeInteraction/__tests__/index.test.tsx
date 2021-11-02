import * as React from 'react';
import { render } from '@testing-library/react';

import { WelcomeInteraction } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => ({})),
      },
    };
  },
}));

describe('<WelcomeInteraction  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<WelcomeInteraction />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
