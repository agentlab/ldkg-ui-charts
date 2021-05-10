import { Meta } from '@storybook/react';
import React, { ReactNode } from 'react';
import { DataSetDemo } from '../src/charts/DataSetDemo';
import { MultiViewDodgeDemo } from '../src/charts/MultiViewDodgeDemo';
import { PieTooltipDemo } from '../src/charts/PieTooltipDemo';

export default {
  title: 'ChartDemo',
} as Meta;

export const PieTooltip = (): ReactNode => <PieTooltipDemo />;
export const Dodge = (): ReactNode => <MultiViewDodgeDemo />;
export const DataSet = (): ReactNode => <DataSetDemo />;
