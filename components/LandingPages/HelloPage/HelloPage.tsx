import React, { FC } from "react";
import Gallery from "./Gallery/Gallery";
import CallBack, { ICallBack_translation } from "./CallBack";
import getGallery, { IGallery } from "../GalleryTypes";
import { IPageOfLanding } from "../../../queries/landingPage";
import IstButton from "../../UI/ISTButton/IstButton";
import { useRouter } from "next/router";
import { useTransition } from "../../../Hooks/useTranslation/useTranslation";
import { EN_LOCALE, RU_LOCALE } from "../../../locales/locales";

import ru_callback from "../../../locales/callback/ru";
import en_callback from "../../../locales/callback/en";

interface HelloPage {
  page: IPageOfLanding;
}

const HelloPage: FC<HelloPage> = ({ page }) => {
  const Router = useRouter();

  const currencyTranslationCallBack = useTransition<ICallBack_translation>([
    { locale: RU_LOCALE, translation: ru_callback },
    { locale: EN_LOCALE, translation: en_callback },
  ]);

  return (
    <>
      <div className={"col-md-12 col-lg-7 order-lg-0 order-1 d-flex "}>
        {/*<div className={"d-lg-block w-100 d-none"}>*/}
        <CallBack translation={currencyTranslationCallBack?.translation} locale={Router.locale} />
        {/*</div>*/}
        {/*<div className={"d-lg-none d-flex w-100 h-100 justify-content-start"}>*/}
        {/*    <IstButton*/}
        {/*        title={"Заказать звонок"}*/}
        {/*        paddings={{horizontalPadding: 10, paddingFactor:2}}*/}
        {/*        maxSize={{w:"220px", h:"55px"}}*/}
        {/*        // size={{w:"220px", h:"55px"}}*/}
        {/*        // borderRadius={"15px"}*/}
        {/*    />*/}
        {/*</div>*/}
      </div>

      <div
        className={
          "col-md-12 col-lg-5 order-lg-1 order-0 d-flex position-static"
        }
      >
        <Gallery slides={getGallery(page)?.slides} />
      </div>
    </>
  );
};

export default HelloPage;
