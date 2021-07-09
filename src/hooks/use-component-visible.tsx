/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useState, useEffect, useRef, RefObject } from "react";

interface ComponentVisibleInterface {
  componentContainer: RefObject<HTMLElement>;
  isComponentVisible: boolean;
  setIsComponentVisible: (prevState: boolean) => void;
}

export default function useComponentVisible(initialIsVisible: boolean): ComponentVisibleInterface {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const componentContainer = useRef(null);

  useEffect((): { (): void } => {
    const handleClickOutside = (event): void => {
      if (componentContainer.current && !componentContainer.current!.contains(event.target)) {
        setIsComponentVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return (): void => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { componentContainer, isComponentVisible, setIsComponentVisible };
}
