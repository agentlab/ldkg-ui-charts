import { variable } from '@rdfjs/data-model';
import { shuffle, zip } from 'lodash-es';
import { IDGenerator } from '../utils';
import { colorPalette, colors20 } from '../utils/colors';

function createCollConstr(conditions: any) {
  return {
    '@id': idGenerator.next(),
    '@type': 'rm:CollConstr',
    entConstrs: [
      {
        '@id': idGenerator.next(),
        '@type': 'rm:EntConstr',
        schema: 'sosa:ObservationShape',
        conditions: {
          '@id': idGenerator.next(),
          '@type': 'rm:EntConstrCondition',
          ...conditions,
        },
      },
    ],
    orderBy: [{ expression: variable('resultTime0'), descending: false }],
  };
}

const idGenerator = IDGenerator('mktp', 7);
const viewElementIdGenerator = IDGenerator('rm', 7);

function createViewElement(resultsScope: string, options: any) {
  return {
    '@id': viewElementIdGenerator.next(),
    '@type': 'rm:Element',
    type: 'line',
    resultsScope,
    ...options,
  };
}

export const fromProducts = (products: any[], productProperties: string[]) => ({
  withElements: (viewElements: any) =>
    ({
      withColors(colors: string[]) {
        this.colors = colors;
        return this;
      },
      limit(count: number) {
        this.size = count;
        return this;
      },
      shuffle() {
        this.needsToBeShuffled = true;
        return this;
      },
      build() {
        const palette = colorPalette(this.colors || colors20);
        const productList = this.needsToBeShuffled ? shuffle(products) : products;
        if (this.size) {
          productList.length = this.size;
        }
        return createViewDescr(productList, productProperties, viewElements, palette);
      },
    } as any),
});

function createViewDescr(products: any[], productProperties: string[], viewElements: any, palette: any) {
  const viewDescrData = products
    .map((p: any) => {
      const color = palette.next();
      return productProperties.map((prop: any) => {
        const constraint = createCollConstr({ hasFeatureOfInterest: p.featureOfInterest, observedProperty: prop });
        const viewElement = createViewElement(constraint['@id'], {
          ...viewElements[prop],
          options: { ...viewElements[prop].options, label: p.name, color },
        });
        return [constraint, viewElement];
      });
    })
    .flat();
  return zip(...viewDescrData);
}
