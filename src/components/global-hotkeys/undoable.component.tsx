/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { GlobalHotKeys } from "react-hotkeys";
import React from "react";
import { useDispatch } from "react-redux";
import {
  UndoableConfig,
  UndoActionCreator,
} from "../../state/schedule-data/undoable.action-creator";

interface UndoableHotkeysOptions {
  config: UndoableConfig<unknown>;
}

export function UndoableHotkeys({ config }: UndoableHotkeysOptions): JSX.Element {
  const dispatch = useDispatch();

  enum KeyMapActions {
    UNDO,
    REDO,
  }

  const keyMap: Record<KeyMapActions, string> = {
    [KeyMapActions.UNDO]: "ctrl+z",
    [KeyMapActions.REDO]: "ctrl+shift+z",
  };

  const handlers: Record<KeyMapActions, (keyEvent?: KeyboardEvent) => void> = {
    [KeyMapActions.UNDO]: () => dispatch(UndoActionCreator.undo(config)),
    [KeyMapActions.REDO]: () => dispatch(UndoActionCreator.redo(config)),
  };

  return <GlobalHotKeys keyMap={keyMap} handlers={handlers} />;
}
