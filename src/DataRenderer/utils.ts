import { compareByIri, IViewDescr, IViewDescrElement, IViewKind, IViewKindElement } from '@agentlab/ldkg-ui-react';
import { IEntConstrJsOpt, JSONSchema6forRdf } from '@agentlab/sparql-jsld-client';
import { cloneDeep, merge } from 'lodash-es';
import { getSnapshot, isStateTreeNode } from 'mobx-state-tree';
import ViewPartMapper, { createEmptyViewPart, createMeta, viewPartReducer } from './mappers/views';

const elementTypes: Record<string, string> = {
  'aldkg:Chart': 'chart',
  'aldkg:TimeSeriesPlot': 'timeSeriesPlot',
  'aldkg:TimeSeries': 'timeSeries',
  'aldkg:ChartLine': 'line',
  'aldkg:BoxPlotChart': 'BoxPlotChart',
  'aldkg:BoxPlotTimeSeries': 'boxPlotTimeSeries',
  'aldkg:BoxPlotSchema': 'schema',
  'aldkg:ChartPoint': 'point',
  'aldkg:ChartArea': 'area',
};

export function getElementTypes(element: any): string {
  return elementTypes[element['@type']] || 'unknown';
}

export type ElementDataProvider = (element: IViewDescrElement | IViewKindElement) => any[];
export type SchemaProvider = (constr: IEntConstrJsOpt) => JSONSchema6forRdf;
export type MappingsProvider = (elementType: string) => any;

export function buildViewConfig(
  root: IViewDescrElement | IViewKindElement,
  viewDescr: IViewDescr,
  viewKind: IViewKind,
  getData: ElementDataProvider,
  getSchema: SchemaProvider,
  getMappings: MappingsProvider,
) {
  function buildViewRecursive(element: any) {
    if (isStateTreeNode(element)) element = getSnapshot(element);
    //console.log('buildView', element);

    element = cloneDeep(element);
    element.type = getElementTypes(element);

    const childElementViews = element.elements;
    if (childElementViews) {
      const children: any = childElementViews.map(buildViewRecursive);
      const elementType = element['@type'];
      const elementMapping = getMappings(elementType);

      if (elementMapping) {
        const viewPartMapper = ViewPartMapper(elementMapping);
        const elementOptions = element.options;
        const childView = children
          .map((elemWithMeta: any) => {
            let data = getData(elemWithMeta);

            // TODO: fix sotring in sparql client and remove sorting below
            data = cloneDeep(data);
            if (data.length > 0) {
              if (data[0].resultTime) {
                data = (data as any[]).sort(
                  (a: any, b: any) => new Date(a.resultTime).valueOf() - new Date(b.resultTime).valueOf(),
                );
              } else if (data[0].parsedAt) {
                data = (data as any[]).sort(
                  (a: any, b: any) => new Date(a.parsedAt).valueOf() - new Date(b.parsedAt).valueOf(),
                );
              } else if (data[0].bucketEnd) {
                data = (data as any[]).sort(
                  (a: any, b: any) => new Date(a.bucketEnd).valueOf() - new Date(b.bucketEnd).valueOf(),
                );
              }
            }
            //console.log('buildView - childElementViews - data', data);
            const resultsScope = elemWithMeta.resultsScope;
            const chartViewPart = viewPartMapper.createChartViewPart(elemWithMeta, { resultsScope, data });
            return chartViewPart as any;
          })
          .reduce(viewPartReducer, createEmptyViewPart());
        return elementOptions ? { ...childView, options: { ...elementOptions, ...childView.options } } : childView;
      }
      return { id: element['@id'], views: children };
    } else {
      const collConstrs =
        viewDescr.collsConstrs && viewDescr.collsConstrs.length > 0 ? viewDescr.collsConstrs : viewKind.collsConstrs;
      const elemCollConstr = collConstrs.find((constraint) => compareByIri(constraint['@id'], element.resultsScope));
      const viewElemMeta =
        elemCollConstr?.entConstrs
          .map((e) => {
            const schema: any = getSchema(e);
            return createMeta(e, schema);
          })
          .reduce(merge, {}) || {};
      return { id: element['@id'], ...viewElemMeta, ...element };
    }
  }

  const viewsConfig = root.elements?.map((el) => {
    const view = buildViewRecursive(el);
    return view.views ? view : { id: el['@id'], views: [view] };
  });
  return viewsConfig?.length === 1 ? viewsConfig[0] : viewsConfig;
}

export function findElementsRecursive(array: IViewDescrElement[], condition: any): IViewDescrElement[] {
  const elements = array.map((a) => [
    ...(condition(a) ? [a] : []),
    ...findElementsRecursive(a.elements || [], condition).flat(),
  ]);
  return elements.flat();
}
