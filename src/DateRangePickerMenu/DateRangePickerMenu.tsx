/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { CalendarTwoTone } from '@ant-design/icons';
import { DatePicker, Divider, Space, Typography } from 'antd';
import moment, { Duration, Moment } from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import styles from './DateRangePickerMenu.module.scss';

interface DateRangePickerMenuProps {
  dateFormat?: string;
  ranges?: Record<string, Duration>;
  onChange(dates: [Moment, Moment]): void;
}

const defaultRanges: Record<string, Duration> = {
  '1D': moment.duration(1, 'd'),
  '1W': moment.duration(1, 'w'),
  '1M': moment.duration(1, 'M'),
  '3M': moment.duration(3, 'M'),
  '6M': moment.duration(6, 'M'),
  '1Y': moment.duration(1, 'y'),
};

const DateRangePickerMenu: React.FC<DateRangePickerMenuProps> = ({
  dateFormat = 'DD.MM.YYYY',
  ranges = defaultRanges,
  onChange,
}) => {
  const [dates, setDates] = useState<[Moment, Moment] | null>(null);
  const activeRangeRef = useRef<any>(null);
  const { RangePicker } = DatePicker;

  useEffect(() => {
    if (dates) {
      onChange(dates);
    }
  }, [dates, onChange]);

  return (
    <div className={styles.controlPanel} style={{ order: 3 }}>
      <div>
        <Space split={<Divider type='vertical' style={{ borderWidth: 2, margin: 0, borderColor: '#dadce0' }} />}>
          {Object.keys(ranges).map((range: string) => (
            <Typography.Link
              key={range}
              onClick={(e) => {
                const calendarDates: [Moment, Moment] = [moment().subtract(ranges[range]), moment()];
                if (activeRangeRef.current !== null) {
                  activeRangeRef.current.classList.remove(styles.activeRange);
                }
                activeRangeRef.current = e.target;
                activeRangeRef.current.classList.add(styles.activeRange);
                setDates(calendarDates);
              }}>
              {range}
            </Typography.Link>
          ))}
        </Space>
      </div>

      <div className={styles.rangePicker}>
        <RangePicker
          inputReadOnly
          allowClear={false}
          bordered={false}
          showNow
          separator='-'
          onChange={(calendarDates: any) => {
            if (activeRangeRef.current !== null) {
              activeRangeRef.current.classList.remove(styles.activeRange);
            }
            setDates(calendarDates);
            onChange(calendarDates);
          }}
          disabledDate={(d) => !d || d.isAfter(moment())}
          className={styles.picker}
          size='small'
          value={dates}
          format={dateFormat}
          suffixIcon={<CalendarTwoTone className={styles.suffix} />}
        />
      </div>
    </div>
  );
};

export default DateRangePickerMenu;
