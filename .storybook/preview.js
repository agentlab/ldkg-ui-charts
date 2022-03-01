import { ConfigProvider } from 'antd';
import 'antd/dist/antd.less';
import ruRu from 'antd/es/locale/ru_RU';
import moment from 'moment';
import React from 'react';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  options: {
    // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: (a, b) => a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

export const decorators = [(Story) => <ConfigProvider locale={ruRu}>{Story()}</ConfigProvider>];

moment.locale('ru');
moment.defaultFormat = 'LLL';
