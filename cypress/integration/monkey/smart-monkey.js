/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* source https://github.com/TheSoftwareDesignLab/monkey-cypress */
/* eslint-disable */
require("cypress-plugin-tab");
const fs = require("fs");
const faker = require("faker");

const url = Cypress.config("baseUrl");
const appName = Cypress.env("appName") || "your app";
const events = Cypress.env("events") || 100;
const delay = Cypress.env("delay") || 100;
let seed = Cypress.env("seed");

const num_categories = 7;

const pct_clicks = Cypress.env("pctClicks") || 12;
const pct_scrolls = Cypress.env("pctScroll") || 12;
const pct_selectors = Cypress.env("pctSelectors") || 12;
const pct_keys = Cypress.env("pctKeys") || 12;
const pct_spkeys = Cypress.env("pctSpKeys") || 12;
const pct_pgnav = Cypress.env("pctPgNav") || 12;
const pct_browserChaos = Cypress.env("pctBwChaos") || 12;
const pct_actions = Cypress.env("pctActions") || 16;

const LOG_FILENAME = "../../../results/smart-monkey-execution.html";

/*
 Bob Jenkins Small Fast, aka smallprng pseudo random number generator is the chosen selection for introducing seeding in the tester
 Credits of the implementation to bryc's answer in this stackoverflow post: https://stackoverflow.com/a/47593316 
*/
function jsf32(a, b, c, d) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (a - ((b << 27) | (b >>> 5))) | 0;
    a = b ^ ((c << 17) | (c >>> 15));
    b = (c + d) | 0;
    c = (d + t) | 0;
    d = (a + t) | 0;
    return (d >>> 0) / 4294967296;
  };
}

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

const random = jsf32(0xf1ae533d, seed, seed, seed);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(random() * (max - min)) + min;
}

function fullPath(el) {
  const names = [];
  while (el.parentNode) {
    if (el.id) {
      names.unshift(`#${el.id}`);
      break;
    } else {
      if (el == el.ownerDocument.documentElement) names.unshift(el.tagName);
      else {
        for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
        names.unshift(`${el.tagName}:nth-child(${c})`);
      }
      el = el.parentNode;
    }
  }
  return names.join(" > ");
}

function logCommand(index, funtype, info) {
  let html = `<h2>(${index}.) ${funtype} event</h2>`;
  if (info) html += `<p><strong>Details: </strong> ${info}</p>`;
  fs.appendFile(LOG_FILENAME, html, (err) => {
    if (err) throw err;
    console.log(`Logged #${index}`);
  });
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Start of smart monkey
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const viewportHeight = Cypress.config("viewportHeight");
const viewportWidth = Cypress.config("viewportWidth");
const curX = 0;
const curY = 0;
let curPageMaxX = viewportWidth;
let curPageMaxY = viewportHeight;
let evtIndex = 1;

function randClick() {
  const randX = getRandomInt(curX, viewportWidth);
  const randY = getRandomInt(curY, viewportHeight);

  cy.window().then((win) => {
    let info = "";
    const element = win.document.elementFromPoint(randX, randY);
    if (element) {
      if (element.id) {
        cy.get(`#${element.id}`).click();
        info = `${element.tagName} with id: ${element.id}`;
      } else {
        const jsPath = fullPath(element);
        cy.get(jsPath).then(($candidates) => {
          for (let i = 0; i < $candidates.length; i++) {
            const candidate = $candidates.get(i);
            if (!Cypress.dom.isHidden(candidate)) {
              cy.wrap(candidate).click({ force: true });
              break;
            }
          }
        });
        info = `DOM element with path: ${jsPath}`;
      }
    } else {
      cy.get("body").click(randX, randY, { force: true });
      info = `Position: (${randX}, ${randY}). INVALID, no selectable element`;
    }
    cy.task("logCommand", { funtype: "Random click", info });
  });
}

function randDClick() {
  const randX = getRandomInt(curX, viewportWidth);
  const randY = getRandomInt(curY, viewportHeight);

  cy.window().then((win) => {
    let info = "";
    console.log(win.document);
    const element = win.document.elementFromPoint(randX, randY);
    console.log(element);
    if (element) {
      if (element.id) {
        cy.get(`#${element.id}`).dblclick();
        info = `${element.tagName} with id: ${element.id}`;
      } else {
        const jsPath = fullPath(element);
        cy.get(jsPath).then(($candidates) => {
          for (let i = 0; i < $candidates.length; i++) {
            const candidate = $candidates.get(i);
            if (!Cypress.dom.isHidden(candidate)) {
              cy.wrap(candidate).dblclick({ force: true });
              break;
            }
          }
        });
        info = `DOM element with path: ${jsPath}`;
      }
    } else {
      cy.get("body").dblclick(randX, randY, { force: true });
      info = `Position: (${randX}, ${randY}). INVALID, no selectable element`;
    }
    cy.task("logCommand", { funtype: "Random double click", info });
  });
}

function randRClick() {
  const randX = getRandomInt(curX, viewportWidth);
  const randY = getRandomInt(curY, viewportHeight);

  cy.window().then((win) => {
    let info = "";
    console.log(win.document);
    const element = win.document.elementFromPoint(randX, randY);
    console.log(element);
    if (element) {
      if (element.id) {
        cy.get(`#${element.id}`).rightclick();
        info = `${element.tagName} with id: ${element.id}`;
      } else {
        const jsPath = fullPath(element);
        cy.get(jsPath).then(($candidates) => {
          for (let i = 0; i < $candidates.length; i++) {
            const candidate = $candidates.get(i);
            if (!Cypress.dom.isHidden(candidate)) {
              cy.wrap(candidate).rightclick({ force: true });
              break;
            }
          }
        });
        info = `DOM element with path: ${jsPath}`;
      }
    } else {
      cy.get("body").rightclick(randX, randY, { force: true });
      info = `Position: (${randX}, ${randY}). INVALID, no selectable element`;
    }
    cy.task("logCommand", { funtype: "Random right click", info });
  });
}

function randHover() {
  const randX = getRandomInt(curX, viewportWidth);
  const randY = getRandomInt(curY, viewportHeight);

  cy.window().then((win) => {
    let info = "";
    const element = win.document.elementFromPoint(randX, randY);
    if (element) {
      if (element.hasAttribute("onmouseover")) {
        if (element.id) {
          cy.get(`#${element.id}`).trigger("mouseover");
          info = `${element.tagName} with id: ${element.id}`;
        } else {
          const jsPath = fullPath(element);
          cy.get(fullPath(element)).then(($candidates) => {
            for (let i = 0; i < $candidates.length; i++) {
              const candidate = $candidates.get(i);
              if (!Cypress.dom.isHidden(candidate)) {
                cy.wrap(candidate).trigger("mouseover");
                break;
              }
            }
          });
          info = `DOM element with path: ${jsPath}`;
        }
      } else info = `Position: (${randX}, ${randY}). INVALID, element has no attribute onmouseover`;
    } else info = `Position: (${randX}, ${randY}). INVALID, no selectable element`;
    cy.task("logCommand", { funtype: "Selector focus (hover)", info });
  });
}

function reload() {
  cy.reload();
  cy.task("logCommand", {
    funtype: "Page navigation (Reload)",
    info: "Successfully reloaded the page",
  });
}

function enter() {
  cy.document().then((doc) => {
    if (!!doc.activeElement && doc.activeElement.tagName != "BODY") {
      cy.focused().type("{enter}");
      cy.task("logCommand", {
        funtype: "Special key press (enter)",
        info: "Pressed enter on the element in focus",
      });
    } else {
      cy.get("body").type("{enter}");
      cy.task("logCommand", {
        funtype: "Special key press (enter)",
        info: "INVALID. No element is in focus",
      });
    }
  });
}

function typeCharKey() {
  cy.document().then((doc) => {
    let info = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const type = chars.charAt(getRandomInt(0, chars.length - 1));
    if (!!doc.activeElement && doc.activeElement.tagName != "BODY") {
      cy.focused().type(type);
      info = `Pressed the ${type} key on the element in focus`;
    } else {
      cy.get("body").type(type);
      info = "INVALID. No element is in focus";
    }
    cy.task("logCommand", { funtype: "Key press", info });
  });
}

function spkeypress() {
  const specialKeys = [
    "{{}",
    "{backspace}",
    "{del}",
    "{downarrow}",
    "{end}",
    "{esc}",
    "{home}",
    "{leftarrow}",
    "{pagedown}",
    "{pageup}",
    "{rightarrow}",
    "{selectall}",
    "{uparrow}",
  ];
  const modifiers = ["{alt}", "{ctrl}", "{meta}", "{shift}", ""];
  cy.document().then((doc) => {
    let info = "";
    const modIndex = getRandomInt(0, modifiers.length - 1);
    const spkIndex = getRandomInt(0, specialKeys.length - 1);
    const type = modifiers[modIndex] + specialKeys[spkIndex];
    if (!!doc.activeElement && doc.activeElement.tagName != "BODY") {
      cy.focused().type(type);
      info = `Pressed the ${type} combination of special keys on the element in focus`;
    } else {
      cy.get("body").type(type);
      info = `No element is in focus. Pressed the ${type} combination of special keys on the page body`;
    }
    cy.task("logCommand", { funtype: "Special key press", info });
  });
}

function navBack() {
  cy.url().then((path) => {
    let info = "";
    if (url !== path) {
      cy.go(-1);
      info = "Navigated 1 page back";
    } else info = "INVALID. Navigation stack empty";
    cy.task("logCommand", { funtype: "Page navigation (back)", info });
  });
}

function navForward() {
  cy.go(1);
  cy.task("logCommand", {
    funtype: "Page navigation (forward)",
    info: "Attempted to navigate 1 page forward",
  });
}

function clickRandAnchor() {
  cy.window().then((win) => {
    const $links = win.document.getElementsByTagName("a");
    let info = "";
    if ($links.length > 0) {
      const randomLink = $links.item(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true });
        info = `Clicked link to: ${randomLink.href}`;
      } else info = `Link to ${randomLink.href} is hidden`;
    } else info = "INVALID. There are no anchor elements in the current page";
    cy.task("logCommand", { funtype: "Action: click anchor", info });
  });
}

function clickRandButton() {
  cy.window().then((win) => {
    const $buttons = win.document.getElementsByTagName("button");
    let info = "";
    if ($buttons.length > 0) {
      const randomButton = $buttons.item(getRandomInt(0, $buttons.length));
      if (!Cypress.dom.isHidden(randomButton)) {
        cy.wrap(randomButton).click({ force: true });
        info = `Clicked button ${randomButton.textContent} with jsPath ${fullPath(randomButton)}`;
      } else info = `Button ${randomButton.textContent} is hidden`;
    } else info = "INVALID. There are no buttons in the current page";
    cy.task("logCommand", { funtype: "Action: click button", info });
  });
}

function fillInput() {
  cy.window().then((win) => {
    const $inputs = win.document.getElementsByTagName("input");
    let info = "";
    if ($inputs.length > 0) {
      const inp = $inputs.item(getRandomInt(0, $inputs.length));
      if (!Cypress.dom.isHidden(inp)) {
        if (inp.getAttribute("type") == "email") {
          const type = faker.internet.email;
          cy.wrap(inp).type(faker.internet.email);
          info = `Input ${inp.id} was filled with ${type}`;
        } else if (
          inp.getAttribute("type") == "button" ||
          inp.getAttribute("type") == "submit" ||
          inp.getAttribute("type") == "radio" ||
          inp.getAttribute("type") == "checkbox"
        ) {
          cy.wrap(inp).click();
          info = `Input ${inp.id} of type ${inp.getAttribute()} was clicked`;
        } else if (inp.getAttribute("type") == "date") {
          const type = faker.date;
          cy.wrap(inp).type(faker.date);
          info = `Input ${inp.id} was filled with ${type}`;
        } else if (inp.getAttribute("type") == "tel") {
          const type = faker.phone;
          cy.wrap(inp).type(type);
          info = `Input ${inp.id} was filled with ${type}`;
        } else if (inp.getAttribute("type") == "url") {
          const type = faker.internet.url;
          cy.wrap(inp).type(type);
          info = `Input ${inp.id} was filled with ${type}`;
        } else if (inp.getAttribute("type") == "number") {
          const type = faker.datatype.number;
          cy.wrap(inp).type(type);
          info = `Input ${inp.id} was filled with ${type}`;
        } else if (inp.getAttribute("type") == "text" || inp.getAttribute("type") == "password") {
          const type = "input ";
          cy.wrap(inp).type(type);
          info = `Input ${inp.id} was filled with ${type}`;
        } else {
          info = `Input ${inp.id} is of type ${inp.getAttribute("type")}`;
        }
      } else info = `Input ${inp.id} is hidden`;
    } else info = "INVALID. There are no input elements in the current page";
    console.log(info);
    cy.task("logCommand", { funtype: "Action: click anchor", info });
  });
}
function clearInput() {
  cy.window().then((win) => {
    let info = "";
    const inputs = win.document.getElementsByTagName("input");
    if (inputs.length > 0) {
      const inp = inputs.item(getRandomInt(0, inputs.length));
      if (!Cypress.dom.isHidden(inp)) {
        cy.wrap(inp).clear();
        info = `Cleared input ${inp.id}`;
      } else info = `Input ${inp.id} is hidden`;
    } else info = "INVALID. There are no input elements in the current page";
    cy.task("logCommand", { funtype: "Action: click anchor", info });
  });
}

function randomEvent() {
  const typeIndex = getRandomInt(0, pending_events.length);
  if (pending_events[typeIndex] > 0) {
    const fIndex = getRandomInt(0, functions[typeIndex].length);
    functions[typeIndex][fIndex]();
    pending_events[typeIndex]--;
    cy.wait(delay);
  } else {
    functions.splice(typeIndex, 1);
    pending_events.splice(typeIndex, 1);
  }
}

function allowNavigation() {
  pending_events[0] = (events * pct_clicks) / 100 + (events * pct_scrolls) / 100;
  pending_events[5] = (events * pct_pgnav) / 100;
}

var pending_events = [, , , , , , ,];

// Aggregate in a matrix-like constant
const functions = [
  [randClick, randDClick, randRClick],
  [],
  [randHover],
  [typeCharKey],
  [spkeypress, enter],
  [reload, navBack, navForward],
  [],
  [fillInput, clearInput, clickRandAnchor, clickRandButton],
];

describe(`${appName} under smarter monkeys`, () => {
  // Listeners
  cy.on("uncaught:exception", (err) => {
    cy.task("genericLog", { message: `An exception occurred: ${err}` });
    cy.task("genericReport", { html: `<p><strong>Uncaught exception: </strong>${err}</p>` });
  });
  cy.on("window:alert", (text) => {
    cy.task("genericLog", { message: `An alert was fired with the message: "${text}"` });
    cy.task("genericReport", {
      html: `<p><strong>An alert was fired with the message: </strong>${text}</p>`,
    });
  });
  cy.on("fail", (err) => {
    cy.task("genericLog", { message: `The test failed with the following error: ${err}` });
    cy.task("genericReport", {
      html: `<p><strong>Test failed with the error: </strong>${err}</p>`,
    });
    return false;
  });
  it(`visits ${appName} and survives smarter monkeys`, () => {
    seed = getRandomInt(0, Number.MAX_SAFE_INTEGER);

    cy.task("logStart", { type: "monkey", url, seed });
    cy.log(`Seed: ${seed}`);
    cy.task("genericLog", { message: `Seed: ${seed}` });

    const pcg =
      pct_clicks +
      pct_scrolls +
      pct_keys +
      pct_pgnav +
      pct_selectors +
      pct_spkeys +
      pct_actions +
      pct_browserChaos;
    if (pcg === 100) {
      pending_events[0] =
        (events * pct_clicks) / 100 + (events * pct_pgnav) / 100 + (events * pct_scrolls) / 100;
      pending_events[1] = 0;
      pending_events[2] = (events * pct_selectors) / 100;
      pending_events[3] = (events * pct_keys) / 100;
      pending_events[4] = (events * pct_spkeys) / 100;
      pending_events[5] = 0;
      pending_events[6] = 0;
      pending_events[7] = (events * pct_actions) / 100 + (events * pct_browserChaos) / 100;

      cy.visit(url).then((win) => {
        const d = win.document;
        curPageMaxY = Math.max(
          d.body.scrollHeight,
          d.body.offsetHeight,
          d.documentElement.clientHeight,
          d.documentElement.scrollHeight,
          d.documentElement.offsetHeight
        );
        curPageMaxX = Math.max(
          d.body.scrollWidth,
          d.body.offsetWidth,
          d.documentElement.clientWidth,
          d.documentElement.scrollWidth,
          d.documentElement.offsetWidth
        );
      });
      cy.loadScheduleToMonth("small_test_schedule.xlsx");
      cy.wait(1000);
      // Add an event for each type of event in order to enter the else statement of randomEvent method
      for (let i = 0; i < (events + 7) / 2; i++) {
        evtIndex++;
        randomEvent();
      }
      cy.wait(1).then(() => {
        cy.wrap(allowNavigation);
      });

      // Add an event for each type of event in order to enter the else statement of randomEvent method
      for (let i = (events + 7) / 2; i < events + 7; i++) {
        evtIndex++;
        randomEvent();
      }
    } else cy.task("logPctNo100");
  });

  afterEach(() => {
    cy.task("logEnd");
  });
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// End of smart monkey
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/* eslint-enable */
