/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from "react";

// TextStyles from FIGMA

// ? Roboto

const RobotoNormal: React.CSSProperties = {
  fontFamily: "Roboto",
  fontStyle: "normal",
};

const robotoLight12px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: 300,
  fontSize: "12px",
  lineHeight: "14px",
};
const robotoBlack12px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: 900,
  fontSize: "12px",
  lineHeight: "14px",
};
const robotoBlack16px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: 900,
  fontSize: "16px",
  lineHeight: "19px",
};
const robotoRegular12px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "14px",
};

const robotoRegular14px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: "normal",
  fontSize: "14px",
  lineHeight: "16px",
};
const robotoRegular16px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "19px",
};
const robotoButton12px: React.CSSProperties = {
  ...RobotoNormal,
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "14px",
};

const FontStyles = {
  roboto: {
    Light12px: robotoLight12px,
    Black12px: robotoBlack12px,
    Black16px: robotoBlack16px,
    Regular12px: robotoRegular12px,
    Regular14px: robotoRegular14px,
    Regular16px: robotoRegular16px,
    Button12px: robotoButton12px,
  },
};

export default FontStyles;
