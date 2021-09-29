/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

export const observationShape = {
  '@id': 'sosa:ObservationShape',
  '@type': 'sh:NodeShape',
  '@context': {
    '@type': 'rdf:type',
    hasFeatureOfInterest: {
      '@id': 'sosa:hasFeatureOfInterest',
      '@type': 'sosa:FeatureOfInterest',
    },
    observedProperty: {
      '@id': 'sosa:observedProperty',
      '@type': 'sosa:ObservableProperty',
    },
    madeBySensor: {
      '@id': 'sosa:madeBySensor',
      '@type': 'sosa:Sensor',
    },
    hasSimpleResult: {
      '@id': 'sosa:hasSimpleResult',
      '@type': 'xsd:long',
    },
    resultTime: {
      '@id': 'sosa:resultTime',
      '@type': 'xsd:dateTime',
    },
  },
  targetClass: 'sosa:Observation',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
    hasFeatureOfInterest: {
      type: 'string',
      format: 'iri',
    },
    observedProperty: {
      type: 'string',
      format: 'iri',
    },
    madeBySensor: {
      type: 'string',
      format: 'iri',
    },
    hasSimpleResult: {
      type: 'integer',
    },
    resultTime: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['@id', '@type', 'hasFeatureOfInterest', 'observedProperty', 'madeBySensor', 'hasSimpleResult'],
};

export const boxPlotBucketShape = {
  '@id': 'mktp:BoxPlotBucketShape',
  '@type': 'sh:NodeShape',
  '@context': {
    '@type': 'rdf:type',
    hasFeatureOfInterest: {
      '@id': 'sosa:hasFeatureOfInterest',
      '@type': 'sosa:FeatureOfInterest',
    },
    forProperty: {
      '@id': 'ssn:forProperty',
      '@type': 'sosa:ObservableProperty',
    },
    computedBy: {
      '@id': 'mktp:computedBy',
      '@type': 'mktp:BoxPlotAggregation',
    },
    begin: {
      '@id': 'mktp:begin',
      '@type': 'xsd:dateTime',
    },
    end: {
      '@id': 'mktp:end',
      '@type': 'xsd:dateTime',
    },
    iqr: {
      '@id': 'mktp:iqr',
      '@type': 'xsd:double',
    },
    max: {
      '@id': 'mktp:max',
      '@type': 'xsd:double',
    },
    median: {
      '@id': 'mktp:median',
      '@type': 'xsd:double',
    },
    min: {
      '@id': 'mktp:min',
      '@type': 'xsd:double',
    },
    percentile_25: {
      '@id': 'mktp:percentile_25',
      '@type': 'xsd:double',
    },
    percentile_75: {
      '@id': 'mktp:percentile_75',
      '@type': 'xsd:double',
    },
    count: {
      '@id': 'mktp:count',
      '@type': 'xsd:long',
    },
    hasLowerOutlier: {
      '@id': 'mktp:hasLowerOutlier',
      '@type': 'sosa:Observation',
    },
    hasUpperOutlier: {
      '@id': 'mktp:hasUpperOutlier',
      '@type': 'sosa:Observation',
    },
  },
  targetClass: 'mktp:BoxPlotBucket',
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
    hasFeatureOfInterest: {
      type: 'string',
      format: 'iri',
    },
    forProperty: {
      type: 'string',
      format: 'iri',
    },
    computedBy: {
      type: 'string',
      format: 'iri',
    },
    begin: {
      type: 'string',
      format: 'date-time',
    },
    end: {
      type: 'string',
      format: 'date-time',
    },
    iqr: {
      type: 'number',
    },
    max: {
      type: 'number',
    },
    median: {
      type: 'number',
    },
    min: {
      type: 'number',
    },
    percentile_25: {
      type: 'number',
    },
    percentile_75: {
      type: 'number',
    },
    count: {
      type: 'integer',
    },
    hasLowerOutlier: {
      type: 'string',
      format: 'iri',
    },
    hasUpperOutlier: {
      type: 'string',
      format: 'iri',
    },
  },
  required: [
    '@id',
    '@type',
    'hasFeatureOfInterest',
    'forProperty',
    'computedBy',
    'begin',
    'end',
    'iqr',
    'max',
    'median',
    'min',
    'percentile_25',
    'percentile_75',
    'count',
  ],
};

export const productCardShapeSchemaForCardsListShape = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'hs:ProductCardShapeForCardsList',
  '@type': 'sh:NodeShape',
  title: 'Карточка товара',
  description: '',
  targetClass: 'hs:ProductCard',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
    hasObservations: {
      '@reverse': 'hs:product',
    },
    identifier: {
      '@id': 'hs:identifier',
      '@type': '@id',
    },
    name: {
      '@id': 'hs:name',
      '@type': 'xsd:string',
    },
    brand: {
      '@id': 'hs:brand',
      '@type': '@id',
    },
    country: {
      '@id': 'hs:country',
      '@type': 'xsd:string',
    },
    price: {
      '@id': 'hs:price',
      '@type': 'xsd:int',
    },
    saleValue: {
      '@id': 'hs:saleValue',
      '@type': 'xsd:int',
    },
    seller: {
      '@id': 'hs:seller',
      '@type': '',
    },
    //imageUrl: {
    //  '@id': 'hs:imageUrl',
    //  '@type': '',
    //},
    //
    categoryPopularity: {
      '@id': 'hs:categoryPopularity',
      '@type': 'xsd:double',
    },
    questionsCount: {
      '@id': 'hs:questionsCount',
      '@type': 'xsd:int',
    },
    commentsCount: {
      '@id': 'hs:commentsCount',
      '@type': 'xsd:int',
    },
    photosCount: {
      '@id': 'hs:photosCount',
      '@type': 'xsd:int',
    },
    starsValue: {
      '@id': 'hs:starsValue',
      '@type': 'xsd:int',
    },
    //
    lastMonthSalesAmount: {
      '@id': 'hs:lastMonthSalesAmount',
      '@type': 'xsd:int',
    },
    lastMonthSalesValue: {
      '@id': 'hs:lastMonthSalesValue',
      '@type': 'xsd:int',
    },
    perMonthSalesAmount: {
      '@id': 'hs:perMonthSalesAmount',
      '@type': 'xsd:int',
    },
    perMonthSalesValue: {
      '@id': 'hs:perMonthSalesValue',
      '@type': 'xsd:int',
    },
    prevMonthSalesAmount: {
      '@id': 'hs:prevMonthSalesAmount',
      '@type': 'xsd:int',
    },
    prevMonthSalesValue: {
      '@id': 'hs:prevMonthSalesValue',
      '@type': 'xsd:int',
    },
    //
    salesAmountDiff: {
      '@id': 'hs:salesAmountDiff',
      '@type': 'xsd:int',
    },
    totalSales: {
      '@id': 'hs:totalSales',
      '@type': 'xsd:int',
    },
    totalSalesDiff: {
      '@id': 'hs:totalSalesDiff',
      '@type': 'xsd:int',
    },
    //
    stocks: {
      '@id': 'hs:stocks',
      '@type': 'xsd:int',
    },
    stocksDiffOrders: {
      '@id': 'hs:stocksDiffOrders',
      '@type': 'xsd:int',
    },
    stocksDiffReturns: {
      '@id': 'hs:stocksDiffReturns',
      '@type': 'xsd:int',
    },
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
    hasObservations: {
      type: 'array',
      items: {
        type: 'object',
      },
    },
    identifier: {
      title: 'ИД HunterSales',
      type: 'string',
      format: 'iri',
    },
    name: {
      title: 'Название',
      type: 'string',
    },
    brand: {
      title: 'Бренд',
      type: 'string',
      format: 'iri',
    },
    country: {
      title: 'Страна',
      type: 'string',
    },
    price: {
      title: 'Цена',
      type: 'integer',
    },
    saleValue: {
      title: 'Размер скидки',
      type: 'integer',
    },
    seller: {
      title: 'Продавец',
      type: 'string',
      format: 'iri',
    },
    //imageUrl: {
    //  title: 'Изображение товара',
    //  type: 'array',
    //  items: {
    //    type: 'string',
    //    format: 'iri',
    //  },
    //},
    //
    categoryPopularity: {
      title: 'Популярность категории',
      type: 'number',
    },
    questionsCount: {
      title: 'Кол-во вопросов',
      type: 'integer',
    },
    commentsCount: {
      title: 'Кол-во комментариев',
      type: 'integer',
    },
    photosCount: {
      title: 'Кол-во фото',
      type: 'integer',
    },
    starsValue: {
      title: 'Кол-во звезд',
      type: 'integer',
    },
    //
    lastMonthSalesAmount: {
      title: 'Продажи за последний месяц',
      type: 'integer',
    },
    lastMonthSalesValue: {
      title: 'Выручка за последний месяц',
      type: 'integer',
    },
    perMonthSalesAmount: {
      title: 'Средние продажи за месяц',
      type: 'integer',
    },
    perMonthSalesValue: {
      title: 'Средняя выручка за месяц',
      type: 'integer',
    },
    prevMonthSalesAmount: {
      title: 'Средние продажи за прошлый месяц',
      type: 'integer',
    },
    prevMonthSalesValue: {
      title: 'Средняя выручка за прошлый месяц',
      type: 'integer',
    },
    //
    salesAmountDiff: {
      title: 'Изменение объема продаж',
      type: 'integer',
    },
    totalSales: {
      title: 'Купили более * раз',
      type: 'integer',
    },
    totalSalesDiff: {
      title: 'Купили более * раз (изменение)',
      type: 'integer',
    },
    //
    stocks: {
      title: 'Остатки в шт',
      type: 'integer',
    },
    stocksDiffOrders: {
      title: 'Поступления-Возвраты в шт (изменение)',
      type: 'integer',
    },
    stocksDiffReturns: {
      title: 'Заказы в шт (изменение)',
      type: 'integer',
    },
  },
  required: ['@id', '@type', 'name', 'lastMonthSalesValue', 'hasObservations'],
};

export const HSObservationShapeSchemaForCardsListShape = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  '@id': 'hs:HSObservationShapeForCardsList',
  '@type': 'sh:NodeShape',
  title: '',
  description: '',
  targetClass: 'hs:HSObservation',
  type: 'object',
  '@context': {
    '@type': 'rdf:type',
    parsedAt: {
      '@id': 'hs:parsedAt',
      '@type': 'xsd:dateTime',
    },
    price: {
      '@id': 'hs:price',
      '@type': 'xsd:int',
    },
  },
  properties: {
    '@id': {
      title: 'URI',
      type: 'string',
      format: 'iri',
    },
    '@type': {
      title: 'Тип',
      type: 'string',
      format: 'iri',
    },
    parsedAt: {
      type: 'string',
      format: 'date-time',
    },
    price: {
      title: 'Цена',
      type: 'integer',
    },
  },
  required: ['@id', '@type', 'parsedAt', 'price'],
};
