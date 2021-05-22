import React from 'react';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Button } from 'antd';
//import { TimeSeries } from '../stories/DataRenderer.stories';

describe('DataRenderer.stories', () => {
  it('should return 15 for add(10,5)', () => {
    expect(10 + 5).toBe(15);
  });
  it('renders Button without crashing', async () => {
    await act(async () => {
      render(<Button />);
    });
  });
  /*it('renders without crashing', async () => {
    await act(async () => {
      render(<TimeSeries {...TimeSeries.args} />);
    });
  });*/
});
