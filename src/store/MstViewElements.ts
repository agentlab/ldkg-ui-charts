/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { IViewKindElement, MstViewKindElement } from '@agentlab/ldkg-ui-react';
import { JsObject, MstJsObject } from '@agentlab/sparql-jsld-client';
import { types } from 'mobx-state-tree';

export interface ITimeSeriesChartVKElement extends IViewKindElement {
  mappings: JsObject;
}

export const MstTimeSeriesChartVKElement = types.compose(
  'aldkg:TimeSeriesChart',
  MstViewKindElement,
  types.model({
    '@type': types.literal('aldkg:TimeSeriesChart'),
    mappings: types.maybe(MstJsObject),
  }),
);

export interface IBoxPlotChartVKElement extends IViewKindElement {
  mappings: JsObject;
}

export const MstBoxPlotChartVKElement = types.compose(
  'aldkg:BoxPlotChart',
  MstViewKindElement,
  types.model({
    '@type': types.literal('aldkg:BoxPlotChart'),
    mappings: types.maybe(MstJsObject),
  }),
);
