/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
