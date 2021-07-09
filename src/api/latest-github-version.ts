/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import axios from "axios";

const latestReleaseURL =
  "https://api.github.com/repos/Project-Summer-AI-Lab-Glider/nurse-scheduling-problem-frontend/releases/latest";

export const latestAppVersion =
  process.env.REACT_APP_TEST_MODE === "true"
    ? Promise.resolve("Test mode is enabled")
    : axios.get(latestReleaseURL).then((res) => res.data.name.substring(1));
