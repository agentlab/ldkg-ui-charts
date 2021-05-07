import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ViewPartMapper, { initialViewPart, viewPartReducer } from './mappers/views';
import ShapeFactoryMapper from './mappers/shapes';
import { createComponent } from './mappers/components';

const shapeFactoryMapper = new ShapeFactoryMapper();

const DataRenderer = ({ viewKinds, viewDescriptions, data }: any): JSX.Element => {
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
              .map((e: any) => shapeFactoryMapper.mapToMeta(e))
              .reduce((acc: any, item: any) => ({ ...acc, ...item }), {});

            return { ...viewElementMeta, ...viewElement };
          })
          .map((elementWithMeta: any) => {
            const viewElementData = data[elementWithMeta.resultsScope]?.dataIntrnl ?? [];
            const chartViewPart = viewPartMapper.createChartViewPart(elementWithMeta, viewElementData);
            return chartViewPart;
          })
          .reduce(viewPartReducer, initialViewPart);

        const chartConfig = {
          title: viewDescription.title,
          description: viewDescription.description,
          options: viewDescription.options,
          views: [
            {
              ...viewConfig,
            },
          ],
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
        return <View key={key} config={config} />;
      })}
    </React.Suspense>
  );
};

export default DataRenderer;
