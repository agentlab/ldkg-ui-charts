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
import { Data } from '@antv/g2plot';
import { mapValues } from 'lodash-es';
import React, { useCallback, useEffect } from 'react';
import chain from '../utils/chain';
import useTooltip from './useTooltip';
import useTooltipData from './useTooltipData';

const withTooltip =
  (Component: any) =>
  ({ plot, options, items }: any) => {
    const tooltipData = useTooltipData(plot);
    const groupedTooltipData = groupTooltipData(tooltipData?.items);

    const showLastDatapointTooltip = useCallback(() => {
      const chart = plot.chart as G2.View;
      // TODO: also analyse chart.options.legends + chart.views -> each options.legends which are not false: there are two cases possible: legends = false and legends = {name: false, name2: false}
      const { tooltip } = plot.chart.getOptions();
      if (tooltip && typeof tooltip !== 'boolean') {
        const shared = (tooltip as G2.Types.TooltipCfg).shared;
        if (shared) {
          plot.chart.forceFit();
          chart.views.forEach((view: G2.View) => {
            const data = view.getData();
            if (data.length > 0) {
              const { x } = view.getXY(data[data.length - 1]);
              if (!isNaN(x)) {
                view.showTooltip({ x, y: 0 });
              }
            }
          });
          window.addEventListener('resize', showLastDatapointTooltip);
          return () => {
            window.removeEventListener('resize', showLastDatapointTooltip);
          };
        }
      }
      return;
    }, [plot]);
    useTooltip(plot, undefined, showLastDatapointTooltip);
    useEffect(() => {
      if (plot) {
        const chart: G2.Chart = plot.chart;
        const tooltipOptions: G2.Types.TooltipCfg = {
          showMarkers: true,
          shared: true,
          showCrosshairs: true,
          customContent: (title) => `<div>${title}</div>`,
        };

        chart.tooltip(tooltipOptions);
        chart.views.forEach((view: G2.View) => view.tooltip(tooltipOptions));

        showLastDatapointTooltip();
        plot.on('legend-item:click', showLastDatapointTooltip);
        plot?.on('data:filter', showLastDatapointTooltip);
        return () => {
          plot.off('legend-item:click', showLastDatapointTooltip);
          plot?.off('data:filter', showLastDatapointTooltip);
        };
      }
      return;
    }, [showLastDatapointTooltip, plot]);

    // TODO: memoize previous current values of the items
    function groupTooltipData(data: any) {
      if (!tooltipData) {
        return null;
      }
      const [dataField, propertyFields] = options.itemGrouping;
      return chain(data)
        .map((tooltipItem: G2.Types.TooltipItem) => tooltipItem.data)
        .groupBy(dataField)
        .mapValues((itemData: Data) =>
          itemData.reduce((acc, data) => {
            propertyFields.some(
              (field: string) => data[field] !== undefined && (acc[field] = { current: data[field] }),
            );
            return acc;
          }, {}),
        )
        .value();
    }

    function mergeItemData(prev: any, next: any) {
      if (prev == null) {
        return next;
      }
      if (next == null) {
        return prev;
      }
      return mapValues(prev, (data: any, key: any) => ({
        ...data,
        current: next[key]?.current,
      }));
    }

    return (
      <Component
        plot={plot}
        options={options}
        items={
          groupedTooltipData
            ? items.map((item: any) => {
                const currentItemData = item.itemData;
                const newItemData = groupedTooltipData[item.value];
                return { ...item, itemData: mergeItemData(currentItemData, newItemData) };
              })
            : items
        }
      />
    );
  };

export default withTooltip;
