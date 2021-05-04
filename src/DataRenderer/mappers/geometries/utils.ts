import { Geometry } from '@antv/g2plot/lib/adaptor/geometries/base';

function compareGeometries(g1: Geometry, g2: Geometry) {
  return g1.type === g2.type && g1.xField === g2.xField && g1.yField === g2.yField && g1.colorField === g2.colorField;
}

export function geometriesReducer(accumulator: any, item: Geometry, idx: number, sourceArray: Geometry[]) {
  const geometry = accumulator.find((g: Geometry) => compareGeometries(item, g));
  if (!geometry) {
    const geom = {
      ...item,
      mapping: { ...item.mapping },
    };
    accumulator.push(geom);
  } else {
    const itemMapping: any = item.mapping;
    Object.keys(itemMapping).forEach((key: any) => {
      if (['color', 'style', 'size'].includes(key)) {
        if ({}.hasOwnProperty.call(geometry.mapping, key)) {
          Object.assign(geometry.mapping[key], itemMapping[key]);
        }
      }
    });
  }

  if (idx === sourceArray.length - 1) {
    accumulator.forEach((g: any) => {
      Object.keys(g.mapping).forEach((key: any) => {
        if (['color', 'style', 'size'].includes(key)) {
          const values = g.mapping[key];
          Object.assign(g.mapping, {
            [key](mappingItem: any) {
              const valueKey = mappingItem[g.colorField];
              return values[valueKey];
            },
          });
        }
      });
    });
  }

  return accumulator;
}
