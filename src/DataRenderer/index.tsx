/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import {
  compareByIri,
  IViewDescrElement,
  MstContext,
  mstJsonLdIds,
  processViewKindOverride,
  RankedTester,
  rankWith,
  RenderProps,
  uiTypeIs,
} from '@agentlab/ldkg-ui-react';
import { Spin } from 'antd';
import { cloneDeep, merge } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { getSnapshot, isStateTreeNode } from 'mobx-state-tree';
import React, { useContext, useEffect, useState } from 'react';
import Chart from './Chart';
import { createComponent } from './mappers/components';
import ViewPartMapper, { createEmptyViewPart, createMeta, viewPartReducer } from './mappers/views';

export const ChartRenderer = observer<RenderProps>((props): JSX.Element => {
  const { store } = useContext(MstContext);
  const { viewKind, viewDescr, form, enabled } = props;
  console.log('ChartRenderer - view', { viewKind: mstJsonLdIds(viewKind), viewDescr: mstJsonLdIds(viewDescr) });

  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );
  console.log('ChartRenderer - viewElement', {
    viewKindElement: mstJsonLdIds(viewKindElement),
    viewDescrElement: mstJsonLdIds(viewDescrElement),
  });
  const [views, setViews] = useState<any>([]);
  const [viewConfig, setViewConfig] = useState<any | undefined>();

  function buildView(element: any) {
    if (isStateTreeNode(element)) element = getSnapshot(element);
    console.log('buildView', element);

    //TODO: we should dispatch on ViewKindElement's @type and map it to the proper .type in g6 plot config
    // it will be great to localize all ViewKindElement to Control mapping metadata together into one place
    element = cloneDeep(element);
    if (element['@type'] === 'aldkg:Chart') element.type = 'chart';
    else if (element['@type'] === 'aldkg:TimeSeriesPlot') element.type = 'timeSeries';
    else if (element['@type'] === 'aldkg:TimeSeries') element.type = 'timeSeries';
    else if (element['@type'] === 'aldkg:ChartLine') element.type = 'line';
    else if (element['@type'] === 'aldkg:BoxPlotChart') element.type = 'BoxPlotChart';
    else if (element['@type'] === 'aldkg:BoxPlotTimeSeries') element.type = 'boxPlotTimeSeries';
    else if (element['@type'] === 'aldkg:BoxPlotSchema') element.type = 'schema';

    const childElementViews = element.elements;
    if (childElementViews) {
      const children: any = childElementViews.map(buildView);
      const elementType = element['@type'];
      const elementMapping = (viewKindElement as any).mappings
        ? (viewKindElement as any).mappings[elementType]
        : undefined;

      if (elementMapping) {
        const viewPartMapper = ViewPartMapper(elementMapping);
        const elementOptions = element.options;
        const childView = children
          .map((elemWithMeta: any) => {
            let dataObs = store.getColl(elemWithMeta.resultsScope);
            dataObs = dataObs.dataJs; // instead of getSnapshot()

            // TODO: fix sotring in sparql client and remove sorting below
            dataObs = cloneDeep(dataObs);
            if (dataObs.length > 0) {
              if (dataObs[0].resultTime) {
                dataObs = (dataObs as any[]).sort(
                  (a: any, b: any) => new Date(a.resultTime).valueOf() - new Date(b.resultTime).valueOf(),
                );
              } else if (dataObs[0].parsedAt) {
                dataObs = (dataObs as any[]).sort(
                  (a: any, b: any) => new Date(a.parsedAt).valueOf() - new Date(b.parsedAt).valueOf(),
                );
              }
            }
            console.log('buildView - childElementViews - data', dataObs);
            const chartViewPart = viewPartMapper.createChartViewPart(elemWithMeta, dataObs);
            return chartViewPart as any;
          })
          .reduce(viewPartReducer, createEmptyViewPart());
        return elementOptions ? { ...elementOptions, ...childView } : childView;
      }
      return { id: element['@id'], views: children };
    } else {
      const elemCollConstr: any = viewDescr.collsConstrs.find((constraint: any) =>
        compareByIri(constraint['@id'], element.resultsScope),
      );
      const viewElemMeta = elemCollConstr.entConstrs
        .map((e: any) => {
          let schema: any = e.schema;
          if (typeof schema === 'string') schema = store.schemas.get(schema);
          return createMeta(e, schema);
        })
        .reduce(merge, {});
      return { id: element['@id'], ...viewElemMeta, ...element };
    }
  }

  //TODO: It should be refactored to support lazy loading and should pick up data change with a help of observer HOC
  // today data change is lost into the deeper data map functions
  const elements = findElementsRecursive(viewDescr.elements, (el: IViewDescrElement) => el.resultsScope !== undefined);
  let isAllNotEmpty = true;
  elements.forEach((e: any) => {
    if (!store.getColl(e.resultsScope) || store.getColl(e.resultsScope)?.data.length <= 0) {
      isAllNotEmpty = false;
      console.log('ChartRenderer - data - empty', e.resultsScope);
    }
  });
  if (isAllNotEmpty) {
    console.log('ChartRenderer - data = OK');
    if (!viewConfig && viewDescrElement && viewKindElement) {
      const viewsConfig = viewDescrElement?.elements?.map((el: any) => {
        const view = buildView(el);
        return view.views ? view : { id: el['@id'], views: [view] };
      });
      setViewConfig(viewsConfig?.length === 1 ? viewsConfig[0] : viewsConfig);
    }
  } else {
    console.log('ChartRenderer - data != OK');
  }

  // Data & Mapping
  useEffect(() => {
    async function loadViews(viewDescrElement: IViewDescrElement) {
      const chartConfig = {
        title: viewDescrElement?.title,
        description: viewDescrElement?.description,
        options: viewDescrElement?.options,
        views: [viewConfig],
      };
      const dataViewComponent = await createComponent(viewKindElement['@type']);
      const memoizedDataViewComponent = React.memo(dataViewComponent);
      console.log('call setViews');
      setViews([{ View: memoizedDataViewComponent, key: viewDescrElement['@id'], config: chartConfig }]);
    }
    if (viewDescrElement && viewKindElement && viewConfig) {
      console.log('call loadViews');
      loadViews(viewDescrElement);
    }
  }, [store, viewConfig, viewDescrElement, viewKindElement]);
  return (
    <React.Suspense fallback={<Spin />}>
      {views.map((item: { View: any; key: any; config: any }) => {
        const { View, key, config } = item;
        const { options, views } = config;
        return (
          <Chart key={key} {...config}>
            <View options={options} config={views[0]} />
          </Chart>
        );
      })}
    </React.Suspense>
  );
});

function findElementsRecursive(array: IViewDescrElement[], condition: any): IViewDescrElement[] {
  const elements = array.map((a) => [
    ...(condition(a) ? [a] : []),
    ...findElementsRecursive(a.elements || [], condition).flat(),
  ]);
  return elements.flat();
}

export const timeseriesChartRendererTester1: RankedTester = rankWith(2, uiTypeIs('aldkg:TimeSeriesChart'));
export const boxplotChartRendererTester2: RankedTester = rankWith(2, uiTypeIs('aldkg:BoxPlotChart'));

export const chartsRenderers = [
  { tester: timeseriesChartRendererTester1, renderer: ChartRenderer },
  { tester: boxplotChartRendererTester2, renderer: ChartRenderer },
];
