/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as React from "react";

function UndoIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M2.586 2.61h.293c.234 0 .351.117.351.35v3.253a7.116 7.116 0 012.637-2.637A7.18 7.18 0 019.53 2.61c1.309 0 2.52.332 3.633.996A7.116 7.116 0 0115.8 6.242a7.124 7.124 0 01.967 3.633c0 2.012-.713 3.73-2.139 5.156-1.406 1.406-3.115 2.11-5.127 2.11-1.855 0-3.477-.625-4.863-1.875-.196-.157-.205-.323-.03-.498l.205-.206c.157-.156.323-.165.499-.029 1.191 1.074 2.587 1.612 4.189 1.612 1.719 0 3.193-.606 4.424-1.817 1.23-1.23 1.846-2.715 1.846-4.453 0-1.719-.616-3.193-1.846-4.424-1.211-1.23-2.686-1.846-4.424-1.846a6.053 6.053 0 00-3.281.938 6.031 6.031 0 00-2.285 2.46h3.34c.234 0 .351.118.351.352v.293c0 .235-.117.352-.352.352H2.586c-.234 0-.352-.117-.352-.352V2.961c0-.234.118-.352.352-.352z"
        fill="#333"
      />
    </svg>
  );
}

export default UndoIcon;
