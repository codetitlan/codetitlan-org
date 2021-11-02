import * as React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import { ContactForm } from '../index';

const renderer = createRenderer();

describe('<ContactForm />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(<ContactForm />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
