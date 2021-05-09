import React from 'react';
import { Meta, Story } from '@storybook/react';
import { rootModelState } from '../store/data';
import DataRenderer from '.';

export default {
  title: 'DataRenderer',
  component: DataRenderer,
} as Meta;

const Template: Story = (args: any) => <DataRenderer {...args} />;
export const TimeSeries = Template.bind({});

TimeSeries.args = {
  viewKinds: rootModelState.colls['rm:ViewKinds_Coll'].dataIntrnl,
  viewDescriptions: rootModelState.colls['rm:Views_Coll'].dataIntrnl,
  data: rootModelState.colls,
};
