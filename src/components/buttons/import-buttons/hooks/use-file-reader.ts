/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useCallback, useEffect, useMemo, useState } from "react";

export function useFileReader(): [ArrayBuffer | undefined, (srcFile: File) => void] {
  const fileReader = useMemo(() => new FileReader(), []);
  const [content, setContent] = useState<ArrayBuffer>();

  useEffect(() => {
    const updateContent = (): void => setContent(fileReader.result as ArrayBuffer);
    fileReader.addEventListener("loadend", updateContent);
    return (): void => fileReader.removeEventListener("loadend", updateContent);
  }, [fileReader]);

  const setSrcFile = useCallback(
    (file: File): void => {
      fileReader.readAsArrayBuffer(file);
    },
    [fileReader]
  );
  return [content, setSrcFile];
}
