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
import { merge } from 'lodash-es';
import { useEffect, useState } from 'react';
import chain from '../utils/chain';

const groupItemsData = (itemsData: G2.Types.TooltipItem[], itemGrouping: any) => {
  const [dataField, propertyFields] = itemGrouping;
  return chain(itemsData)
    .map((tooltipItem: G2.Types.TooltipItem) => tooltipItem.data)
    .groupBy(dataField)
    .mapValues((itemData: Data) =>
      itemData.reduce((acc, data) => {
        propertyFields.forEach((field: string) => {
          if (data[field]) {
            acc[field] = { current: data[field] };
          }
        });
        return acc;
      }, {}),
    )
    .value();
};

export default function useTooltipData(plot: any, options: any): G2.Types.Datum {
  const [tooltipData, setTooltipData] = useState<G2.Types.Datum>({});
  useEffect(() => {
    const onTooltipChange = (e: G2.Event) => {
      const currentTooltipData = e.data;
      if (currentTooltipData) {
        setTooltipData((previousData: any) => {
          const delta = groupItemsData(currentTooltipData.items, options.itemGrouping);
          return merge({ ...previousData }, delta);
        });
      }
    };
    plot?.chart.views.forEach((view: G2.View) => view.on('tooltip:change', onTooltipChange));
    return () => {
      plot?.chart.views.forEach((view: G2.View) => view.off('tooltip:change', onTooltipChange));
    };
  }, [options.itemGrouping, plot]);

  return tooltipData;
}
