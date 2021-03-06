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
import { mapValues } from 'lodash-es';
import React, { useCallback, useEffect } from 'react';
import useTooltip from './useTooltip';
import useTooltipData from './useTooltipData';

function updateTooltipOptions(plot: any) {
  const chart: G2.Chart = plot.chart;
  const tooltipOptions: G2.Types.TooltipCfg = {
    showMarkers: true,
    shared: true,
    showCrosshairs: true,
    customContent: (title) => `<div>${title}<div>`,
  };
  chart.tooltip(false);
  chart.views.forEach((view: G2.View) => view.tooltip(tooltipOptions));
}

const withTooltip =
  (Component: any) =>
  ({ plot, options, items }: any) => {
    const tooltipData = useTooltipData(plot, options);
    const showLastDatapointTooltip = useCallback(() => {
      const chart = plot.chart as G2.View;
      // TODO: also analyse chart.options.legends + chart.views -> each options.legends which are not false: there are two cases possible: legends = false and legends = {name: false, name2: false}

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
    }, [plot]);
    useTooltip(plot, undefined, showLastDatapointTooltip);
    useEffect(() => {
      if (plot) {
        updateTooltipOptions(plot);
        showLastDatapointTooltip();
        plot.on('legend-item:click', showLastDatapointTooltip);
        plot.on('data:filter', showLastDatapointTooltip);
        return () => {
          plot.off('legend-item:click', showLastDatapointTooltip);
          plot.off('data:filter', showLastDatapointTooltip);
        };
      }
      return;
    }, [showLastDatapointTooltip, plot]);

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
          tooltipData
            ? items.map((item: any) => {
                const currentItemData = item.itemData;
                const newItemData = tooltipData[item.value];
                return { ...item, itemData: mergeItemData(currentItemData, newItemData) };
              })
            : items
        }
      />
    );
  };

export default withTooltip;
