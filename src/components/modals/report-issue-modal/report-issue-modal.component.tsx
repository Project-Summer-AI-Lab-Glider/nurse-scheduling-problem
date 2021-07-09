/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { send } from "emailjs-com";
import React, { useState } from "react";
import * as S from "./report-issue-modal.styled";
import { t } from "../../../helpers/translations.helper";
import { Button } from "../../buttons/button-component/button.component";
import { useNotification } from "../../notification/notification.context";
import DefaultModal from "../modal.component";

export interface ReportIssueModalOptions {
  setOpen: (open: boolean) => void;
  open: boolean;
  clear?: () => void;
}

export default function ReportIssueModal(options: ReportIssueModalOptions): JSX.Element {
  const [isSent, setIsSent] = useState(false);
  const { open, setOpen, clear } = options;

  const [issueDescription, setIssueDescription] = useState("");
  const title = t("reportError");
  const { createNotification } = useNotification();

  function onIssueDescriptionChange(event): void {
    const { value } = event.target;
    setIssueDescription(value);
  }

  function handleClose(): void {
    clear && clear();
    setIssueDescription("");
    setIsSent(false);
    setOpen(false);
  }

  function handleSend(): void {
    send(
      "service_74nkmaq",
      "template_120y7az",
      {
        message: issueDescription,
      },
      process.env.REACT_APP_EMAIL_KEY
    )
      .then(() => {
        setIsSent(true);
      })
      .catch(() => {
        createNotification({ type: "error", message: t("thereWasNetworkingError") });
        handleClose();
      });
  }

  // Only for testing purposes
  if (
    process.env.REACT_APP_TEST_MODE &&
    issueDescription.toLowerCase() === process.env.REACT_APP_ERROR_WORKER
  ) {
    throw new Error("[TEST MODE] Error message was entered");
  }
  const addSuffix = (length: number): string => {
    if (length < 5) {
      if (length === 1) return "";
      return "i";
    }
    return "ów";
  };
  const helperText = (length: number): string => {
    if (length < 19) {
      return `Treść wiadomości jest za krótka! Wprowadź jeszcze min. ${
        19 - length + 1
      } znak${addSuffix(length)}.`;
    }
    return " ";
  };
  const body = (
    <div>
      {isSent ? (
        <S.Message>{t("errorMessageWasSent")}</S.Message>
      ) : (
        <>
          <S.Message>{t("whatErrorOccurred")}</S.Message>
          <S.Input
            placeholder={t("provideErrorDescription")}
            value={issueDescription}
            onChange={onIssueDescriptionChange}
            fullWidth
            multiline
            helperText={helperText(issueDescription.length)}
          />
        </>
      )}
    </div>
  );

  const footer = (
    <div>
      {!isSent && (
        <>
          <Button variant="primary" onClick={handleSend} disabled={issueDescription.length < 20}>
            {t("send")}
          </Button>
          <Button variant="secondary" color="secondary" onClick={handleClose}>
            {t("cancel")}
          </Button>
        </>
      )}
      {isSent && (
        <Button variant="primary" onClick={handleClose}>
          {t("close")}
        </Button>
      )}
    </div>
  );

  return (
    <DefaultModal
      open={open}
      setOpen={setOpen}
      title={title}
      body={body}
      footer={footer}
      closeOptions={handleClose}
    />
  );
}
