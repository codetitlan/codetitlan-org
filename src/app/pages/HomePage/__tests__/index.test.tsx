import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { HomePage } from '../index';

const renderer = createRenderer();

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<HomePage />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
