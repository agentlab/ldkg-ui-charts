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
import Statistic, { StatisticType } from '../statistics/Statistic';
import styles from './LegendItem.module.scss';

const LegendItem = ({ options, onSelect, data = {} }: any) => {
  const { name, color, dataField, uri, statistics, enabled: itemEnabled } = options;
  const [enabled, setEnabled] = useState<boolean>(itemEnabled);
  return (
    <div
      style={{
        border: 'solid 1px #d9d9d9',
        borderLeft: enabled ? `solid 5px ${color}` : 'solid 5px #d9d9d9',
        margin: 2,
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
      <div className={styles.itemHeader}>
        {uri ? (
          <a href={uri} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
            {name}
          </a>
        ) : (
          <p>{name}</p>
        )}
      </div>
      {enabled && (
        <div className={styles.itemPropertiesContainer}>
          {Object.keys(data).map((key: string) => {
            return statistics?.[key] || data[key].current ? (
              <div key={key} className={styles.itemProperty}>
                <div className={styles.itemPropertyName}>{data[key].alias || key}</div>
                <>
                  {data[key] &&
                    statistics?.[key]?.map((type: StatisticType, index: number) => (
                      <div key={index} className={styles.itemPropertyDescription}>
                        <Statistic type={type} data={data[key]} />
                      </div>
                    ))}
                </>
                <div key={key} className={styles.itemPropertyValue}>
                  {data[key].current}
                </div>
              </div>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default LegendItem;
