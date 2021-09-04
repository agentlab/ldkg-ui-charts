/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import {
  createUiModelFromState,
  Form,
  MstContextProvider,
  registerMstViewKindSchema,
  viewDescrCollConstr,
} from '@agentlab/ldkg-ui-react';
import { rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { Meta, Story } from '@storybook/react';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { chartsRenderers } from '../src';
import { MstBoxPlotChartVKElement, MstTimeSeriesChartVKElement } from '../src/store/MstViewElements';
import { additionalColls, timeSeriesViewDescrs } from '../src/store/RemoteData';

const renderers = [...chartsRenderers];

export default {
  title: 'RemoteDataRenderer',
  component: Form,
} as Meta;

const Template: Story = (args: any) => {
  registerMstViewKindSchema(MstTimeSeriesChartVKElement);
  registerMstViewKindSchema(MstBoxPlotChartVKElement);

  const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
  const rootStore = createUiModelFromState('mktp', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={renderers}>
        <Form viewDescrId={timeSeriesViewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
      </MstContextProvider>
    </Provider>
  );
};
export const RemoteDataRenderer = Template.bind({});

RemoteDataRenderer.args = {};
