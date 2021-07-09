/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as React from "react";

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={19}
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.677 4.248C6.102 2.822 7.82 2.11 9.833 2.11c2.011 0 3.72.713 5.127 2.139 1.426 1.406 2.138 3.115 2.138 5.127 0 2.012-.712 3.73-2.138 5.156-1.407 1.406-3.116 2.11-5.127 2.11-2.012 0-3.73-.703-5.156-2.11-1.407-1.426-2.11-3.144-2.11-5.156 0-2.012.703-3.72 2.11-5.127zM16.16 9.375c0-1.758-.625-3.252-1.875-4.482-1.23-1.23-2.715-1.846-4.453-1.846-1.758 0-3.252.625-4.483 1.875-1.23 1.23-1.845 2.715-1.845 4.453 0 1.758.615 3.252 1.845 4.482 1.25 1.23 2.745 1.846 4.483 1.846 1.758 0 3.252-.615 4.482-1.846 1.23-1.25 1.846-2.744 1.846-4.482zm-4.365 2.578l-2.373-1.728a.288.288 0 01-.147-.264V5.273c0-.234.117-.351.352-.351h.41c.234 0 .351.117.351.351v4.278l2.08 1.523c.176.137.196.293.06.469l-.235.352c-.137.175-.303.195-.498.058z"
        fill="#333"
      />
    </svg>
  );
}

export default ClockIcon;
