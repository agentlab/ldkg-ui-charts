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
  antdCells,
  antdControlRenderers,
  antdDataControlRenderers,
  antdLayoutRenderers,
  createUiModelFromState,
  Form,
  MstContextProvider,
  registerMstViewKindSchema,
  RendererRegistryEntry,
  tableRenderers,
  viewDescrCollConstr,
  viewKindCollConstr,
} from '@agentlab/ldkg-ui-react';
import '@agentlab/ldkg-ui-react/es/index.css';
import { CollState, rootModelInitialState, SparqlClientImpl } from '@agentlab/sparql-jsld-client';
import { variable } from '@rdfjs/data-model';
import { Meta, Story } from '@storybook/react';
import { asReduxStore, connectReduxDevtools } from 'mst-middlewares';
import React from 'react';
import { Provider } from 'react-redux';
import { chartsRenderers } from '../src';
import { MstBoxPlotChartVKElement, MstTimeSeriesChartVKElement } from '../src/store/MstViewElements';

const buildCustomTooltip = (property: string) => (title: string, items: any[]) => {
  const tooltipItems = items
    .map((item) => {
      const { name, value, color } = item;
      return `<div><span style="height: 0.8em; width: 0.8em; border-radius: 50%; background-color: ${color}; display: inline-block;"></span></div><div><h4>${
        categoryNames[name] || name
      }</h4></div><div>${value}</div>`;
    })
    .join('');
  return `<div style="padding: 1.5em"><h3>${title}</h3><p>${property} : MIN-Q1-Q2-Q3-MAX</p><div style="display: grid; grid-template-columns: 1.5em 2fr 1fr;">${tooltipItems}</div><div>`;
};

const categoryNames: any = {
  'https://www.wildberries.ru/catalog/podarki/detyam': 'Подарки детям',
  'https://www.wildberries.ru/catalog/podarki/zhenshchinam': 'Подарки женщинам',
};

export default {
  title: '1 Control/BoxPlotCompare',
  component: Form,
} as Meta;

const Template: Story = ({ additionalColls, viewDescrId, viewDescrCollId }: any) => {
  const renderers: RendererRegistryEntry[] = [
    ...antdControlRenderers,
    ...antdLayoutRenderers,
    ...antdDataControlRenderers,
    ...tableRenderers,
    ...chartsRenderers,
  ];
  registerMstViewKindSchema(MstTimeSeriesChartVKElement);
  registerMstViewKindSchema(MstBoxPlotChartVKElement);

  const client = new SparqlClientImpl(
    'https://rdf4j.agentlab.ru/rdf4j-server',
    'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema/namespaces',
  );
  const rootStore = createUiModelFromState('mktp-fed', client, rootModelInitialState, additionalColls);
  const store: any = asReduxStore(rootStore);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  connectReduxDevtools(require('remotedev'), rootStore);
  return (
    <div style={{ height: 'calc(100vh - 32px)' }}>
      <Provider store={store}>
        <MstContextProvider store={rootStore} renderers={renderers} cells={antdCells}>
          <Form viewDescrId={viewDescrId} viewDescrCollId={viewDescrCollId} />
        </MstContextProvider>
      </Provider>
    </div>
  );
};

const mktpSchemaRepoIri = 'https://rdf4j.agentlab.ru/rdf4j-server/repositories/mktp-schema';
const mktpOntopRepoIri = 'http://192.168.1.33:8090/sparql';

///////////////////////////////////////////////
//  Markeplaces Categories and Cards
///////////////////////////////////////////////

const viewKindsCats = [
  {
    '@id': 'mktp:TreeTableChartViewKind',
    '@type': 'aldkg:ViewKind',
    title: 'TreeTableChart',
    description: 'TreeTableChart',
    collsConstrs: [
      {
        '@id': 'mktp:Categories_Coll',
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:Categories_Coll_Shape0',
            '@type': 'aldkg:EntConstr',
            schema: 'hs:CategoryShape',
            service: mktpSchemaRepoIri,
          },
        ],
      },
    ],
    elements: [
      {
        '@id': 'mktp:_29kFg89',
        '@type': 'aldkg:VerticalLayout',
        elements: [
          //////////
          // BoxPlots
          //////////
          {
            '@id': 'mktp:BoxPlotChartViewKind',
            '@type': 'aldkg:BoxPlotChart', // control type
            options: {
              // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
            },
            mappings: {
              'aldkg:BoxPlotTimeSeries': {
                type: {
                  type: 'pointer',
                  value: '/type',
                },
                xField: 'begin',
                yField: 'value',
                outliersField: 'outliers',
                colorField: 'hasFeatureOfInterest',
                mapping: {
                  type: 'object',
                  properties: {
                    style: {
                      type: 'object',
                      properties: {
                        lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 1 },
                        fill: { type: 'pointer', value: '/options/fill' },
                        stroke: { type: 'pointer', value: '/options/stroke' },
                        fillOpacity: { type: 'pointer', value: '/options/fillOpacity', default: 0.5 },
                      },
                      wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
                    },
                    shape: {
                      type: 'pointer',
                      value: '/options/shape',
                    },
                  },
                },
                dataMappings: [
                  {
                    propertyName: {
                      type: 'pointer',
                      value: '/yField',
                    },
                    value: ['min', 'percentile_25', 'median', 'percentile_75', 'max'],
                    scope: 'data',
                  },
                ],
              },
            },
          },
          {
            '@id': 'mktp:BoxPlotChartViewKind_TotalSales',
            '@type': 'aldkg:BoxPlotChart', // control type
            options: {
              // TODO: primary/secondary properties? links to collsConstrs? Pass the entire options to the to-be rendered component?
            },
            mappings: {
              'aldkg:BoxPlotTimeSeries': {
                type: {
                  type: 'pointer',
                  value: '/type',
                },
                xField: 'begin',
                yField: 'value',
                outliersField: 'outliers',
                colorField: 'hasFeatureOfInterest',
                mapping: {
                  type: 'object',
                  properties: {
                    style: {
                      type: 'object',
                      properties: {
                        lineWidth: { type: 'pointer', value: '/options/lineWidth', default: 1 },
                        fill: { type: 'pointer', value: '/options/fill' },
                        stroke: { type: 'pointer', value: '/options/stroke' },
                        fillOpacity: { type: 'pointer', value: '/options/fillOpacity', default: 0.5 },
                      },
                      wrapper: { type: 'pointer', value: '/hasFeatureOfInterest' },
                    },
                    shape: {
                      type: 'pointer',
                      value: '/options/shape',
                    },
                  },
                },
                dataMappings: [
                  {
                    propertyName: {
                      type: 'pointer',
                      value: '/yField',
                    },
                    value: ['min', 'percentile_25', 'median', 'percentile_75', 'max'],
                    scope: 'data',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
];

const viewDescrsCats = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'Показатели продукта',
    viewKind: 'mktp:TreeTableChartViewKind',
    // datasets constraints, specific to this view (UML aggregation)
    collsConstrs: [
      //////////
      // BoxPlots
      //////////
      {
        '@id': 'mktp:_8uJ8t6_price', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78DfG_price', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg84_price', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/podarki/detyam',
              forProperty: 'hs:Price',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t6_TotalSales', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78DfG_TotalSales', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg84_TotalSales', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/podarki/detyam',
              forProperty: 'hs:TotalSales',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t7_price', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg_price', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83_price', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/podarki/zhenshchinam',
              forProperty: 'hs:Price',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
      {
        '@id': 'mktp:_8uJ8t7_TotalSales', // machine-generated random UUID
        '@type': 'aldkg:CollConstr',
        entConstrs: [
          {
            '@id': 'mktp:_uf78Dfg_TotalSales', // machine-generated random UUID
            '@type': 'aldkg:EntConstr',
            schema: 'mktp:BoxPlotBucketShape',
            conditions: {
              '@id': 'mktp:_u8Yg83_TotalSales', // machine-generated random UUID
              '@type': 'aldkg:EntConstrCondition',
              hasFeatureOfInterest: 'https://www.wildberries.ru/catalog/podarki/zhenshchinam',
              forProperty: 'hs:TotalSales',
            },
            service: mktpOntopRepoIri,
          },
        ],
        orderBy: [{ expression: variable('begin0'), descending: false }],
      },
    ],
    elements: [
      ///////
      // BoxPlots
      ////////
      {
        '@id': 'mktp:_dj457gh_chart_price',
        //''@type': 'aldkg:BoxPlotChart', // control type
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind',
        title: 'Массажная подушка роликовая, разброс складских остатков',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
          interactions: [{ type: 'active-region' }],
          axes: {
            yAxis: {
              aliases: {
                value: 'Цена, руб.',
              },
            },
          },
        },
        elements: [
          {
            '@id': 'mktp:BoxPlot_1_price',
            '@type': 'aldkg:BoxPlotTimeSeries',
            options: {
              dateFormat: 'DD.MM.YYYY',
              timeUnit: 'day',
              tooltip: {
                showMarkers: false,
                shared: true,
                showCrosshairs: false,
                customContent: buildCustomTooltip('Цена'),
              },
              legend: false,
              adjust: {
                type: 'dodge',
                marginRatio: 0.3,
              },
            },
            elements: [
              //
              // Category 1
              //
              {
                '@id': 'mktp:box1_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6_price', // reference to data
                options: {
                  shape: 'box',
                  fill: '#2E8DF9',
                  stroke: '#2E8DF9',
                  color: '#2E8DF9',
                },
              },
              //
              // Category 2
              //
              {
                '@id': 'mktp:box2_price', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t7_price', // reference to data
                options: {
                  shape: 'box',
                  fill: '#1FD0BE',
                  stroke: '#1FD0BE',
                },
              },
            ],
          },
        ],
      },
      {
        '@id': 'mktp:_dj457gh_chart_TotalSales',
        //''@type': 'aldkg:BoxPlotChart', // control type
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:BoxPlotChartViewKind_TotalSales',
        title: 'Массажная подушка роликовая, разброс складских остатков',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          showOutliers: true,
          interactions: [{ type: 'active-region' }],
          axes: {
            yAxis: {
              aliases: {
                value: 'Объём продаж, шт.',
              },
            },
          },
        },
        elements: [
          {
            '@id': 'mktp:BoxPlot_1_TotalSales',
            '@type': 'aldkg:BoxPlotTimeSeries',
            options: {
              dateFormat: 'DD.MM.YYYY',
              timeUnit: 'day',
              tooltip: {
                showMarkers: false,
                shared: true,
                showCrosshairs: false,
                customContent: buildCustomTooltip('Объем продаж'),
              },
              legend: false,
              adjust: {
                type: 'dodge',
                marginRatio: 0.3,
              },
            },
            elements: [
              //
              // Category 1
              //
              {
                '@id': 'mktp:box1_TotalSales', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t6_TotalSales', // reference to data
                options: {
                  shape: 'box',
                  fill: '#2E8DF9',
                  stroke: '#2E8DF9',
                  color: '#2E8DF9',
                },
              },
              //
              // Category 2
              //
              {
                '@id': 'mktp:box2_TotalSales', // machine-generated random UUID
                '@type': 'aldkg:BoxPlotSchema',
                resultsScope: 'mktp:_8uJ8t7_TotalSales', // reference to data
                options: {
                  shape: 'box',
                  fill: '#1FD0BE',
                  stroke: '#1FD0BE',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * Collections Configs Data
 */
const additionalCollsCats: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: viewKindsCats,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: viewDescrsCats,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];

export const MktpCategories = Template.bind({});
MktpCategories.args = {
  additionalColls: additionalCollsCats,
  viewDescrId: viewDescrsCats[0]['@id'],
  viewDescrCollId: viewDescrCollConstr['@id'],
};
