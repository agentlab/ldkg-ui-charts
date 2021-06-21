/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
