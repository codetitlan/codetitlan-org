import * as React from 'react';
import { render } from '@testing-library/react';

import { WrittenTextManifestation } from '..';

const mockDialogue = ['a', 'b'];

describe('<WrittenTextManifestation  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <WrittenTextManifestation dialogue={mockDialogue} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });

  it('should call a function on end', () => {
    const loadingIndicator = render(
      <WrittenTextManifestation dialogue={mockDialogue} onDone={() => []} />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
