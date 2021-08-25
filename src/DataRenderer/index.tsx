/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { MstContext, ViewElement } from '@agentlab/ldkg-ui-react';
import { ICollConstr, IEntConstr } from '@agentlab/sparql-jsld-client';
import { Spin } from 'antd';
import { cloneDeep, merge } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import React, { useContext, useEffect, useState } from 'react';
import Chart from './Chart';
import { createComponent } from './mappers/components';
import ViewPartMapper from './mappers/views';
import { createEmptyViewPart, createMeta, viewPartReducer } from './mappers/views/utils';

export const ChartRenderer = ({ viewDescr, viewKind, store }: any): JSX.Element => {
  const [views, setViews] = useState<any>([]);
  const [viewConfig, setViewConfig] = useState<any | undefined>();

  function buildView(element: ViewElement) {
    const childElementViews = element.elements;
    if (childElementViews) {
      const children: any = childElementViews.map(buildView);
      const elementType = element['@type'];
      const elementMapping = viewKind.mappings[elementType];
      if (elementMapping) {
        const viewPartMapper = ViewPartMapper(elementMapping);
        const elementOptions = element.options;
        const childView = children
          .map((elemWithMeta: any) => {
            const dataObs = store.getColl(elemWithMeta.resultsScope);
            // TODO: fix sotring in sparql client and remove sorting below
            const viewElementData: any = (cloneDeep(getSnapshot(dataObs.data)) as any[]).sort(
              (a: any, b: any) => new Date(a.resultTime).valueOf() - new Date(b.resultTime).valueOf(),
            );
            const chartViewPart = viewPartMapper.createChartViewPart(elemWithMeta, viewElementData);
            return chartViewPart as any;
          })
          .reduce(viewPartReducer, createEmptyViewPart());
        return elementOptions ? { ...elementOptions, ...childView } : childView;
      }
      return { id: element['@id'], views: children };
    } else {
      const elemCollConstr: ICollConstr = viewDescr.collsConstrs.find(
        (constraint: ICollConstr) => constraint['@id'] === element.resultsScope,
      );
      const viewElemMeta = elemCollConstr.entConstrs
        .map((e: IEntConstr) => createMeta(e, store.schemas.get(e.schema)))
        .reduce(merge, {});
      return { id: element['@id'], ...viewElemMeta, ...element };
    }
  }

  if (!viewConfig && viewDescr && viewKind) {
    const viewsConfig = viewDescr.elements.map((el: any) => {
      const view = buildView(el);
      return view.views ? view : { id: el['@id'], views: [view] };
    });
    setViewConfig(viewsConfig.length === 1 ? viewsConfig[0] : viewsConfig);
  }
  // Data & Mapping
  useEffect(() => {
    async function loadViews() {
      const chartConfig = {
        title: viewDescr.title,
        description: viewDescr.description,
        options: viewDescr.options,
        views: [viewConfig],
      };
      const dataViewComponent = await createComponent(viewKind.type);
      const memoizedDataViewComponent = React.memo(dataViewComponent);
      setViews([{ View: memoizedDataViewComponent, key: viewDescr['@id'], config: chartConfig }]);
    }
    if (viewDescr && viewKind && viewConfig) {
      console.log('call loadViews');
      loadViews();
    }
  }, [store, viewConfig, viewDescr, viewKind]);
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
};

interface ViewData {
  viewDescrCollId: string;
  viewDescrId: string;
  viewKindCollId: string;
}

function findElementsRecursive(array: ViewElement[], condition: any): ViewElement[] {
  const elements = array.map((a) => [
    ...(condition(a) ? [a] : []),
    ...findElementsRecursive(a.elements || [], condition).flat(),
  ]);
  return elements.flat();
}

export const RemoteDataRenderer = observer<any>(
  ({ viewDescrCollId, viewDescrId, viewKindCollId }: ViewData): JSX.Element => {
    const { store } = useContext(MstContext);
    // ViewDescr
    const collWithViewDescrsObs = store.getColl(viewDescrCollId);
    if (collWithViewDescrsObs) {
      const viewDescrObs = collWithViewDescrsObs.dataByIri(viewDescrId);
      if (viewDescrObs) {
        // ViewKind
        const collWithViewKindsObs = store.getColl(viewKindCollId);
        if (collWithViewKindsObs) {
          const viewKindId = viewDescrObs.viewKind;
          const viewKindObs = collWithViewKindsObs.dataByIri(viewKindId);
          if (viewKindObs) {
            const viewDescr = getSnapshot(viewDescrObs) as any;
            const elements = findElementsRecursive(
              viewDescr.elements,
              (el: ViewElement) => el.resultsScope !== undefined,
            );

            if (elements.every((e: any) => store.getColl(e.resultsScope)?.data.length > 0)) {
              const viewKind = getSnapshot(viewKindObs);
              return <ChartRenderer viewDescr={viewDescr} viewKind={viewKind} store={store} />;
            }
          }
        }
      }
    }
    return <Spin />;
  },
);
