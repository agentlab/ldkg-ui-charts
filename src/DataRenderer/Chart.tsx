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
import DateRangePickerMenu from '../DateRangePickerMenu';
import useG2Chart from './hooks/useG2Chart';

const Chart = ({ children }: any) => {
  const [chart, chartCallbackRef] = useG2Chart();
  return (
    <>
      <DateRangePickerMenu plot={chart} options={{ timeUnit: 'day' }} />
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          ref: chartCallbackRef,
        }),
      )}
    </>
  );
};

export default Chart;
