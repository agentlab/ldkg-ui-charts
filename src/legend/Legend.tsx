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
import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import withData from './withData';
import withTooltip from './withTooltip';

const itemListDecorators: any = {
  data: withData,
  tooltip: withTooltip,
};

const Legend = ({ plot }: any): any => {
  const [items, setItems] = useState<any[]>([]);
  const [itemListOptions, setItemListOptions] = useState<any>({});
  const [legend, setLegend] = useState<any>();

  useEffect(() => {
    // TODO: also analyse chart.options.legends + chart.views -> each options.legends which are not false: there are two cases possible: legends = false and legends = {name: false, name2: false}
    if (plot) {
      const views = plot.options.views || [];
      const view = views[0];
      const legend = view?.options?.legend || {};

      if (legend) {
        const chartViews = [...plot.chart.views, plot.chart];
        const chartYFields = chartViews
          .map((v: G2.View) => v.getYScales())
          .flat()
          .map((scale) => scale.field)
          .filter((field) => field) as string[];
        const itemData = chartYFields
          .map((field) => ({ [field]: {} }))
          .reduce((acc, field): any => ({ ...acc, ...field }), {});

        const legendItems = Object.entries(legend.items || {}).map(([itemKey, item]: [string, any]) => ({
          enabled: true,
          value: itemKey,
          dataField: legend.field,
          ...item,
          itemData,
        }));
        setItems(legendItems);
        setLegend(legend);
        const itemGrouping = [legend.field, chartYFields];
        setItemListOptions({ itemGrouping });
      }
    }
  }, [plot]);

  if (items.length) {
    const ItemListComponent =
      legend?.decorators?.reduce((acc: any, type: string) => {
        const decorator = itemListDecorators[type];
        return decorator ? decorator(acc) : acc;
      }, ItemList) || ItemList;
    return <ItemListComponent plot={plot} options={itemListOptions} items={items} />;
  }
  return null;
};

export default Legend;
