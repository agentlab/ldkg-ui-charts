/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { Datum } from '@antv/g2plot';
import React, { useState } from 'react';

const LegendItem = ({ options, onSelect, data = {} }: any) => {
  const { name, color, dataField, uri, enabled: itemEnabled } = options;
  const [enabled, setEnabled] = useState<boolean>(itemEnabled);
  return (
    <div
      style={{
        border: 'solid 2px',
        borderColor: enabled ? color : 'grey',
        margin: 2,
        borderRadius: '10px',
        padding: '5px',
      }}
      onClick={() => {
        onSelect(
          uri,
          enabled
            ? (value: any, data: Datum) => {
                return data[dataField] !== uri;
              }
            : null,
        );
        setEnabled((enabled) => !enabled);
      }}>
      <>
        {uri ? (
          <a href={uri} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
            {name}
          </a>
        ) : (
          <p>{name}</p>
        )}
      </>
    </div>
  );
};

export default LegendItem;
