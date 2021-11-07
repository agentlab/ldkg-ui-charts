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
import { mapValues } from 'lodash-es';
import moment, { Duration, Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './DateRangePickerMenu.module.scss';

declare type Dates = [Moment, Moment] | null;
interface DateRangePickerMenuProps {
  dateFormat?: string;
  ranges?: Record<string, Duration | null>;
  activeRange?: string;
  onChange(dates: Dates): void;
}
interface DateRangeListProps {
  value: Dates;
  ranges: Record<string, Dates>;
  renderItem: (label: string, dates: Dates) => JSX.Element;
}

const defaultRanges: Record<string, Duration | null> = {
  '1D': moment.duration(1, 'd'),
  '1W': moment.duration(1, 'w'),
  '1M': moment.duration(1, 'M'),
  '3M': moment.duration(3, 'M'),
  '6M': moment.duration(6, 'M'),
  '1Y': moment.duration(1, 'y'),
  All: null,
};

const DateRangesList = ({ value, ranges, renderItem }: DateRangeListProps) => {
  const isActive = (selectedRange: Dates, currentRange: Dates) => {
    if (selectedRange && currentRange) {
      return selectedRange[0].isSame(currentRange[0], 'day') && selectedRange[1].isSame(currentRange[1], 'day');
    } else if (!selectedRange) {
      return currentRange === null;
    }
    return false;
  };

  return (
    <Space split={<Divider type='vertical' style={{ borderWidth: 2, margin: 0, borderColor: '#dadce0' }} />}>
      {Object.entries(ranges).map(([label, dates]) => (
        <div key={label} className={isActive(value, dates) ? styles['range--active'] : styles['range']}>
          {renderItem(label, dates)}
        </div>
      ))}
    </Space>
  );
};

const DateRangePickerMenu: React.FC<DateRangePickerMenuProps> = ({
  dateFormat = 'DD.MM.YYYY',
  ranges = defaultRanges,
  activeRange,
  onChange,
}) => {
  const dateRanges = mapValues(ranges, (duration) =>
    duration ? ([moment().subtract(duration), moment()] as [Moment, Moment]) : null,
  );
  const selectedRange = (activeRange && dateRanges[activeRange]) || null;
  const [dates, setDates] = useState<Dates>(selectedRange);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    if (dates !== undefined) {
      onChange(dates);
    }
  }, [dates, onChange]);

  return (
    <div className={styles.controlPanel}>
      <DateRangesList
        value={dates}
        ranges={dateRanges}
        renderItem={(label, dates) => (
          <Typography.Link
            onClick={() => {
              setDates(dates);
            }}>
            {label}
          </Typography.Link>
        )}
      />

      <div className={styles.rangePicker}>
        <RangePicker
          inputReadOnly
          allowClear={false}
          bordered={false}
          showNow
          separator='-'
          onChange={(calendarDates: any) => {
            setDates(calendarDates);
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
