/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { MstContextProvider } from '@agentlab/ldkg-ui-react';
import { createModelFromState, rootModelInitialState } from '@agentlab/sparql-jsld-client';
import { Meta, Story } from '@storybook/react';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { RemoteDataRenderer } from '../src';
import { additionalColls } from '../src/store/DenormalizedObservationsData';
import SparqlClient from '../src/utils/SparqlClient';

const client = new SparqlClient('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export default {
  title: 'DenormalizedObservations',
  component: RemoteDataRenderer,
} as Meta;

const Template: Story = (args: any) => (
  <Provider store={store}>
    <MstContextProvider store={rootStore}>
      <RemoteDataRenderer {...args} />
    </MstContextProvider>
  </Provider>
);
export const ProductTimeSeries = Template.bind({});

ProductTimeSeries.args = {
  viewDescrCollId: 'rm:Views_Coll_charts',
  viewDescrId: 'mktp:_g7H7gh',
  viewKindCollId: 'rm:ViewKinds_Coll_charts',
};
