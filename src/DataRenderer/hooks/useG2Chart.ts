/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { useCallback, useState } from 'react';

export default function useG2Chart() {
  const [chart, setChart] = useState<any>(null);

  const callbackRef = useCallback((plt: any) => {
    if (plt) {
      const chrt = plt.getChart();
      setChart(chrt);
    }
  }, []);

  return [chart, callbackRef];
}
