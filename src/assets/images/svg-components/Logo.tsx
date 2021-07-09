/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as React from "react";

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={24}
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#632FD0" d="M8 0h8v8H8zM0 8h8v8H0zM8 16h8v8H8z" />
    </svg>
  );
}

export default Logo;
