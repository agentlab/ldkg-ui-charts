import { variable } from '@rdfjs/data-model';
import { groupBy, shuffle, zip } from 'lodash-es';
import { IDGenerator } from '../utils';
import { colorPalette, colors20 } from '../utils/colors';

function createCollConstr(conditions: any) {
  return {
    '@id': idGenerator.next(),
    '@type': 'aldkg:CollConstr',
    entConstrs: [
      {
        '@id': idGenerator.next(),
        '@type': 'aldkg:EntConstr',
        schema: 'hs:HSObservationShape',
        conditions: {
          '@id': idGenerator.next(),
          '@type': 'aldkg:EntConstrCondition',
          ...conditions,
        },
      },
    ],
    orderBy: [{ expression: variable('parsedAt0'), descending: false }],
  };
}

const idGenerator = IDGenerator('mktp', 7);
const viewElementIdGenerator = IDGenerator('mktp', 7);

function createViewElement(resultsScope: string, options: any) {
  return {
    '@id': viewElementIdGenerator.next(),
    '@type': 'aldkg:ChartLine',
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
  const viewDescrData = products.map((p: any) => {
    const color = palette.next();
    const constraint = createCollConstr({ product: p.product });
    const productViewElements = productProperties.map((prop: any) => {
      const viewElement = createViewElement(constraint['@id'], {
        ...viewElements[prop],
        options: { ...viewElements[prop].options, label: p.name, color },
      });
      return viewElement;
    });
    return [constraint, productViewElements];
  });

  const [constraints, productViewElements] = zip(...viewDescrData);
  const productViewElementsList = productViewElements.flat();
  const elementsByProperty = groupBy(productViewElementsList, 'options.property');
  return [constraints, elementsByProperty];
}
