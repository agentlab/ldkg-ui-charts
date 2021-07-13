/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { IEntConstr } from '@agentlab/sparql-jsld-client';
import { Geometry } from '@antv/g2plot/lib/adaptor/geometries/base';
import { IView } from '@antv/g2plot/lib/plots/multi-view/types';
import { Meta } from '@antv/g2plot/lib/types';
import { JSONSchema6 } from 'json-schema';
import { merge } from 'lodash-es';

export declare type ViewPart = IView & { options: Record<string, any> };

const dataFormatMetas: Record<string, Meta> = {
  'date-time': { type: 'timeCat' },
};

function getSchemaPropertiesMeta(schema: { properties: Map<string, JSONSchema6> }) {
  return Array.from(schema.properties)
    .map(([key, value]) => {
      const { format = '' } = value;
      const formatMeta = dataFormatMetas[format];
      return formatMeta ? { [key]: formatMeta } : {};
    })
    .reduce((acc, meta) => ({ ...acc, ...meta }), {});
}

function getPropertyValuesFromConstraint(constraint: IEntConstr, schema: { properties: Map<string, JSONSchema6> }) {
  const { conditions }: Record<string, any> = constraint;
  return Array.from(schema.properties.keys())
    .filter((key) => !key.startsWith('@') && {}.hasOwnProperty.call(conditions, key))
    .reduce((acc, key) => ({ ...acc, [key]: conditions[key] }), {});
}

export function createMeta(constraint: IEntConstr, schema?: { properties: Map<string, JSONSchema6> }): any {
  return schema
    ? { meta: getSchemaPropertiesMeta(schema), ...getPropertyValuesFromConstraint(constraint, schema) }
    : {
        meta: {},
      };
}

export const createEmptyViewPart = (): ViewPart => ({
  geometries: [],
  data: [],
  meta: {},
  axes: {},
  options: {},
});

function compareGeometries(g1: Geometry, g2: Geometry) {
  return g1.type === g2.type && g1.xField === g2.xField && g1.yField === g2.yField && g1.colorField === g2.colorField;
}

export function viewPartReducer(view: ViewPart, geometryViewPart: any, idx: number, sourceArray: Geometry[]): IView {
  const { geometry, meta, data, options } = geometryViewPart;
  const existingGeometry: any = view.geometries.find((g: Geometry) => compareGeometries(geometry, g));
  if (!existingGeometry) {
    view.geometries.push({ ...geometry, mapping: { ...geometry.mapping } });
  } else {
    const itemMapping: any = geometry.mapping;
    Object.keys(itemMapping).forEach((key: any) => {
      if (['color', 'style', 'size'].includes(key)) {
        if (existingGeometry.mapping[key]) {
          existingGeometry.mapping[key] = { ...existingGeometry.mapping[key], ...itemMapping[key] };
        }
      }
    });
  }
  view.data.push(...data);
  Object.assign(view.options, merge(view.options, options));
  Object.assign(view.meta, meta);

  if (idx === sourceArray.length - 1) {
    const geometriesWithCategoryMappings = view.geometries.map((g: any) => {
      const categoryMappins = Object.keys(g.mapping)
        .filter((key: any) => ['color', 'style', 'size'].includes(key))
        .reduce((acc: any, key: any) => {
          const values = g.mapping[key];
          return {
            ...acc,
            [key](dataItem: any) {
              const valueKey = dataItem[g.colorField];
              return values[valueKey];
            },
          };
        }, {});
      return { ...g, mapping: { ...g.mapping, ...categoryMappins } };
    });
    Object.assign(view.geometries, geometriesWithCategoryMappings);
  }

  return view;
}
