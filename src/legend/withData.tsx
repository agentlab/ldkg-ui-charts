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
import React, { useEffect, useState } from 'react';
import chain from '../utils/chain';

const withData =
  (Component: any) =>
  ({ plot, options, items }: any) => {
    const [dataTimestamp, setDataTimestamp] = useState(Date.now());
    const [itemsData, setItemsData] = useState<any>({});
    useEffect(() => {
      const chartViews = plot ? [...plot.chart.views, plot.chart] : [];
      const filteredData = ([] as Data).concat(...chartViews.map((view: G2.View) => view.getData()));
      const [dataField, propertyFields] = options.itemGrouping;
      const groupedItemsData = chain(filteredData)
        .groupBy(dataField)
        .mapValues((itemData: Data) =>
          itemData.reduce((acc, data) => {
            propertyFields.forEach((field: string) => {
              data[field] !== undefined && (acc[field] ?? (acc[field] = [])).push(data[field]);
            });
            return acc;
          }, {}),
        )
        .value();
      setItemsData(groupedItemsData);
    }, [options.itemGrouping, plot, dataTimestamp]);

    useEffect(() => {
      const handleDataFiltered = (e: G2.Event) => {
        if (e.data) {
          const { timestamp: ts } = e.data;
          setDataTimestamp(ts);
        }
      };
      plot?.on('data:filter', handleDataFiltered);
      return () => {
        plot?.off('data:filter', handleDataFiltered);
      };
    }, [plot]);

    function mergeItemData(prev: any, next: any) {
      if (prev == null) {
        return next;
      }
      return mapValues(prev, (data: any, key: any) =>
        next[key]
          ? {
              ...prev[key],
              values: next[key].values,
              current: data?.current ?? next[key]?.current,
            }
          : { ...prev[key], values: [], current: null },
      );
    }

    return (
      <Component
        plot={plot}
        options={options}
        items={items.map((item: any) => {
          const itemData = itemsData[item.value];
          const newItemData = mapValues(itemData, (data: any) => ({ values: data, current: data[data.length - 1] }));
          const currentItemData = item.itemData;
          return {
            ...item,
            itemData: mergeItemData(currentItemData, newItemData),
          };
        })}
      />
    );
  };

export default withData;
