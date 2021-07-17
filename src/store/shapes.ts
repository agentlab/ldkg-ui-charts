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
