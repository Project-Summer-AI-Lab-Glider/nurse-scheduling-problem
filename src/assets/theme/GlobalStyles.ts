/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    font-family: Roboto;
    margin: 0;
    padding:0;
    color: ${({ theme }) => theme.primaryText} ;
}

*,
*::before,
*::after {
  box-sizing: border-box; // 1
}
html {
  font-family: sans-serif; // 2
  line-height: 1.5; // 3
  -webkit-text-size-adjust: 100%; // 4
  -ms-text-size-adjust: 100%; // 4
  -ms-overflow-style: scrollbar; // 5
  -webkit-tap-highlight-color: rgba($black, 0); // 6
}

body {


  background-color: ${({ theme }) => theme.background};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}
main {
  display: block;
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
}

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}
abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}
a {
  background-color: transparent;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}
img {
  border-style: none;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

button,
input { /* 1 */
  overflow: visible;
}

summary {
  display: list-item;
  cursor: pointer;
}
template {
  display: none;
}
[hidden] {
  display: none !important;
}
 `;
