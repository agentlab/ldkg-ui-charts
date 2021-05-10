import React from 'react';
import * as ReactDOM from 'react-dom';
import { TimeSeries } from '../stories/DataRenderer.stories';

describe('DataRenderer.stories', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TimeSeries />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
