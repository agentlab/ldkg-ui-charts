/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import React, { useEffect, useState, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { MstContext } from '@agentlab/ldkg-ui-react';

import ViewPartMapper, { createEmptyViewPart, viewPartReducer } from './mappers/views';
import { createComponent } from './mappers/components';
import { observable } from 'mobx';

function mapToMeta(constraint: any): any {
  const { observedProperty, hasFeatureOfInterest } = constraint.conditions;
  const meta = {
    resultTime: { type: 'timeCat' },
    observedProperty: {},
  };
  return { observedProperty, hasFeatureOfInterest, meta };
}

export const DataRenderer = ({ viewKinds, viewDescriptions, data }: any): JSX.Element => {
  const [views, setViews] = useState<any>([]);

  useEffect(() => {
    async function loadViews() {
      // map viewDescription constraints to G2 views and geometries
      const mappedViews = viewDescriptions.map(async (viewDescription: any) => {
        const viewKind = viewKinds.find((vk: any) => vk['@id'] === viewDescription.viewKind);
        const { mappings = [] } = viewKind;
        const viewPartMapper = ViewPartMapper(mappings);
        const viewConfig = viewDescription.elements
          .map((viewElement: any) => {
            const elementCollectionConstraint = viewDescription.collsConstrs.find(
              (constraint: { [x: string]: any }) => constraint['@id'] === viewElement.resultsScope,
            );
            const viewElementMeta = elementCollectionConstraint?.entConstrs
              .map((e: any) => mapToMeta(e))
              .reduce((acc: any, item: any) => ({ ...acc, ...item }), {});

            return { ...viewElementMeta, ...viewElement };
          })
          .map((elementWithMeta: any) => {
            const viewElementData = data[elementWithMeta.resultsScope]?.dataIntrnl ?? [];
            const chartViewPart = viewPartMapper.createChartViewPart(elementWithMeta, viewElementData);
            return chartViewPart;
          })
          .reduce(viewPartReducer, createEmptyViewPart());
        const chartConfig = {
          title: viewDescription.title,
          description: viewDescription.description,
          options: viewDescription.options,
          views: [viewConfig],
        };
        const dataViewComponent = await createComponent(viewKind.type);
        return { View: dataViewComponent, key: viewDescription['@id'], config: chartConfig };
      });
      Promise.all(mappedViews).then(setViews);
    }
    loadViews();
  }, [viewDescriptions, data, viewKinds]);

  return (
    <React.Suspense fallback={<Spin />}>
      {views.map((item: { View: any; key: any; config: any }) => {
        const { View, key, config } = item;
        return <View key={key} {...config} />;
      })}
    </React.Suspense>
  );
};

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
    const { mappings = [] } = viewKind;
    const viewPartMapper = ViewPartMapper(mappings);
    const elemWithMetas = viewDescr.elements.map((viewElem: any) => {
      const elemCollConstr = viewDescr.collsConstrs.find(
        (constraint: { [x: string]: any }) => constraint['@id'] === viewElem.resultsScope,
      );
      const viewElemMeta = elemCollConstr?.entConstrs
        .map((e: any) => mapToMeta(e))
        .reduce((acc: any, item: any) => ({ ...acc, ...item }), {});
      const viewElemClear: any = {}; // filter all fields with 'undefined'
      Object.keys(viewElem).forEach((key) => {
        const val = viewElem[key];
        if (val !== undefined) viewElemClear[key] = val;
      });
      return { ...viewElemMeta, ...viewElemClear };
    });
    // Wait for all ViewDescr.collConstrs data to load
    //TODO: How to render the data, available for elemWithMetas, and detect lazy-loaded data
    // for the rest elemWithMetas and render it later
    // every() here and not filter() cause we did not fugure it out
    if (elemWithMetas.every((e: any) => store.getColl(e.resultsScope)?.data.length > 0)) {
      const viewConfig2 = elemWithMetas
        .map((elemWithMeta: any) => {
          const dataObs = store.getColl(elemWithMeta.resultsScope);
          // TODO: fix sotring in sparql client and remove sorting below
          let viewElementData: any = (cloneDeep(getSnapshot(dataObs.data)) as any[]).sort(
            (a: any, b: any) => new Date(a.resultTime).valueOf() - new Date(b.resultTime).valueOf(),
          );
          viewElementData = viewElementData.map((obs: any) => {
            let propName = obs.observedProperty.replace('hs:', '#');
            propName = propName[0].toLowerCase() + propName.slice(1);
            obs.observedProperty = obs.hasFeatureOfInterest + propName;
            return obs;
          });
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
