import { Meta } from '@storybook/react';
import React, { ReactNode } from 'react';
import { DataSetDemo } from './DataSetDemo';
import { MultiViewDodgeDemo } from './MultiViewDodgeDemo';
import { PieTooltipDemo } from './PieTooltipDemo';

export default {
  title: 'ChartDemo',
} as Meta;

export const PieTooltip = (): ReactNode => <PieTooltipDemo />;
export const Dodge = (): ReactNode => <MultiViewDodgeDemo />;
export const DataSet = (): ReactNode => <DataSetDemo />;
