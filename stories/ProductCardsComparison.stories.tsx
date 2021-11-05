/********************************************************************************
 * Copyright (c) 2020 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import {
  antdCells,
  antdControlRenderers,
  antdDataControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  RendererRegistryEntry,
  viewDescrCollConstr,
  viewKindCollConstr,
} from '@agentlab/ldkg-ui-react';
import { CollState, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import { Meta, Story } from '@storybook/react';
import moment from 'moment';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { chartsRenderers } from '../src';
import {
  HSObservationShapeSchemaForCardsListShape,
  productCardShapeSchemaForCardsListShape,
} from '../src/store/shapes';

export default {
  title: '2 Complex Controls/CardCharts List',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'black', value: 'rgba(0, 0, 0, 1)' },
        { name: 'grey', value: 'rgba(230, 235, 242, 0.5)' },
        { name: 'white', value: 'rgba(255,255,255, 1)' },
      ],
    },
    // Due to Storybook bug https://github.com/storybookjs/storybook/issues/12747
    docs: { source: { type: 'code' } },
  },
} as Meta;

export const ProductCardsComparison: Story<{}> = () => {
  const renderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...chartsRenderers,
  ];
  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed20', client, rootModelInitialState, additionalColls);
  console.log('rootStore', rootStore);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);

  return (
    <Provider store={store}>
      <MstContextProvider store={rootStore} renderers={renderers} cells={antdCells}>
        <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
      </MstContextProvider>
    </Provider>
  );
};

// Preparation for mktp-fed repository speed test
//const mktpSchemaRepoIri = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema';
//const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

const viewKinds = [
  {
    '@id': 'mktp:CardCellGridViewKind',
    '@type': 'aldkg:ViewKind',
    collsConstrs: [
      {
        '@id': 'mktp:ViewKind_Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ViewKind_Cards_Coll_Ent0',
            '@type': 'aldkg:EntConstr',
            //TODO: schema: 'hs:ProductCardCardsListShape',
            schema: productCardShapeSchemaForCardsListShape,
            conditions: {
              hasObservations: '?eIri1',
            },
            orderBy: [{ expression: variable('lastMonthSalesValue0'), descending: true }],
            limit: 15,
            //service: mktpSchemaRepoIri,
          },
          {
            '@id': 'mktp:ViewKind_Cards_Coll_Ent1',
            '@type': 'aldkg:EntConstr',
            //TODO: schema: 'hs:HSObservationCardsListShape',
            schema: HSObservationShapeSchemaForCardsListShape,
            conditions: {
              parsedAt: {
                relation: 'after',
                value: ['2021-01-01T00:00:00'],
              },
            },
            orderBy: [{ expression: variable('parsedAt1'), descending: false }],
            //service: mktpOntopRepoIri,
          },
        ],
        orderBy: [
          { expression: variable('lastMonthSalesValue0'), descending: true },
          { expression: variable('parsedAt1'), descending: false },
        ],
      },
    ],
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:TreeTableChartVKElement',
        '@type': 'aldkg:TimeSeriesChart', // control type
        mappings: {
          'aldkg:TimeSeries': {
            '@id': 'mktp:Mapping_1',
            '@type': 'aldkg:TimeSeries',
            type: {
              type: 'pointer',
              value: '/type',
            },
            yField: 'price',
            xField: 'parsedAt',
            colorField: 'name',
            legend: {
              type: 'object',
              properties: {
                field: 'identifier',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'pointer', value: '/name' },
                    uri: { type: 'pointer', value: '/identifier' },
                    // color: { type: 'pointer', value: '/options/color' },
                  },
                  wrapper: { type: 'pointer', value: '/identifier' },
                },
              },
              wrapper: { type: 'none', options: true },
            },
            dataMappings: [],
          },
        },
        // child ui elements configs
        options: {
          showDatePicker: false,
          dateFormat: 'DD.MM.YYYY',
          timeUnit: 'day',
          height: 200,
          yAxes: false,
        },
      },
    ],
  },
];

const viewDescrs = [
  {
    '@id': 'mktp:CardCellViewDescr',
    '@type': 'aldkg:ViewDescr',
    viewKind: 'mktp:CardCellGridViewKind',
    title: 'CardCellGrid',
    description: 'CardCellGrid',
    collsConstrs: [
      /*{
        '@id': 'mktp:ViewDescr_Cards_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:ViewDescr_Cards_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:ProductCardShape',
            //service: mktpSchemaRepoIri,
          },
        ],
      },*/
    ],
    options: {},
    // child ui elements configs
    elements: [
      {
        '@id': 'mktp:TimeSeries_Chart',
        '@type': 'aldkg:Chart',
        '@parent': 'mktp:TreeTableChartVKElement',
        options: {
          tooltip: {
            showCrosshairs: false,
            showMarkers: true,
          },
        },
        elements: [
          {
            '@id': 'mktp:TimeSeries_1',
            '@type': 'aldkg:TimeSeriesPlot',
            options: {
              legend: false,
            },
            elements: [
              {
                '@id': 'mktp:TimeSeries_Price',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                  },
                },
                elements: [
                  {
                    '@id': 'mktp:line', // machine-generated random UUID
                    '@type': 'aldkg:ChartLine', // TODO: +'Bar'/'Pie' (auxillary bars, auxillary lines)
                    resultsScope: 'mktp:ViewKind_Cards_Coll', // reference to data
                    scope: 'hasObservations',
                    options: {
                      property: 'price',
                      color: '#2E8DF9',
                      lineWidth: 2,
                      stroke: '#2E8DF9',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKinds,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: moment.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];
