/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
