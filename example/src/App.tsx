import React from 'react';
import { Provider } from 'react-redux';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import { SparqlClientImpl, rootModelInitialState, createModelFromState } from '@agentlab/sparql-jsld-client';
import { MstContextProvider } from '@agentlab/ldkg-ui-react';

import { additionalColls, RemoteDataRenderer } from '../..';

import '../../es/index.css';

const client = new SparqlClientImpl('https://rdf4j.agentlab.ru/rdf4j-server');
// for remote data from server
//const rootStore = createModelFromState('mktp', client, rootModelInitialState, additionalColls);
// for local hardcoded data
//@ts-ignore
const rootStore = createModelFromState('mktp', client, rootModelInitialState, additionalColls);
const store: any = asReduxStore(rootStore);
// eslint-disable-next-line @typescript-eslint/no-var-requires
connectReduxDevtools(require('remotedev'), rootStore);

export const App = () => {
  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore}>
        <RemoteDataRenderer
          viewDescrCollId={'rm:Views_Coll'}
          viewDescrId={'mktp:_g7H7gh'}
          viewKindCollId={'rm:ViewKinds_Coll'}
        />
      </MstContextProvider>
    </Provider>
  );
};
