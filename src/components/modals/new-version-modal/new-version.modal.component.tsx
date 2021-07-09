/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./new-version.modal.styled";
import { t } from "../../../helpers/translations.helper";
import { Button } from "../../buttons/button-component/button.component";
import DefaultModal from "../modal.component";
import { CookiesProvider } from "../../../logic/data-access/cookies-provider";

interface NewVersionModalOptions {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export default function NewVersionModal(options: NewVersionModalOptions): JSX.Element {
  const { setOpen, open } = options;
  const handleClose = (): void => {
    setOpen(false);
  };

  const title = t("update");

  const version = CookiesProvider.getCookie("appversion");
  const body = (
    <div>
      <S.BodyText>{t("updateMessage", { version })}</S.BodyText>
    </div>
  );

  const footer = (
    <div>
      <Button
        onClick={handleClose}
        size="small"
        className="submit-button"
        variant="primary"
        marginString="5px 10px 5px 0px"
      >
        OK
      </Button>
    </div>
  );

  return <DefaultModal open={open} setOpen={setOpen} title={title} body={body} footer={footer} />;
}
