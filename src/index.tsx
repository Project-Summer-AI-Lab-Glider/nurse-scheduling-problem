/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as Sentry from "@sentry/react";
import { ReportingObserver } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import { appReducer } from "./state/app.reducer";
import { AppConfigProvider } from "./state/app-config-context";
import * as serviceWorker from "./serviceWorker";
import App from "./app";
import { AppErrorBoundary } from "./components/app-error-boundary/app-error-boundary.component";

const history = createBrowserHistory();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  normalizeDepth: 10,
  integrations: [
    new ReportingObserver(),
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
    }),
  ],
  tracesSampleRate: 1.0,
});

const sentryReduxEnhancer = Sentry.createReduxEnhancer();

const composedEnhancer = composeWithDevTools(
  compose(applyMiddleware(thunkMiddleware), sentryReduxEnhancer)
);
export const appStore = createStore(appReducer, composedEnhancer);

ReactDOM.render(
  <AppErrorBoundary>
    <DndProvider backend={HTML5Backend}>
      <Router history={history}>
        <React.StrictMode>
          <Provider store={appStore}>
            <AppConfigProvider>
              <App />
            </AppConfigProvider>
          </Provider>
        </React.StrictMode>
      </Router>
    </DndProvider>
  </AppErrorBoundary>,
  document.getElementById("root")
);
/* eslint-disable @typescript-eslint/no-explicit-any */
if ((window as any).Cypress) {
  (window as any).store = appStore;
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
