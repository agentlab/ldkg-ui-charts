/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { CollState } from '@agentlab/sparql-jsld-client';
import { timeSeriesViewKinds, viewDescrCollConstr, viewKindCollConstr } from './data';
import { remoteBoxPlotViewKinds } from './RemoteBoxPlot';
import { fromProducts } from './timeseries';
import { qualitative20 } from './utils/colors';

const viewElements = {
  'hs:Price': {
    type: 'line',
    options: {
      lineWidth: 2,
      shape: 'hvh',
      statistics: ['min', 'max', 'deltapercent'],
    },
  },
  'hs:TotalSales': {
    type: 'line',
    options: {
      lineWidth: 2,
      statistics: ['min', 'max', 'deltaabs'],
    },
  },
};

const productProperties = ['hs:Price', 'hs:TotalSales'];

const products = [
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
  },
];

const [collsConstrs, elements] = fromProducts(products, productProperties)
  .withElements(viewElements)
  .withColors(qualitative20)
  .limit(5)
  .shuffle()
  .build();

const timeSeriesViewDescrs = [
  {
    '@id': 'mktp:_g7H7gh',
    '@type': 'rm:View',
    title: 'ProductAnalysis',
    description: 'Marketplace Product Analysis Time-series Charts',
    viewKind: 'rm:TimeSeriesViewKind',
    type: 'Chart', // control type
    // child ui elements configs
    options: {
      timeUnit: 'day',
      dateFormat: 'DD.MM.YYYY',
      axes: { yAxis: { primary: ['Price'], secondary: ['TotalSales'], ratio: 0.7 } },
    },
    elements: [
      {
        '@id': 'rm:TimeSeries_1',
        '@type': 'rm:TimeSeries',
        type: 'timeSeries',
        options: {
          tooltip: {
            shared: true,
            showMarkers: true,
            showCrosshairs: true,
          },
        },
        elements,
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
    data: [...timeSeriesViewKinds, ...remoteBoxPlotViewKinds],
    opt: {
      updPeriod: undefined,
      lastSynced: Date.now(),
      resolveCollConstrs: false, // disable data loading from the server for viewKinds.collConstrs
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
