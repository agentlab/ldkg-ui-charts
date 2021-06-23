/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { Meta } from '@antv/g2plot';
import { Axis } from '@antv/g2plot/lib/types/axis';
import { intersection, partition, pick, range, remove, values } from 'lodash-es';
import moment, { unitOfTime } from 'moment';

export function getXYScales(scales: Record<string, Meta>) {
  const isTimeAxis = (axis: string) => scales[axis].type === 'timeCat' || scales[axis].type === 'time';
  const [xScaleNames, yScaleNames] = partition(Object.keys(scales), isTimeAxis);
  const xScales = pick(scales, xScaleNames);
  const yScales = pick(scales, yScaleNames);
  return { xScales, yScales };
}

export function scaleDataToTimeUnit(timeScaleName: string, timeUnit: unitOfTime.StartOf, data: any[]): any[] {
  return timeUnit !== null
    ? data.map((d: any) => ({
        ...d,
        [timeScaleName]: moment(d.resultTime).startOf(timeUnit).toISOString(),
      }))
    : data;
}

export function configureAxesScales(scales: any, axesOptions: any = {}, data: [] = []): Meta {
  const { xAxis: xAxisOptions = {}, yAxis: yAxisOptions = {} } = axesOptions;
  const { xScales, yScales } = scales;

  const yAxisConfig = makeYAxisConfiguration(yAxisOptions, yScales, data);
  const xAxisConfig = makeXAxisConfiguration(xAxisOptions, xScales);
  return { ...xAxisConfig, ...yAxisConfig };
}

function makeXAxisConfiguration(xAxisOptions: any, xScales: any) {
  const { dateFormat } = xAxisOptions;
  return Object.keys(xScales)
    .map((scale: any) => ({
      [scale]: {
        ...xScales[scale],
        mask: dateFormat,
        sync: true,
      },
    }))
    .reduce((acc: any, scale: any) => ({ ...acc, ...scale }), {});
}

function makeYAxisConfiguration(yAxis: any, yScales: Record<string, Meta>, data: []) {
  const isPrimary = (scale: string) => !yAxis?.secondary?.includes(scale);

  const yScalesGroups: any = partition(Object.keys(yScales), isPrimary);
  remove(yScalesGroups, (group: any) => group.length === 0);

  const { ratio: yRatio = 0.75 } = yAxis;

  const regions: [number, number][] =
    yScalesGroups.length === 1
      ? [
          [0, 1],
          [0, 0],
        ]
      : [
          [1 - yRatio, 1],
          [0, 1 - yRatio],
        ];

  return yScalesGroups
    .map((groupAxes: any, idx: number) => {
      const groupData = data
        .map((d: any) => {
          const dataKeys = intersection(Object.keys(d), groupAxes);
          return values(pick(d, dataKeys));
        })
        .flat();

      const range = calculateAxisTicks(groupData, regions[idx]);
      return groupAxes.reduce(
        (acc: any, axis: any) => ({
          ...acc,
          [axis]: range,
        }),
        {},
      );
    })
    .reduce((acc: any, group: any) => ({
      ...acc,
      ...group,
    }));
}

export function configureYAxes(yScales: any): Record<string, Axis> {
  const yScaleNames = Object.keys(yScales);
  return yScaleNames.reduce(
    (acc: any, scaleName: string) => ({
      ...acc,
      [scaleName]: { title: { text: scaleName.charAt(0).toUpperCase() + scaleName.slice(1) } },
    }),
    {},
  );
}

function minMax(data: any[]) {
  return data.reduce(
    (accumulator, currentValue) => [Math.min(currentValue, accumulator[0]), Math.max(currentValue, accumulator[1])],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  );
}

function calculateAxisTicks(data: any[], region: [number, number]) {
  const [start, end] = region;

  const [min, max] = minMax(data);
  const [tickSpacing, tickMin, tickMax] = calculateTicks(5, min, max);
  const minTick = tickMin - ((tickMax - tickMin) * start) / (end - start);
  const maxTick = tickMax + ((tickMax - tickMin) * (1 - end)) / (end - start);

  return {
    ticks: range(tickMin, tickMax + tickSpacing, tickSpacing),
    min: minTick,
    max: maxTick,
  };
}

function calculateTicks(maxTicks: number, minPoint: number, maxPoint: number): [number, number, number] {
  const range = niceNum(maxPoint - minPoint, false);
  const tickSpacing = niceNum(range / (maxTicks - 1), true);
  const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  return [tickSpacing, niceMin, niceMax];
}

function niceNum(range: number, round: boolean): number {
  const exponent: number = Math.floor(Math.log10(range));
  const fraction: number = range / 10 ** exponent;
  let niceFraction: number;

  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;

  return niceFraction * 10 ** exponent;
}
