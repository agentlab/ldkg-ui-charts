import { lazy } from 'react';

const importView = (name: string) => lazy(() => import(`../../../charts/${name}`));

export const viewMapper = (viewKind: any) => {
  switch (viewKind.type) {
    case 'TimeSeriesChart': {
      return importView('TimeSeriesWithAuxiliaryView');
    }
    default:
      throw new Error(`Unknown type of view kind: ${viewKind.type}`);
  }
};
