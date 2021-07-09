/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as React from "react";

function RedoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={19}
      height={20}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.414 2.61c.234 0 .352.117.352.35v4.688c0 .235-.118.352-.352.352h-4.687c-.235 0-.352-.117-.352-.352v-.293c0-.234.117-.351.352-.351h3.34a6.031 6.031 0 00-2.286-2.461A6.052 6.052 0 009.5 3.605c-1.738 0-3.223.616-4.453 1.846C3.836 6.681 3.23 8.156 3.23 9.875c0 1.738.616 3.223 1.846 4.453 1.23 1.211 2.705 1.817 4.424 1.817 1.602 0 2.998-.538 4.19-1.612.175-.136.341-.127.498.03l.205.205c.175.175.166.341-.03.498-1.386 1.25-3.008 1.875-4.863 1.875-2.012 0-3.73-.703-5.156-2.11-1.407-1.426-2.11-3.144-2.11-5.156 0-1.992.704-3.701 2.11-5.127C5.77 3.322 7.479 2.61 9.47 2.61a7.18 7.18 0 013.662.967 7.116 7.116 0 012.637 2.637V2.96c0-.234.117-.352.351-.352h.293z"
        fill="#333"
      />
    </svg>
  );
}

export default RedoIcon;
