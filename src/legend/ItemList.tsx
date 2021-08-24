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
import React from 'react';
import LegendItem from './LegendItem';

const ItemList = ({ plot, items }: any) => {
  const handleLegendClick = (field: string, condition: G2.Types.FilterCondition | null) => {
    const { views: chartViews = [] } = plot?.chart;
    chartViews.forEach((view: G2.View) => {
      view.filter(field, condition);
      view.render();
    });

    plot?.chart.emit('legend-item:click', G2.Event.fromData(plot?.chart, 'legend-item:click', {}));
  };

  return (
    <>
      {plot &&
        items.map((item: any) => (
          <LegendItem key={item.uri || item.name} options={item} data={item.itemData} onSelect={handleLegendClick} />
        ))}
    </>
  );
};

export default ItemList;
