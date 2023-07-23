import styles from "../../../styles/LandingStyles/PagesComponents/HelloPage/callBack.module.scss";

import { FC, useEffect, useRef, useState } from "react";
import ISTInput, { inputTypesVars } from "../../UI/ISTInput/ISTInput";
import IstButton from "../../UI/ISTButton/IstButton";
import getOurContactsData, {
  contactsData,
  GET_OUR_CONTACTS_QUERY,
  IOurContacts,
} from "../../../queries/landingFeatures/ourContactsQuery";
import { useQuery } from "@apollo/client";
import { catalogClient } from "../../../Apollo/catalogClient";
import useCallRequest from "../../../Hooks/useCallRequest/useCallRequest";
import useBaseModal from "../../../Hooks/useBaseModal/useBaseModal";
import { useISTInputFelt } from "../../UI/ISTInput/useISTInputFelt";
import en from "../../../locales/en";
import ru from "../../../locales/ru";

export interface ICallBack_translation {
  call: string;
  name: string;
  phone: string;
  send: string;
  ourPhone: string;
}

interface CallBack {
  locale: string;
  translation: ICallBack_translation;
}

const CallBack: FC<CallBack> = ({ locale, translation }) => {
  const [client_name, setName] = useState("");
  const [client_phone, setPhone] = useState("");

  const t = locale === "ru-RU" ? ru : en;

  const [contactsData, setContactsData] = useState<contactsData>(null);
  const { data, loading, error } = useQuery<IOurContacts>(
    GET_OUR_CONTACTS_QUERY,
    {
      variables: {
        lang: locale ?? "en-US",
      },
    }
  );

  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const { modalComponent } = useBaseModal("APP_BODY_WRAPPER");

  const { checkFields } = useISTInputFelt();
  // const{errors, newData, send} = useCallRequest(
  //     catalogClient,
  //     client_name,
  //     client_phone,
  // )

  useEffect(() => {
    if (data) {
      setContactsData(getOurContactsData(data));
    }
  }, [data]);

  // useEffect(()=> {
  //     // console.log(newData, errors);
  //     if(newData){
  //         modalComponent.editModal(
  //             `Спасибо, ${client_name}!`,
  //             "Мы скоро свяжемся с вами :D"
  //             )
  //         modalComponent.switch(true);
  //     }
  //     if(errors){
  //         modalComponent.editModal(
  //             "Что-то пошло не так :(",
  //             "Перезагрузите страницу " +
  //             "и попробуйте еще раз"
  //         )
  //         modalComponent.switch(true);
  //     }
  // },[newData, errors]);

  const sendCallBack = () => {
    // send();
    // console.log(checkFields(
    //     [{
    //         refObj: phoneRef,
    //         required: true
    //     },{
    //         refObj: nameRef,
    //         required: true
    //     }],
    // ))
  };

  return (
    <>
      <div className={styles.callBack}>
        <div className={styles.baseBlock}>
          <p className={styles.callBackTitle}>{translation?.call}</p>

          <div className={styles.inputBlock}>
            <div
              style={{
                marginBottom: "5px",
              }}
            >
              <ISTInput
                inputType={inputTypesVars.any_string}
                placeholder={translation?.name}
                required={true}
                outDataSetter={setName}
                actualData={client_name}
                ref={nameRef}
              />

              <ISTInput
                inputType={inputTypesVars.phone}
                placeholder={translation?.phone}
                required={true}
                outDataSetter={setPhone}
                actualData={client_phone}
                ref={phoneRef}
              />
            </div>
            <IstButton
              title={translation?.send}
              paddings={{ horizontalPadding: 28, paddingFactor: 2 }}
              maxSize={{ h: "55px" }}
              size={{ w: "100%" }}
              borderRadius={"28px"}
              buttonAction={sendCallBack}
            />
          </div>
        </div>
        <p>
          {translation?.ourPhone}:
          <span>
            <a
              href={`tel:${
                contactsData ? contactsData.phone_numbers[0]?.phone_item : null
              }`}
            >
              {contactsData ? contactsData.phone_numbers[0]?.phone_item : null}
            </a>
          </span>
        </p>
      </div>

      {/*<ModalView*/}
      {/*    data={modalComponent}*/}
      {/*    border={false}*/}
      {/*/>*/}
    </>
  );
};

export default CallBack;
