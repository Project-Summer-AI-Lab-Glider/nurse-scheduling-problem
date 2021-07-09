/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* eslint-disable @typescript-eslint/no-var-requires */
 const waitOn = require("wait-on");
const env = require("dotenv").config().parsed;

const opts = {
  resources: [`http://localhost:${env.PORT}`],
};
waitOn(opts, (err) => {
  if (err) {
    return;
  }
  process.exit(0);
});
