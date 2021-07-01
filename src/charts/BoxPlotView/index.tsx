import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Box } from '@ant-design/charts';

const BoxPlotView = ({ views = {}, options = {}, title }: any) => {
  const view = Array.isArray(views) ? views[0] : views;
  const [config, setConfig] = useState<any>({
    data: [],
  });
  const createOutliers = (data: any) => {
    const newOutliers: any = [];
    if (data.hasUpperOutlier) {
      Array.isArray(data.hasUpperOutlier)
        ? data.hasUpperOutlier.forEach((e: any) => newOutliers.push(e.hasSimpleResult))
        : [data.hasUpperOutlier].forEach((e) => newOutliers.push(e.hasSimpleResult));
    }
    if (data.hasLowerOutlier) {
      Array.isArray(data.hasLowerOutlier)
        ? data.hasLowerOutlier.forEach((e: any) => newOutliers.push(e.hasSimpleResult))
        : [data.hasLowerOutlier].forEach((e) => newOutliers.push(e.hasSimpleResult));
    }
    return newOutliers;
  };
  useEffect(() => {
    const data = view.data.map((e: any, idx: number) => {
      const medianDate = moment((Number(moment(e.end).format('x')) + Number(moment(e.begin).format('x'))) / 2);
      return {
        x: options.groupField ? medianDate.format(options.dateFormat) : medianDate,
        ...(options.showOutliers && { outliers: createOutliers(e) }),
        ...e,
      };
    });
    const newConfig = {
      width: 400,
      height: 500,
      data: data,
      ...view.geometries[0],
      outliersField: 'outliers',
      outliersStyle: { fill: '#f6f' },
      boxStyle: options.groupField
        ? {}
        : {
            stroke: '#545454',
            fill: '#1890FF',
            fillOpacity: 0.3,
          },
      meta: {
        [view.geometries[0].xField]: {
          formatter: (val: any) => moment(val).format(options.dateFormat),
        },
      },
      animation: false,
      tooltip: {
        showCrosshairs: false,
      },
    };
    setConfig(newConfig);
  }, [view.data, options, views, title, view.geometries]);
  return (
    <React.Fragment>
      <span style={{ fontSize: '2em' }}>{title}</span>
      <Box {...config} />
    </React.Fragment>
  );
};

export default BoxPlotView;
