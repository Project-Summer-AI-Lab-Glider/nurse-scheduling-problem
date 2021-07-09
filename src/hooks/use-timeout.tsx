/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect, useState } from "react";

interface TimeoutReturn {
  isCounting: boolean;
  setIsCounting: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * @description useTimeout hook for handling timeouts
 * @param duration - number in miliseconds
 * @param onTimeout - callback
 * @returns clear
 */
const useTimeout = (duration: number, onTimeout: () => void): TimeoutReturn => {
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const clr = (timeout: NodeJS.Timeout | undefined): void => {
    timeout && clearTimeout(timeout);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      onTimeout();
    }, duration);

    !isCounting && clr(timeout);
    return (): void => {
      clr(timeout);
    };
  }, [onTimeout, duration, isCounting]);
  return { isCounting, setIsCounting };
};
export default useTimeout;
