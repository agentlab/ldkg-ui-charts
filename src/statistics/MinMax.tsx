/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 constof the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import React from 'react';

interface MinMaxProps {
  values: number[];
  type: 'min' | 'max';
}

const MinMax = ({ values, type }: MinMaxProps) => {
  let min, max;
  if (Array.isArray(values) && values.length > 0) {
    min = max = values[0];
    let i = values.length;
    while (i--) {
      min = min < values[i] ? min : values[i];
      max = max > values[i] ? max : values[i];
    }
    return <>{type === 'min' ? `MIN:${min}` : `MAX:${max}`}</>;
  }
  return <>{type === 'min' ? 'MIN:―' : 'MAX:―'}</>;
};

export default MinMax;
