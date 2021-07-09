/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useEffect, useState } from "react";

export type SelectionMatrix = boolean[][];

export function areDimesionsEqual(matrix1: unknown[][], matrix2: unknown[][]): boolean {
  return matrix1.length === matrix2.length && matrix1[0].length === matrix2[0].length;
}

interface UseSelectionMatrixReturn {
  setSelectionMatrix: (
    source: SelectionMatrix,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => void;
  selectionMatrix: SelectionMatrix;
  resetSelectionMatrix: () => void;
}

export function useSelectionMatrix(matrix: unknown[][]): UseSelectionMatrixReturn {
  const [selectionMatrix, setSelectionMatrix] = useState<SelectionMatrix>(getFalsyCopy(matrix));

  useEffect(() => {
    if (!areDimesionsEqual(matrix, selectionMatrix)) {
      setSelectionMatrix(getFalsyCopy(matrix));
    }
  }, [selectionMatrix, matrix, setSelectionMatrix]);

  function getFalsyCopy(source: unknown[][]): SelectionMatrix {
    return [...Array(source.length)].map((_) => Array(source[0].length).fill(false));
  }

  function setSelection(
    source: SelectionMatrix,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): void {
    const selection = getFalsyCopy(source);
    const [startX, endX] = x2 < x1 ? [x2, x1] : [x1, x2];
    const [startY, endY] = y2 < y1 ? [y2, y1] : [y1, y2];
    if (startX < 0 || startY < 0) {
      setSelectionMatrix(selection);
      return;
    }
    for (let y = startY; y <= endY; ++y) {
      for (let x = startX; x <= endX; ++x) {
        selection[y][x] = true;
      }
    }
    setSelectionMatrix(selection);
  }

  function resetSelection(): void {
    setSelectionMatrix((prev) => getFalsyCopy(prev));
  }

  return {
    selectionMatrix,
    setSelectionMatrix: setSelection,
    resetSelectionMatrix: resetSelection,
  };
}
