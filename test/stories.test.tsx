import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { TimeSeries } from '../stories/DataRenderer.stories';

describe('DataRenderer.stories', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      render(<TimeSeries {...TimeSeries.args} />);
    });
  });
});
