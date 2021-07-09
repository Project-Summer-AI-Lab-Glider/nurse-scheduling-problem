/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { DividerProps } from "@material-ui/core";
import React, { Ref } from "react";

type PopperArguments = { isOpen: boolean } & PopperOptions;
export type PopperOptions = Omit<DividerProps, "ref">;

// https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components
export const Popper = React.forwardRef(
  (
    { isOpen, children, ...popperOptions }: PopperArguments,
    ref: Ref<HTMLDivElement>
  ): JSX.Element => <div ref={ref}>{isOpen && <div {...popperOptions}>{children}</div>}</div>
);
