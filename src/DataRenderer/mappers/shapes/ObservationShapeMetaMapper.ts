/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
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
