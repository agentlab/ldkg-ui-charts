import ObservationShapeMetaMapper from './ObservationShapeMetaMapper';

export default class ShapeFactoryMapper {
  factories: any = {};

  constructor() {
    const observationShapeFactory = new ObservationShapeMetaMapper();
    this.factories[observationShapeFactory.shape] = observationShapeFactory;
  }

  mapToMeta(constraint: { schema: string }): any {
    const constraintFacrory = this.factory(constraint.schema);
    return constraintFacrory?.map(constraint);
  }

  private factory(type: string): any {
    return type && this.factories[type];
  }
}
