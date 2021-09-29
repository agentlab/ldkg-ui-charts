/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import React, { useCallback, useState } from 'react';
import DateRangePickerMenu from '../DateRangePickerMenu';
import Legend from '../legend/Legend';

const Chart = ({ children, ...rest }: any) => {
  const { options } = rest;
  const [chart, setChart] = useState();
  const onChartReady = useCallback((chart) => {
    setChart(chart);
  }, []);
  return (
    <>
      {options.showDatePicker && <DateRangePickerMenu plot={chart} options={{ timeUnit: 'day' }} />}
      {React.Children.map(children, (child: any) => (
        <>
          {React.cloneElement(child, {
            onChartReady,
            ...(options.legend && {
              options: {
                ...child.props.options,
                legend: options.legend,
              },
            }),
          })}
          <Legend plot={chart} />
        </>
      ))}
    </>
  );
};

export default Chart;
