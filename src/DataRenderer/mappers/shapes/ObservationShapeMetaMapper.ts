/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
export default class ObservationShapeMetaMapper {
  private static readonly _shape = 'sosa:ObservationShape';

  get shape(): string {
    return ObservationShapeMetaMapper._shape;
  }

  map(constraint: any): any {
    const { observedProperty, hasFeatureOfInterest } = constraint.conditions;
    const meta = {
      resultTime: { type: 'timeCat' },
      observedProperty: {},
    };
    return { observedProperty, hasFeatureOfInterest, meta };
  }
}
