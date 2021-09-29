import { MstContext, mstJsonLdIds, processViewKindOverride, RenderCellProps } from '@agentlab/ldkg-ui-react';
import { Spin } from 'antd';
import { get } from 'lodash-es';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Chart from './Chart';
import { createComponent } from './mappers/components';
import { buildViewConfig, ElementDataProvider, MappingsProvider, SchemaProvider } from './utils';

export const ChartCellRenderer = observer<RenderCellProps>((props): JSX.Element => {
  const { store } = useContext(MstContext);
  const { viewKind, viewDescr, data, rowData } = props;
  const [id, collIri, collIriOverride, inCollPath, viewKindElement, viewDescrElement] = processViewKindOverride(
    props,
    store,
  );
  console.log('ChartRenderer - viewElement', {
    viewKindElement: mstJsonLdIds(viewKindElement),
    viewDescrElement: mstJsonLdIds(viewDescrElement),
    data,
    rowData,
    props,
  });
  const elementDataProvider: ElementDataProvider = () => {
    const path = viewKindElement.scope ? viewKindElement.scope.split('/').join('.') : null;
    return path ? get(data, path) : data;
  };
  const schemaProvider: SchemaProvider = (constraint) =>
    typeof constraint.schema === 'string' ? store.schemas.get(constraint.schema) : constraint.schema;

  const mappingsProvider: MappingsProvider = (elementType) =>
    (viewKindElement as any).mappings ? (viewKindElement as any).mappings[elementType] : undefined;

  const config = buildViewConfig(
    viewKindElement,
    viewDescr,
    viewKind,
    elementDataProvider,
    schemaProvider,
    mappingsProvider,
  );
  const chartConfig = {
    title: viewKindElement?.title,
    description: viewKindElement?.description,
    options: viewKindElement?.options,
    config,
  };
  const dataViewComponent = createComponent(viewKindElement['@type']);
  const Component = React.memo(dataViewComponent);

  return (
    <React.Suspense fallback={<Spin />}>
      <Chart {...chartConfig}>
        <Component options={chartConfig.options} config={chartConfig.config} />
      </Chart>
    </React.Suspense>
  );
});
