/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { groupBy, map, mapValues } from 'lodash-es';

// https://github.com/lodash/lodash/issues/3298
const chainableFunctions = {
  map,
  mapValues,
  groupBy,
};

export default function chain<T>(input: T) {
  let value: any = input;
  const wrapper = {
    ...mapValues(chainableFunctions, (f: any) => (...args: any[]) => {
      value = f(value, ...args);
      return wrapper;
    }),
    value: () => value,
  };
  return wrapper;
}
