/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 constof the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import React from 'react';
import Delta from './Delta';
import MinMax from './MinMax';

export declare type StatisticType = 'min' | 'max' | 'delta' | 'deltaabs' | 'deltapercent';

interface StatisticProps {
  type: StatisticType;
  data: { values: number[]; current?: number };
}

const Statistic: React.FunctionComponent<StatisticProps> = ({ type, data }) => {
  const { values, current } = data;
  return (
    {
      min: <MinMax type='min' values={values} />,
      max: <MinMax type='max' values={values} />,
      delta: <Delta values={values} current={current} />,
      deltaabs: <Delta type='abs' values={values} current={current} />,
      deltapercent: <Delta type='percent' values={values} current={current} />,
    }[type] || null
  );
};

export default Statistic;
