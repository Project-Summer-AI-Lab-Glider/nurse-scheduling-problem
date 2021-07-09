/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./mouse-event-listener.styled";

interface MouseEventListenerOptions {
  onClick: (e: React.MouseEvent<unknown>) => void;
  onWheel: (e: React.WheelEvent<unknown>) => void;
}

export function MouseEventListener({ onClick, onWheel }: MouseEventListenerOptions) {
  return <S.FullscreenDiv onClick={onClick} onWheel={onWheel} />;
}
