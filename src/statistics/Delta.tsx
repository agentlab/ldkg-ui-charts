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

// TODO: up + none + down + colors for each

const Delta = ({ values, current, type = 'both' }: any) => {
  const delta = (current ?? values[values.length - 1]) - values[0];
  const diffInPercent = (current ?? values[values.length - 1] - values[0]) / values[0];
  let indicator = '―';
  let color = '#8c8c8c';
  if (delta > 0) {
    indicator = '▲';
    color = '#52c41a';
  } else if (delta < 0) {
    indicator = '▼';
    color = '#f5222d';
  }
  return (
    <div style={{ color, fontWeight: 700 }}>
      {indicator}
      {(type === 'both' || type === 'abs') && Math.abs(delta)}
      {(type === 'both' || type === 'percent') && delta && isFinite(diffInPercent)
        ? `(${Math.round((diffInPercent + Number.EPSILON) * 100) / 100}%)`
        : null}
    </div>
  );
};

export default Delta;
