import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { NotFoundPage } from '../index';

const renderer = createRenderer();

describe('<NotFoundPage />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<NotFoundPage />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
