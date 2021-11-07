/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { G2 } from '@ant-design/charts';
import { Datum, Meta } from '@antv/g2plot/lib/types';
import { partition, pick } from 'lodash-es';
import moment, { Moment } from 'moment';
import React from 'react';
import DateRangePickerMenu from './DateRangePickerMenu';

function getXYScales(scales: Record<string, Meta>) {
  const isTimeAxis = (axis: string) => scales[axis].type === 'timeCat' || scales[axis].type === 'time';
  const [xScaleNames, yScaleNames] = partition(Object.keys(scales), isTimeAxis);
  const xScales = pick(scales, xScaleNames);
  const yScales = pick(scales, yScaleNames);
  return { xScales, yScales };
}

const ChartDateRangePicker = ({ plot, options }: any) => {
  const handleDatesChanged = (dates: [Moment, Moment] | null) => {
    if (plot) {
      const { timeUnit = null } = options;
      const { chart } = plot;
      const chartViews = [...(chart.views || []), ...(chart.options.scales ? [chart] : [])];
      chartViews.forEach((view: G2.View) => {
        const scales = view.getOptions().scales || chart.options.scales;
        const { xScales } = getXYScales(scales);
        const timeScalesName = Object.keys(xScales)[0];
        if (dates === null) {
          view.filter('*', null);
        } else {
          view.filter('*', (value: any, data: Datum) => {
            const resultDate = moment(data[timeScalesName]);
            return resultDate.isSameOrAfter(dates[0], timeUnit) && resultDate.isSameOrBefore(dates[1], timeUnit);
          });
        }
      });
      chart.render();
      chart.emit('data:filter', G2.Event.fromData(plot?.chart, 'data:filter', { timestamp: Date.now() }));
    }
  };

  return (
    <DateRangePickerMenu
      ranges={{
        '1 нед.': moment.duration(1, 'w'),
        '1 мес.': moment.duration(1, 'M'),
        '3 мес.': moment.duration(3, 'M'),
        '6 мес.': moment.duration(6, 'M'),
        '1 год': moment.duration(1, 'y'),
        '2 года': moment.duration(2, 'y'),
        'Макс.': null,
      }}
      onChange={handleDatesChanged}
    />
  );
};

export default ChartDateRangePicker;
