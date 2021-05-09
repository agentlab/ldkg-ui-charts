import { Meta } from '@antv/g2plot';
import _ from 'lodash';

const isTimeAxis = (axis: Meta) => axis.type === 'timeCat' || axis.type === 'time';

export const configureAxesScales = (scales: Record<string, Meta>, axesOptions: any, data: any[]): Meta => {
  const { xAxis = {}, yAxis = {} } = axesOptions;
  const yScales = Object.keys(scales).filter((axis: string) => !isTimeAxis(scales[axis]));
  const xScales = Object.keys(scales).filter((axis: string) => isTimeAxis(scales[axis]));

  const isPrimary = (scale: string) => !yAxis.secondary.includes(scale);

  const yScalesGroups = _.groupBy(yScales, isPrimary);
  const yGroups = Object.keys(yScalesGroups).map((key: any) => {
    const groupAxes = yScalesGroups[key];
    const groupData = data
      .map((d: any) => {
        const dataKeys = _.intersection(Object.keys(d), groupAxes);
        return _.values(_.pick(d, dataKeys));
      })
      .flat();

    const calculateRange = key === 'true' ? defineAxisRange : defineSecondaryAxisRange;

    return yScalesGroups[key].reduce(
      (acc: any, scale: string) => ({
        ...acc,
        [scale]: calculateRange(groupData),
      }),
      {},
    );
  });

  const result = yGroups.reduce((acc: any, group: any) => ({
    ...acc,
    ...group,
  }));
  return { ...result, resultTime: { type: 'timeCat' } };
};

const minMax = (data: any[]) =>
  data.reduce(
    (accumulator, currentValue) => [Math.min(currentValue, accumulator[0]), Math.max(currentValue, accumulator[1])],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  );

const defineAxisRange = (data: any[], ratio = 0.7) => {
  const [min, max] = minMax(data);
  const pow = (max - min).toString().length - 1;
  const digit = 10 ** pow;
  const lower = ((min - (min % digit)) / digit - 1) * digit;
  const upper = ((max - (max % digit)) / digit + 1) * digit;
  const initial = lower - Math.ceil(((max - min) * (1 - ratio)) / ratio / digit) * digit;

  return {
    min: initial,
    max: upper,
    ticks: Array.from({ length: (upper - lower) / digit + 1 }, (a, i) => (i + 1) * digit),
  };
};

const defineSecondaryAxisRange = (data: any[], ratio = 0.25) => {
  const [, max] = minMax(data);
  const pow = max.toString().length - 1;
  const digit = 10 ** pow;
  const upper = ((max - (max % digit)) / digit + 1) * digit;
  const highest = upper / ratio;

  return {
    min: 0,
    max: highest,
    ticks: Array.from({ length: upper / digit + 1 }, (a, i) => i * digit),
  };
};
