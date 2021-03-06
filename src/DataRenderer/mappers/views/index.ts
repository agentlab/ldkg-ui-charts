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
import { JSONPath } from 'jsonpath-plus';
import { cloneDeep, isEmpty, pickBy } from 'lodash-es';

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

  const values = JSONPath({
    path: applyTo,
    json: actualSubject,
  });

  if (values.length === 0) {
    return assignValue(property, null);
  }

  if (expressionString) {
    // eslint-disable-next-line no-eval
    const callback = eval(expressionString);
    if (typeof callback === 'function') {
      const value = callback(...values);
      return assignValue(property, value);
    }
  }

  return assignValue(property, values);
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
          let pointerValue = getPointerValue(wrapper.value, contextObject);
          if (typeof pointerValue === 'object' && pointerValue !== null) {
            pointerValue = pointerValue['@id'];
          }
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
    //console.log(mappingPropertyType, property);
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
  const getDataMappings = (viewElementGeometry: any, element: any) => {
    const defaultScope = 'default';
    return mappings.dataMappings?.map((dm: any) => {
      const dataProperty = assignObjectValue(dm, {
        ...viewElementGeometry,
        ...element,
      }) as { propertyName: string; value: string; scope: string };
      const { propertyName, value, scope = defaultScope } = dataProperty;
      return {
        data: (dataPoint: any) => ({
          ...dataPoint,
          [propertyName]: Array.isArray(value) ? value.map((v: any) => dataPoint[v]) : dataPoint[value],
        }),
        [defaultScope]: (dataPoint: any) => ({ ...dataPoint, [propertyName]: value }),
      }[scope];
    });
  };

  const applyDataMappings = (viewElementGeometry: any, data: any[], element: any) =>
    getDataMappings(viewElementGeometry, element)?.reduce(
      (acc: any[], mappingFunction: any) => acc.map(mappingFunction),
      data,
    ) || data;

  const createGeometry = (element: any): Geometry => assignObjectValue(mappings, element);

  const getGeometryMeta = (element: any, viewElementGeometry: Geometry) => {
    const { meta: elementMeta } = element;
    const metaFields = [viewElementGeometry?.xField, viewElementGeometry?.yField];
    return metaFields.reduce(
      (acc: any, metaField: any) => Object.assign(acc, { [metaField]: elementMeta?.[metaField] ?? {} }),
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

  const computeAdditionalMeta = (viewElement: any) => {
    const isMetaMappingProperty = (m: any) => m.scope === 'meta';
    const metaMappings = pickBy(mappings, isMetaMappingProperty);
    return assignObjectValue(metaMappings, viewElement);
  };

  return {
    createChartViewPart(element: any, viewElementData: any) {
      const { data, resultsScope } = viewElementData;
      const computedMeta = computeAdditionalMeta(element);
      const mappingContext = { ...element, ...computedMeta };
      const geometry = createGeometry(mappingContext);
      const geometryData = applyDataMappings(geometry, data, mappingContext);
      const geometryMeta = getGeometryMeta(mappingContext, geometry);
      const options = extractGeometryOptions(geometry);
      return { geometry, meta: geometryMeta, data: { resultsScope, data: geometryData }, options };
    },
  };
}

export * from './utils';
