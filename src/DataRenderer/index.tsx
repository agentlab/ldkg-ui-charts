import React, { useEffect, useState } from 'react';
import { createGeometryForViewElement, geometriesReducer } from './mappers/geometries';
import ShapeFactoryMapper from './mappers/shapes';
import { viewMapper } from './mappers/views';

const shapeFactoryMapper = new ShapeFactoryMapper();

const DataRenderer = ({ viewKinds, viewDescriptions, data }: any) => {
  const [views, setViews] = useState<any>([]);

  useEffect(() => {
    async function loadViews() {
      // map viewDescription constraints to G2 views and geometries
      const mappedViews = viewDescriptions.map(async (view: any) => {
        const viewKind = viewKinds.find((vk: any) => vk['@id'] === view.viewKind);
        const { mappings = [] } = viewKind;

        const elementsWithMeta = view.elements.map((element: any) => {
          const elementCollectionConstraint = view.collsConstrs.find(
            (constraint: { [x: string]: any }) => constraint['@id'] === element.resultsScope,
          );

          const viewElementMeta = elementCollectionConstraint?.entConstrs
            .map((e: any) => shapeFactoryMapper.mapToMeta(e))
            .reduce((acc: any, item: any) => ({ ...acc, ...item }), {});
          const result = { ...viewElementMeta, ...element };
          return result;
        });

        const viewData: any[] = [];
        const geometries = elementsWithMeta
          .map((elementWithMeta: any) => {
            const { viewElementGeometry, dataMappings } = createGeometryForViewElement(elementWithMeta, mappings);
            const viewElementData = data[elementWithMeta.resultsScope]?.dataIntrnl ?? [];
            dataMappings.forEach((func: any) => {
              viewElementData.forEach(func);
            });
            viewData.push(...viewElementData);
            return viewElementGeometry;
          })
          .reduce(geometriesReducer, []);

        // TODO: Fix for multiple views
        const viewConfig = {
          title: view.title,
          description: view.description,
          views: [
            {
              padding: 'auto',
              meta: {
                resultTime: {
                  alias: 'Date',
                  type: 'timeCat',
                  mask: 'DD-MM-YYYY',
                  sync: true,
                },
              },
              interactions: [{ type: 'active-region' }],
              axes: {},
              data: viewData,
              geometries,
            },
          ],
        };

        const importedView = await viewMapper(viewKind);
        return { View: importedView, config: viewConfig };
      });
      Promise.all(mappedViews).then(setViews);
    }

    loadViews();
  }, [viewDescriptions, data, viewKinds]);

  return (
    <React.Suspense fallback='Loading views...'>
      {views.map((item: { View: any; config: any }) => {
        const { View, config } = item;
        return <View key='sand' config={config} />;
      })}
    </React.Suspense>
  );
};

export default DataRenderer;
