import styles from "../../../styles/OurPartners/ourPartnersPage.module.scss";
import PartnersList, { sliderPositionVar } from "./PartnersList";
import { FC, useEffect, useState } from "react";
import { IPageOfLanding } from "../../../queries/landingPage";
import getGallery, { IGallery } from "../GalleryTypes";
import { useRouter } from "next/router";
import ru from "../../../locales/ru";
import en from "../../../locales/en";

//  LandingPageComp data test

export interface IOurPartnersPage_translation {
  joinUs: string;
  send: string;
  orderCall: string;
  contact: string;
}

interface IOurPartnersPage {
  page: IPageOfLanding;
  translation: IOurPartnersPage_translation;
}

const OurPartnersPage: FC<IOurPartnersPage> = ({ page, translation }) => {


  const [partnersList, setPartnersList] = useState<IGallery>(null);

  const [callBackReq, setCallBackReq] = useState<boolean>(false);
  const [callBackResp, setCallBackResp] = useState<boolean>(false);
  const [callBackRespName, setCallBackRespName] = useState<string>("");

  const [contactsState, setContactsState] = useState<boolean>(false);

  useEffect(() => {
    if (page?.gallery?.gallery_content?.length > 0) {
      const gallery: IGallery = getGallery(page);
      setPartnersList(gallery);
    }
  }, [page]);

  //  LandingPageComp data test

  //--------------------

  return (
    <>
      {/*<div className={styles.ourPartnersPage_content}>*/}
      {/*    <div className={"row"}>*/}
      <div
        className={
          "col-lg-7 col-md-10 col-sm-12 col-12 d-flex align-items-center mx-auto w-100"
        }
      >
        <div className={"w-100 flex-grow-1"}>
          <PartnersList
            items={partnersList}
            layout={[
              {
                rows: 3,
                cols: 2,
                windowWidth: 0,
                sliderOption: sliderPositionVar.side,
                maxWidth: "400px",
              },

              {
                rows: 2,
                cols: 4,
                windowWidth: 576,
                sliderOption: sliderPositionVar.bottom,
                maxWidth: "700px",
              },

              {
                rows: 2,
                cols: 3,
                windowWidth: 968,
                sliderOption: sliderPositionVar.bottom,
                maxWidth: "700px",
              },

              {
                rows: 2,
                cols: 4,
                windowWidth: 1200,
                sliderOption: sliderPositionVar.bottom,
                maxWidth: "720px",
              },
            ]}
          />
        </div>
      </div>
      <div
        className={
          "col-lg-5 col-md-10 col-12 d-flex align-items-center mx-auto"
        }
      >
        <div className={styles.PartnersJoinBlock}>
          <p>{translation?.joinUs}</p>
          <a>{translation?.send}:</a>
          <div>
            <button className={styles.primaryButton}>
              {translation?.orderCall}
            </button>

            <button>{translation?.contact}</button>
          </div>
        </div>
      </div>
      {/*</div>*/}
      {/*</div>*/}

      {/*<CallRequestSenderModal cbModalState={callBackReq}*/}
      {/*                        setCbModalState={setCallBackReq}*/}
      {/*                        api_data={callBack_data}*/}
      {/*                        respStateSet={setCallBackResp}*/}
      {/*                        respNameSet={setCallBackRespName}/>*/}

      {/*<CallRequestMessageModal userName={callBackRespName}*/}
      {/*                         modalState={callBackResp}*/}
      {/*                         modalSwitcher={setCallBackResp}/>*/}

      {/*<ContactsModal modalState={contactsState} modalSwitcher={setContactsState}/>*/}
    </>
  );
};

export default OurPartnersPage;
