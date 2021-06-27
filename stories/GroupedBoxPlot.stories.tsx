/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, Repository } from '@agentlab/sparql-jsld-client';
import { MstContextProvider } from '@agentlab/ldkg-ui-react';

import { chartLocalRootModelState } from '../src/store/data';
import { RemoteDataRenderer } from '../src';

export default {
  title: 'RemoteBoxPlot',
  component: RemoteDataRenderer,
} as Meta;

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
//@ts-ignore
const rootStore = Repository.create(chartLocalRootModelState, { client });
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

const Template: Story = (args: any) => (
  <Provider store={store}>
    <MstContextProvider store={rootStore}>
      <RemoteDataRenderer {...args} />
    </MstContextProvider>
  </Provider>
);
export const GroupedBoxPlot = Template.bind({});

GroupedBoxPlot.args = {
  viewDescrCollId: 'rm:Views_Coll_charts',
  viewDescrId: 'mh:BoxPlot',
  viewKindCollId: 'rm:ViewKinds_Coll_charts',
};