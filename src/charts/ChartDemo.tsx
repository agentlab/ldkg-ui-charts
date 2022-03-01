/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { Line, LineConfig } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

export const ChartDemo: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/oSZa1qh9tB/emissions.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config: LineConfig = {
    /* title: {
      visible: true,
      text: 'The causes of CO2 emissions',
    }, */
    padding: 'auto',
    // forceFit: true,
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    // responsive: true,
  };
  return <Line {...config} />;
};
