/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/

import { G2 } from '@ant-design/charts';
import { useEffect, useState } from 'react';

export default function useTooltipData(plot: any): G2.Types.Datum | undefined {
  const [tooltipData, setTooltipData] = useState<G2.Types.Datum | undefined>();

  useEffect(() => {
    const onTooltipChange = (e: G2.Event) => setTooltipData(e.data);
    plot?.on('tooltip:change', onTooltipChange);
    return () => {
      plot?.off('tooltip:change', onTooltipChange);
    };
  }, [plot]);

  return tooltipData;
}
