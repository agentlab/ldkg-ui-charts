import jp from 'json-pointer';
import jsonpath from 'jsonpath';
import _ from 'lodash';

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
  const actualSubject = _.cloneDeep(subject);
  // eslint-disable-next-line no-eval
  const values = jsonpath.apply(actualSubject, applyTo, eval(expressionString));
  if (values.length !== 1) {
    console.warn('Failed to evaluate expression', expressionString);
    return undefined;
  }
  return assignValue(property, values[0].value);
}

function assign(object: any, value: any, wrapper?: any, contextObject?: any, property?: any) {
  if (_.isEmpty(value)) {
    return undefined;
  }
  if (wrapper) {
    const wrapperType = wrapper.type ?? 'rawValue';
    switch (wrapperType) {
      case 'rawValue': {
        return Object.assign(object, { [property]: { [wrapper]: value[property] } });
      }
      case 'pointer':
        {
          const pointerValue = getPointerValue(wrapper.value, contextObject);
          if (pointerValue) {
            return Object.assign(object, { [property]: { [pointerValue]: value[property] } });
          }
        }
        break;
      default:
        return Object.assign(object, value);
    }
  }
  return Object.assign(object, value);
}

function assignObjectValue(mappingProperties: any, contextObject: any, propertyName?: string) {
  const mappedPropertiesContainer = {};
  Object.keys(mappingProperties).forEach((property: any) => {
    const mappingPropertyType = mappingProperties[property].type ?? 'rawValue';
    let mappedValue;
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

function getDataPropertiesMappings(viewElementGeometry: any, mappings: any[]) {
  const dataMappings: any[] = [];
  Object.keys(mappings).forEach((mapping: any) => {
    const { type = 'rawValue' } = mappings[mapping];
    if (type === 'expr') {
      const evaluatedProperty = viewElementGeometry[mapping];
      const { dataProperty } = mappings[mapping];
      const applyToDataPoint = (dataPoint: any) =>
        Object.assign(dataPoint, { [evaluatedProperty]: dataPoint[dataProperty] });
      dataMappings.push(applyToDataPoint);
    }
  });
  return dataMappings;
}

export function createGeometryForViewElement(element: any, mappings: any[]) {
  const mappingObjectProperties = mappings;
  const viewElementGeometry = assignObjectValue(mappingObjectProperties, element);
  const dataMappings = getDataPropertiesMappings(viewElementGeometry, mappings);
  return { viewElementGeometry, dataMappings };
}

export * from './utils';
