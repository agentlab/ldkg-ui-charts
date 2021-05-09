import { lazy } from 'react';

const importComponent = (name: string) => lazy(() => import(`../../../charts/${name}`));

export const createComponent = (type: string) => {
  switch (type) {
    case 'TimeSeriesChart': {
      return importComponent('TimeSeriesWithAuxiliaryView');
    }
    default:
      throw new Error(`Unknown type of view kind: ${type}`);
  }
};
