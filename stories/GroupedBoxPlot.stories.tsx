/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { createUiModelFromState, Form, MstContextProvider, viewDescrCollConstr } from '@agentlab/ldkg-ui-react';
import { rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { Meta, Story } from '@storybook/react';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { chartsRenderers } from '../src';
import { additionalCollsLocal, localChartsViewDescrs } from '../src/store/data';

export default {
  title: '2 LDKG Controls/GroupedBoxPlot',
  component: Form,
  // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
  parameters: { docs: { source: { type: 'code' } } },
} as Meta;

const Template: Story = (args: any) => {
  const renderers = [...chartsRenderers];

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalCollsLocal);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={renderers}>
        <Form viewDescrId={localChartsViewDescrs[1]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
      </MstContextProvider>
    </Provider>
  );
};
export const GroupedBoxPlot = Template.bind({});

GroupedBoxPlot.args = {};
