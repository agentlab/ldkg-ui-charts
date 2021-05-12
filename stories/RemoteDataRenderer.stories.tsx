import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, rootModelInitialState, createModelFromState } from '@agentlab/sparql-jsld-client';
import { MstContextProvider } from '@agentlab/ldkg-ui-react';

import { additionalColls } from '../src/store/RemoteData';
import { RemoteDataRenderer } from '../src';

export default {
  title: 'RemoteDataRenderer',
  component: RemoteDataRenderer,
} as Meta;

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
const rootStore = createModelFromState('mktp', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

const Template: Story = (args: any) => (
  <Provider store={store}>
    <MstContextProvider rootStore={rootStore}>
      <RemoteDataRenderer {...args} />
    </MstContextProvider>
  </Provider>
);
export const TimeSeries = Template.bind({});

TimeSeries.args = {
  viewDescrCollId: 'rm:Views_Coll',
  viewDescrId: 'mktp:_g7H7gh',
  viewKindCollId: 'rm:ViewKinds_Coll',
};
