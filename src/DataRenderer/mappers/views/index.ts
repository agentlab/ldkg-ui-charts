/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { Geometry } from '@antv/g2plot/lib/adaptor/geometries/base';
import jp from 'json-pointer';
import jsonpath from 'jsonpath';
import { cloneDeep, isEmpty } from 'lodash-es';

function assignValue(property: any, value: any) {
  return value !== undefined ? { [property]: value } : {};
}

function getPointerValue(pointer: any, contextObject: any) {
  try {
    return jp.get(contextObject, pointer);
  } catch (err) {
    console.warn(err);
  }
  return undefined;
}

function assignPointerValue(property: any, pointer: any, contextObject: any) {
  const pointerValue = getPointerValue(pointer.value, contextObject);
  return assignValue(property, pointerValue ?? pointer.default);
}

function assignExpressionValue(property: any, expression: any, subject: any) {
  const { applyTo, value: expressionString } = expression;
  const actualSubject = cloneDeep(subject);
  // eslint-disable-next-line no-eval
  const values = jsonpath.apply(actualSubject, applyTo, eval(expressionString));
  if (values.length !== 1) {
    console.warn('Failed to evaluate expression', expressionString);
    return undefined;
  }
  return assignValue(property, values[0].value);
}

function assign(object: any, value: any, wrapper?: any, contextObject?: any, property?: any) {
  if (isEmpty(value)) {
    return undefined;
  }
  if (wrapper) {
    const wrapperType = wrapper.type ?? 'rawValue';
    let objectValueToAssign = {};
    switch (wrapperType) {
      case 'rawValue': {
        objectValueToAssign = { [property]: { [wrapper]: value[property] } };
        break;
      }
      case 'pointer':
        {
          const pointerValue = getPointerValue(wrapper.value, contextObject);
          if (pointerValue) {
            objectValueToAssign = { [property]: { [pointerValue]: value[property] } };
          }
        }
        break;
      default:
        objectValueToAssign = value;
        break;
    }
    return Object.assign(object, wrapper.options ? { options: objectValueToAssign } : objectValueToAssign);
  }
  return Object.assign(object, value);
}

function assignObjectValue(mappingProperties: any, contextObject: any, propertyName?: string) {
  const mappedPropertiesContainer = {};
  Object.keys(mappingProperties).forEach((property: any) => {
    const mappingPropertyType = mappingProperties[property].type ?? 'rawValue';
    let mappedValue;
    console.log(mappingPropertyType, property);
    switch (mappingPropertyType) {
      case 'rawValue':
        mappedValue = assignValue(property, mappingProperties[property]);
        break;
      case 'object':
        mappedValue = assignObjectValue(mappingProperties[property].properties, contextObject, property);
        break;
      case 'pointer':
        mappedValue = assignPointerValue(property, mappingProperties[property], contextObject);
        break;
      case 'expr':
        mappedValue = assignExpressionValue(property, mappingProperties[property], contextObject);
        break;
      default:
        break;
    }
    const { wrapper } = mappingProperties[property];
    if (wrapper) {
      assign(mappedPropertiesContainer, mappedValue, wrapper, contextObject, property);
    } else {
      assign(mappedPropertiesContainer, mappedValue);
    }
  });
  return propertyName ? { [propertyName]: mappedPropertiesContainer } : mappedPropertiesContainer;
}

export default function ViewPartMapper(mappings: any) {
  const getDataPropertiesMappings = (viewElementGeometry: any) =>
    Object.keys(mappings)
      .filter((mappingPropertyStatement: any) => mappings[mappingPropertyStatement].type === 'expr')
      .reduce((dataMappingFunctions: any, mappingPropertyStatement: any) => {
        const evaluatedProperty = viewElementGeometry[mappingPropertyStatement];
        const { dataProperty } = mappings[mappingPropertyStatement];
        const dataMapping = (dataPoint: any) =>
          Object.assign(dataPoint, { [evaluatedProperty]: dataPoint[dataProperty] });
        dataMappingFunctions.push(dataMapping);
        return dataMappingFunctions;
      }, []);

  const applyDataMappings = (viewElementGeometry: any, data: any[]) =>
    getDataPropertiesMappings(viewElementGeometry).reduce(
      (acc: any[], mappingFunction: any) => acc.map(mappingFunction),
      data,
    );

  const createGeometry = (element: any) => assignObjectValue(mappings, element);

  const getGeometryMeta = (element: any, viewElementGeometry: Geometry) => {
    const { meta: elementMeta } = element;
    const metaFields = [viewElementGeometry?.xField, viewElementGeometry?.yField];
    return metaFields.reduce(
      (acc: any, metaField: any) => Object.assign(acc, { [metaField]: elementMeta[metaField] ?? {} }),
      {},
    );
  };

  const extractGeometryOptions = (viewElementGeometry: any) => {
    if (viewElementGeometry.options) {
      const geometyOptions = cloneDeep(viewElementGeometry.options);
      delete viewElementGeometry.options;
      return geometyOptions;
    }
    return {};
  };

  return {
    createChartViewPart(element: any, viewElementData: any[]) {
      const geometry: Geometry = createGeometry(element);
      const geometryData = applyDataMappings(geometry, viewElementData);
      const geometryMeta = getGeometryMeta(element, geometry);
      const options = extractGeometryOptions(geometry);
      return { geometry, meta: geometryMeta, data: geometryData, options };
    },
  };
}

export * from './utils';
