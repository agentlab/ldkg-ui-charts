/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
import { MstContext, mstJsonLdIds, processViewKindOverride, RenderProps } from '@agentlab/ldkg-ui-react';
import { Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Chart from './Chart';
import { createComponent } from './mappers/components';
import { buildViewConfig, ElementDataProvider, MappingsProvider, SchemaProvider } from './utils';

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

  const dataViewComponent = createComponent(viewKindElement['@type']);
  const View = React.memo(dataViewComponent);
  const key = viewDescrElement['@id'];
  const options = {
    ...viewDescrElement?.options,
    title: viewDescrElement?.title,
    description: viewDescrElement?.description,
  };

  return (
    <React.Suspense fallback={<Spin />}>
      <Chart key={key} options={options}>
        <View options={options} config={config} />
      </Chart>
    </React.Suspense>
  );
});
