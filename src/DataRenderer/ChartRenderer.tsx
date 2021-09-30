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
  IViewDescrElement,
  MstContext,
  mstJsonLdIds,
  processViewKindOverride,
  RenderProps,
} from '@agentlab/ldkg-ui-react';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import Chart from './Chart';
import { createComponent } from './mappers/components';
import { buildViewConfig, ElementDataProvider, findElementsRecursive, MappingsProvider, SchemaProvider } from './utils';

export const ChartRenderer = observer<RenderProps>((props): JSX.Element => {
  const { store } = useContext(MstContext);
  const { viewKind, viewDescr, form, enabled } = props;
  console.log('ChartRenderer - view', { viewKind: mstJsonLdIds(viewKind), viewDescr: mstJsonLdIds(viewDescr), props });

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
  const [isDataReady, setIsDataReady] = useState<boolean>(false);

  const resultsScope = viewDescrElement?.resultsScope;
  let lastSynced;
  if (resultsScope) {
    const coll = store.getColl(resultsScope);
    lastSynced = coll?.lastSynced;
  }

  //TODO: It should be refactored to support lazy loading and should pick up data change with a help of observer HOC
  // today data change is lost into the deeper data map functions
  useEffect(() => {
    if (isDataReady) {
      console.log('ChartRenderer - data = OK');
      if (viewDescrElement && viewKindElement) {
        const elementDataProvider: ElementDataProvider = (element) => {
          const resultsScope = element.resultsScope;
          let dataObs = store.getColl(resultsScope);
          dataObs = dataObs.dataJs;
          return dataObs;
        };
        const schemaProvider: SchemaProvider = (constraint) =>
          typeof constraint.schema === 'string' ? store.schemas.get(constraint.schema) : constraint.schema;

        const mappingsProvider: MappingsProvider = (elementType) =>
          (viewKindElement as any).mappings ? (viewKindElement as any).mappings[elementType] : undefined;

        const config = buildViewConfig(
          viewDescrElement,
          viewDescr,
          viewKind,
          elementDataProvider,
          schemaProvider,
          mappingsProvider,
        );
        console.log('setViewConfig', config);
        setViewConfig(config);
      } else {
        console.log('did not setViewConfig', { viewConfig, viewDescrElement, viewKindElement });
      }
    } else {
      console.log('ChartRenderer - data != OK');
    }
  }, [isDataReady, store, viewDescrElement, viewKindElement, lastSynced]);

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
    } else {
      console.log('did not call loadViews', { viewDescrElement, viewKindElement, viewConfig });
    }
  }, [store, viewConfig, viewDescrElement, viewKindElement]);

  const elements = findElementsRecursive(viewDescr.elements, (el: IViewDescrElement) => el.resultsScope !== undefined);
  let isAllNotEmpty = true;
  elements.forEach((e: any) => {
    if (!store.getColl(e.resultsScope) || store.getColl(e.resultsScope)?.data.length <= 0) {
      isAllNotEmpty = false;
      console.log('ChartRenderer - data - empty', e.resultsScope);
    }
  });
  if (isAllNotEmpty) console.log('ChartRenderer - data = OK 1', { isAllNotEmpty, isDataReady });
  if (isAllNotEmpty !== isDataReady) {
    console.log('setIsDataReady', { isAllNotEmpty, isDataReady });
    setIsDataReady(isAllNotEmpty);
  }
  if (!isAllNotEmpty) return <Spin />;

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
