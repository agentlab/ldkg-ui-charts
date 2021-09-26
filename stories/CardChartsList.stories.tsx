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
  MstVerticalLayout,
  registerMstViewKindSchema,
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
} as Meta;

export const Full: Story<{}> = () => {
  const antdRenderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
  ];
  registerMstViewKindSchema(MstVerticalLayout);

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
      <MstContextProvider store={rootStore} renderers={antdRenderers} cells={antdCells}>
        <div
          style={{
            //height: '1000px',
            width: '100%',
            backgroundColor: 'rgba(230, 235, 242, 0.5)',
            margin: '0 auto',
            padding: '5px',
          }}>
          <Form viewDescrId={viewDescrs[0]['@id']} viewDescrCollId={viewDescrCollConstr['@id']} />
        </div>
      </MstContextProvider>
    </Provider>
  );
};

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
          },
          {
            '@id': 'mktp:ViewKind_Cards_Coll_Ent1',
            '@type': 'aldkg:EntConstr',
            //TODO: schema: 'hs:HSObservationCardsListShape',
            schema: HSObservationShapeSchemaForCardsListShape,
            conditions: {
              parsedAt: {
                relation: 'after',
                value: ['2021-07-01T00:00:00'],
              },
            },
            orderBy: [{ expression: variable('parsedAt1'), descending: false }],
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
        '@id': 'mktp:_29kFg89',
        '@type': 'aldkg:VerticalLayout',
        elements: [
          {
            '@id': 'mktp:_24Hdr78',
            '@type': 'aldkg:DataControl',
            resultsScope: 'mktp:ViewKind_Cards_Coll',
            options: {
              renderType: 'grid',
              grid: {
                gutter: 16,
                xs: 2,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 7,
              },
              elementTemplate: [
                {
                  '@id': 'mktp:_94hfT67',
                  '@type': 'aldkg:CardLayout',
                  elements: [
                    {
                      '@id': 'mktp:_kje733js',
                      '@type': 'aldkg:ImageCell',
                      scope: 'imageUrl',
                    },
                    {
                      '@id': 'mktp:_jw563df',
                      '@type': 'aldkg:Control',
                      scope: 'name',
                      options: {
                        editable: false,
                        style: {
                          height: '3.5em',
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          margin: 0,
                        },
                      },
                    },
                    {
                      '@id': 'mktp:_84gdY576',
                      '@type': 'aldkg:Rate',
                      scope: 'starsValue',
                      options: {
                        editable: false,
                      },
                    },
                    {
                      '@id': 'mktp:_934Hfg78',
                      '@type': 'aldkg:CellHorizontalLayout',
                      options: {
                        justify: 'space-between',
                      },
                      elements: [
                        {
                          '@id': 'mktp:_kfg67we',
                          '@type': 'aldkg:Control',
                          scope: 'price',
                          options: {
                            formatter: 'labeledValue',
                            editable: false,
                            label: 'Цена',
                            specialChar: '₽',
                            style: {
                              textAlign: 'left',
                              fontFamily: 'Lato,Tahoma,sans-serif',
                              color: 'gray',
                            },
                          },
                        },
                        {
                          '@id': 'mktp:_jdf782fK',
                          '@type': 'aldkg:Control',
                          scope: 'totalSales',
                          options: {
                            formatter: 'labeledValue',
                            editable: false,
                            label: 'Всего продано',
                            style: {
                              textAlign: 'right',
                              fontFamily: 'Lato,Tahoma,sans-serif',
                              color: 'gray',
                            },
                          },
                        },
                      ],
                    },
                    {
                      '@id': 'mktp:_Udf783d',
                      '@type': 'aldkg:Control',
                      scope: 'lastMonthSalesAmount',
                      options: {
                        editable: false,
                        formatter: 'сomparison',
                        dataToFormatter: {
                          prevValue: 'prevMonthSalesAmount',
                        },
                        label: 'Продажи за месяц',
                        style: {
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          color: 'gray',
                        },
                      },
                    },
                    {
                      '@id': 'mktp:_iw789dd',
                      '@type': 'aldkg:Control',
                      scope: 'lastMonthSalesValue',
                      options: {
                        formatter: 'сomparison',
                        editable: false,
                        dataToFormatter: {
                          prevValue: 'prevMonthSalesValue',
                        },
                        label: 'Объем продаж',
                        style: {
                          textAlign: 'left',
                          fontFamily: 'Lato,Tahoma,sans-serif',
                          color: 'gray',
                        },
                      },
                    },
                    {
                      '@id': 'mktp:_385hgf67',
                      '@type': 'aldkg:G2',
                    },
                    {
                      '@id': 'mktp:_jfg789df',
                      '@type': 'aldkg:CellHorizontalLayout',
                      options: {
                        justify: 'space-around',
                      },
                      elements: [
                        {
                          '@id': 'mktp:_45jdfg78',
                          '@type': 'aldkg:Control',
                          scope: '@id',
                          options: {
                            style: {
                              border: '1.5px solid black',
                              borderRadius: '2px',
                              height: '2em',
                              textAlign: 'center',
                              fontWeight: 500,
                              width: '90px',
                              color: 'black',
                            },
                            specialImage: 'https://www.meme-arsenal.com/memes/f8e9bfb9fdf368272b21a5dac8f01ec1.jpg',
                            editable: false,
                            formatter: 'link',
                            dataToFormatter: {
                              link: '@id',
                            },
                            label: 'Wildberries',
                          },
                        },
                        {
                          '@id': 'mktp:_dfg897',
                          '@type': 'aldkg:Button',
                          options: {
                            label: 'Добавить',
                            style: {
                              border: '1.5px solid black',
                              borderRadius: '2px',
                              width: '90px',
                              fontWeight: 500,
                              color: 'black',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        ],
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
          },
        ],
      },*/
    ],
    options: {},
    // child ui elements configs
    elements: [],
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
