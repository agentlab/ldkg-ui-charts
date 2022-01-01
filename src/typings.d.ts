/********************************************************************************
 * Copyright (c) 2021 Agentlab and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU General Public License v. 3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0.html.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 ********************************************************************************/
declare module 'uuid62';
declare module '*.less' {
  const content: any;
  export default content;
}

declare module '*.module.less' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
