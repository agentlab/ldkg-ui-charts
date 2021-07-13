/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { MstContext } from '@agentlab/ldkg-ui-react';
import { View } from '@agentlab/ldkg-ui-react/es/models/uischema';
import { ICollConstr, IEntConstr } from '@agentlab/sparql-jsld-client';
import { Spin } from 'antd';
import { cloneDeep, merge, pickBy } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import React, { useContext, useEffect, useState } from 'react';
import { createComponent } from './mappers/components';
import ViewPartMapper, { createEmptyViewPart, createMeta, viewPartReducer } from './mappers/views';

export const ChartRenderer = observer<any>(({ viewDescrObs, viewKindObs }: any): JSX.Element => {
  const { store } = useContext(MstContext);
  const [views, setViews] = useState<any>([]);
  const [viewDescr, setViewDescr] = useState<any | undefined>();
  const [viewKind, setViewKind] = useState<any | undefined>();
  const [viewConfig, setViewConfig] = useState<any | undefined>();
  //TODO: How to detect viewDescr modifications?
  if (!viewDescr) setViewDescr(getSnapshot(viewDescrObs));
  if (!viewKind) setViewKind(getSnapshot(viewKindObs));
  if (!viewConfig && viewDescr && viewKind) {
    const elemWithMetas = viewDescr.elements
      .map((viewElem: View) => pickBy(viewElem, (v: PropertyKey) => v !== undefined))
      .map((viewElem: View) => {
        const elemCollConstr: ICollConstr = viewDescr.collsConstrs.find(
          (constraint: ICollConstr) => constraint['@id'] === viewElem.resultsScope,
        );
        const viewElemMeta = elemCollConstr.entConstrs
          .map((e: IEntConstr) => createMeta(e, store.schemas.get(e.schema)))
          .reduce(merge, {});
        return { ...viewElemMeta, ...viewElem };
      });
    // Wait for all ViewDescr.collConstrs data to load
    //TODO: How to render the data, available for elemWithMetas, and detect lazy-loaded data
    // for the rest elemWithMetas and render it later
    // every() here and not filter() cause we did not fugure it out
    if (elemWithMetas.every((e: any) => store.getColl(e.resultsScope)?.data.length > 0)) {
      const { mappings = {}, dataMappings = [] } = viewKind;
      const viewPartMapper = ViewPartMapper(mappings, dataMappings);
      const viewConfig2 = elemWithMetas
        .map((elemWithMeta: any) => {
          const dataObs = store.getColl(elemWithMeta.resultsScope);
          // TODO: fix sotring in sparql client and remove sorting below
          const viewElementData: any = (cloneDeep(getSnapshot(dataObs.data)) as any[]).sort(
            (a: any, b: any) => new Date(a.resultTime).valueOf() - new Date(b.resultTime).valueOf(),
          );
          const chartViewPart = viewPartMapper.createChartViewPart(elemWithMeta, viewElementData);
          return chartViewPart;
        })
        .reduce(viewPartReducer, createEmptyViewPart());
      setViewConfig(viewConfig2);
    }
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
      setViews([{ View: dataViewComponent, key: viewDescr['@id'], config: chartConfig }]);
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
        return <View key={key} {...config} />;
      })}
    </React.Suspense>
  );
});

interface ViewData {
  viewDescrCollId: string;
  viewDescrId: string;
  viewKindCollId: string;
}

export const RemoteDataRenderer = observer<any>(
  ({ viewDescrCollId, viewDescrId, viewKindCollId }: ViewData): JSX.Element => {
    const { store } = useContext(MstContext);
    // ViewDescr
    const collWithViewDescrsObs = store.getColl(viewDescrCollId);
    if (!collWithViewDescrsObs) {
      return <Spin />;
    } else {
      const viewDescrObs = collWithViewDescrsObs.dataByIri(viewDescrId);
      if (!viewDescrObs) {
        console.log('undef viewDescrObs with id', viewDescrId);
        return <Spin />;
      } else {
        // ViewKind
        const viewKindId = viewDescrObs.viewKind;
        const collWithViewKindsObs = store.getColl(viewKindCollId);
        if (!collWithViewKindsObs) {
          console.log('undef collWithViewKindsObs with id', viewKindCollId);
          return <Spin />;
        } else {
          const viewKindObs = collWithViewKindsObs.dataByIri(viewKindId);
          if (!viewKindObs) {
            console.log('undef viewKindObs with id', viewKindId);
            return <Spin />;
          } else {
            return <ChartRenderer viewDescrObs={viewDescrObs} viewKindObs={viewKindObs} />;
          }
        }
      }
    }
  },
);
