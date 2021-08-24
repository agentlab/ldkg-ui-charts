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
import { useEffect } from 'react';

export default (plot: any, onShow?: (e: G2.Event) => void, onHide?: (e: G2.Event) => void): void => {
  useEffect(() => {
    onHide && plot?.on('tooltip:hide', onHide);
    onShow && plot?.on('tooltip:change', onShow);
    return () => {
      onHide && plot?.off('tooltip:hide', onHide);
      onShow && plot?.off('tooltip:change', onShow);
    };
  }, [onHide, onShow, plot]);
};
