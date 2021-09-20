/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { viewDescrCollConstr, viewKindCollConstr } from '@agentlab/ldkg-ui-react';
import { CollState } from '@agentlab/sparql-jsld-client';
import { denormalizedObservationsViewKinds } from './DenormalizedObservationsData';
import { fromProducts } from './timeseries';
import { qualitative20 } from './utils/colors';

const viewElements = {
  'hs:price': {
    type: 'line',
    options: {
      lineWidth: 2,
      shape: 'hvh',
      property: 'price',
      statistics: ['min', 'max', 'deltapercent'],
    },
  },
  'hs:totalSales': {
    type: 'line',
    options: {
      lineWidth: 2,
      property: 'totalSales',
      statistics: ['min', 'max', 'deltaabs'],
    },
  },
  'hs:stocks': {
    type: 'line',
    options: {
      lineWidth: 2,
      property: 'stocks',
      statistics: ['min', 'max', 'deltaabs'],
    },
  },
};

const productProperties = ['hs:price', 'hs:totalSales', 'hs:stocks'];

const products = [
  {
    product: 'https://www.wildberries.ru/catalog/11138350/detail.aspx',
    name: 'Mellingward / Маятник "Манэки нэко с мешком богатства" / Талисман на удачу / Игрушка антистресс, 6 x 7 x 13 см',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10477056/detail.aspx',
    name: 'Miland / Сквиш Пончик',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10477059/detail.aspx',
    name: 'Miland / Сквиш Красивая сова',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10477060/detail.aspx',
    name: 'Miland / Сквиш Волшебный единорог',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10477061/detail.aspx',
    name: 'Miland / Сквиш Забавный смайлик',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10477062/detail.aspx',
    name: 'Miland / Сквиш Милая собака',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10477064/detail.aspx',
    name: 'Miland / Сквиш Забавный единорог (цвета в ассортименте)',
  },
  {
    product: 'https://www.wildberries.ru/catalog/10584519/detail.aspx',
    name: 'BRADEX / Стреляющий зверь Динозавр',
  },
  /*
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    name: 'Массажер для ног MF-3B Smart Compression, 3 вида массажа, 2 уровня интенсивности, дисплей, подогрев',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/15622789/detail.aspx',
    name: 'Массажер для ног MF-3B Smart Compression, 3 вида массажа, 2 уровня интенсивности, дисплей, подогрев',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/13556367/detail.aspx',
    name: 'Массажер для ног MF-3B Smart Compression, 3 вида массажа, 2 уровня интенсивности, дисплей, подогрев',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/14568528/detail.aspx',
    name: 'Массажер для спины и шеи / Массажер для плеч / Массажер электрический',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/14641461/detail.aspx',
    name: 'Массажер подушка для спины и шеи, Premium, 4 функции, 8 шариков, для тела, головы',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/14690297/detail.aspx',
    name: 'Компрессионный лимфодренажный массажер для ног MFC-40,3 режима,3 уровня интенсивности, прессотерапия',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/14899402/detail.aspx',
    name: 'Массажный пистолет беспроводной перкуссионный массажер/ Массажер для плеч, спины и шеи ',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/15574020/detail.aspx',
    name: 'Массажер для спины и шеи/Массажер электрический для массаж спины плеч тела шеи ног Массажная подушка',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/15651968/detail.aspx',
    name: 'Массажер для шеи / спины / плеч / ног / поясницы универсальный шиацу с подогревом',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/15847178/detail.aspx',
    name: 'Массажная подушка с термороликами / Массажер электрический / Массажер для плеч / Массажер для спины',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/16170086/detail.aspx',
    name: 'Массажная подушка с подогревом для дома и автомобиля / шеи и спины 8 роликов /Массаж шиацу',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/17100027/detail.aspx',
    name: 'Массажер для шеи ног спины / электрический массажер / массажер подушка',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/17100030/detail.aspx',
    name: 'Массажер для шеи спины ног / Электрический массажер / Роликовый массажер',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/18291071/detail.aspx',
    name: 'Массажная подушка с термороликами / Массажер электрический / Массажер для плеч / Массажер для спины',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/18362879/detail.aspx',
    name: 'Массажная подушка с термороликами для дома и автомобиля/ Массажер для спины и шеи/ Массажер для ног',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/18488809/detail.aspx',
    name: 'Массажер/Массажная подушка/Подарок на день рождения  юбилей новоселье любимому любимой коллеге/хит',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/19385295/detail.aspx',
    name: 'Массажер для спины и шеи / Массажер для плеч / Массажер электрический',
  },
  { featureOfInterest: 'https://www.wildberries.ru/catalog/2171426/detail.aspx', name: 'Массажер Nozomi MH-102' },
  { featureOfInterest: 'https://www.wildberries.ru/catalog/25598277/detail.aspx', name: 'Массажер электрический' },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/25739859/detail.aspx',
    name: 'Электрический массажер для шеи /спины/ плеч/тела/ног/поясницы/ударный, мышечный массажер',
  },
  {
    featureOfInterest: 'https://www.wildberries.ru/catalog/5400314/detail.aspx',
    name: 'Массажер для ног MF-4W Massage Bliss, 4 программы, 3 скорости, 2 направления вращения, подогрев',
  },*/
];

const [collsConstrs, elements] = fromProducts(products, productProperties)
  .withElements(viewElements)
  .withColors(qualitative20)
  .limit(5)
  .shuffle()
  .build();

export const timeSeriesViewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'aldkg:ViewDescr',
    title: 'ProductAnalysis',
    description: 'Marketplace Product Analysis Time-series Charts',
    viewKind: 'mktp:TimeSeriesViewKind',
    elements: [
      {
        '@id': 'mktp:_dw89H7gh_chart',
        '@type': 'aldkg:Chart', // control type
        '@parent': 'mktp:TimeSeriesChartViewKind',
        title: 'ProductAnalysis',
        // child ui elements configs
        options: {
          timeUnit: 'day',
          dateFormat: 'DD.MM.YYYY',
          interactions: [{ type: 'sibling-tooltip' }],
        },
        elements: [
          {
            '@id': 'mktp:TimeSeries_1',
            '@type': 'aldkg:TimeSeriesPlot',
            options: {
              tooltip: false,
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
                  region: {
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0.48,
                    },
                  },
                },
                elements: elements['price'],
              },
              {
                '@id': 'mktp:TimeSeries_Sales',
                '@type': 'aldkg:TimeSeries',
                options: {
                  legend: false,
                  tooltip: {
                    showCrosshairs: true,
                    shared: true,
                    showMarkers: true,
                  },
                  region: {
                    start: {
                      x: 0,
                      y: 0.52,
                    },
                    end: {
                      x: 1,
                      y: 1,
                    },
                  },
                },
                elements: elements['totalSales'],
              },
            ],
          },
        ],
      },
    ],
    collsConstrs,
  },
];

/**
 * Collections Configs Data
 */
export const additionalColls: CollState[] = [
  // ViewKinds Collection
  {
    constr: viewKindCollConstr,
    data: [...denormalizedObservationsViewKinds /*, ...remoteBoxPlotViewKinds*/],
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
    },
  },
  // ViewDescrs Collection
  {
    constr: viewDescrCollConstr,
    data: timeSeriesViewDescrs,
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      //resolveCollConstrs: false, // 'true' here (by default) triggers data loading from the server
      // for viewDescrs.collConstrs (it loads lazily -- after the first access)
    },
  },
];
