import React, {
  Dispatch,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ISTInput, { inputTypesVars } from "../../UI/ISTInput/ISTInput";
import ISTComponentWrapper from "../../UI/ComponentWrapper/ISTComponentWrapper";
import styles from "../../../styles/Modals/callBack/callBack_request.module.scss";
import ISTButtonN from "../../UI/ISTButton/ISTButtonN";
import { DocumentNode } from "graphql/language";
import {
  IOurContacts,
  IOurContactsVars,
} from "../../../queries/landingFeatures/ourContactsQuery";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useISTInputFelt } from "../../UI/ISTInput/useISTInputFelt";
import ru from "../../../locales/ru";
import en from "../../../locales/en";

export interface ICB_RequestModalData {
  name: string;
  phone: string;
}

export interface ICallBackRequest_translation {
  name: string;
  firstName: string;
  phone: string;
  send: string;
  close: string;
  contacts: string;
  placeholderPhone: string;
}

interface ICallBack_Request {
  getContactsQuery: DocumentNode;
  getContactVars: IOurContactsVars;
  reqStatusSetter: Dispatch<ICB_RequestModalData>;
  translation: ICallBackRequest_translation;
}

interface IContactsList {
  contactsList: Array<string>;
  onceContact: string;
}

const CallBackRequest_modal: FC<ICallBack_Request> = ({
  getContactsQuery,
  getContactVars,
  reqStatusSetter,
  translation,
}) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();

  const { checkFields } = useISTInputFelt();

  const [contPhones, setContPhones] = useState<IContactsList>(null);
  const [contactsDeployed, setContactsDeployed] = useState<boolean>(false);

  const phoneLinkRef = useRef<HTMLAnchorElement>(null);
  const contactsList = useRef<HTMLDivElement>(null);

  //FOR OUR CONTACTS IN MODAL 👇
  const { data } = useQuery<IOurContacts, IOurContactsVars>(getContactsQuery, {
    variables: getContactVars,
  });

  useEffect(() => {
    if (data) {
      const phones = data.ourContacts.contacts_data[0];
      if (phones) {
        const currentPhones: IContactsList = {
          contactsList: [],
          onceContact: "",
        };

        currentPhones.onceContact = phones.phone_numbers[0]
          ? phones.phone_numbers[0].phone_item
          : "";

        if (phones.phone_numbers.length > 1) {
          phones.phone_numbers.map((el, i) => {
            currentPhones.contactsList.push(el.phone_item);
          });
        }

        setContPhones(currentPhones);
      }
    }
  }, [data]);

  useEffect(() => {
    const listOfContacts = contactsList.current;
    if (listOfContacts) {
      const onWheel = (ev) => {
        listOfContacts.scrollTo({
          left: listOfContacts.scrollLeft + ev.deltaY * 5,
          behavior: "smooth",
        });
      };

      listOfContacts.addEventListener("wheel", onWheel);
      return () => {
        listOfContacts.removeEventListener("wheel", onWheel);
      };
    }
  }, [contactsList, contactsDeployed]);

  const handleTelephoneClick = useCallback(() => {
    const printCatch = () => {
      console.warn("Failed to transfer phone number for further call");
    };

    if (phoneLinkRef && phoneLinkRef.current) {
      if (phoneLinkRef.current.href)
        router.push(phoneLinkRef.current.href).catch(() => {
          printCatch();
        });
      else printCatch();
    }
  }, [phoneLinkRef]);

  //FOR OUR CONTACTS IN MODAL 👆

  const sendNewCallRequest_handler = () => {
    const felt = checkFields([
      {
        required: true,
        refObj: phoneRef,
      },

      {
        required: true,
        refObj: nameRef,
      },
    ]);

    if (felt)
      reqStatusSetter({
        phone: phone,
        name: name,
      });
  };

  return (
    <>
      <ISTComponentWrapper
        title={translation?.name}
        wrapperClass={styles.inputWrapper}
      >
        <ISTInput
          ref={nameRef}
          inputType={inputTypesVars.any_string}
          placeholder={translation?.firstName}
          required={true}
          outDataSetter={setName}
          actualData={name}
          style={{
            height: "45px",
            borderRadius: "25px 89px 89px",
          }}
        />
      </ISTComponentWrapper>

      <ISTComponentWrapper
        title={translation?.phone}
        wrapperClass={styles.inputWrapper}
      >
        <ISTInput
          ref={phoneRef}
          inputType={inputTypesVars.phone}
          placeholder={translation?.placeholderPhone}
          required={true}
          outDataSetter={setPhone}
          actualData={phone}
          style={{
            height: "45px",
            borderRadius: "25px 89px 89px",
          }}
        />
      </ISTComponentWrapper>

      <div className={styles.buttonWrapper}>
        <ISTButtonN
          light={{
            fill: false,
            style: {
              borderRadius: "15px",
              fillContainer: true,
            },
          }}
          title={{
            caption: translation?.send,
          }}
          onClick={() => sendNewCallRequest_handler()}
        />
      </div>

      {contPhones && contactsDeployed ? (
        <div className={styles.contacts_wrapper}>
          {/*ONE PHONE NUM*/}
          <a href={`tel:${contPhones.onceContact}`}>{contPhones.onceContact}</a>

          {/*CONTACTS LIST*/}
          <div className={styles.contacts_list} ref={contactsList}>
            {contPhones.contactsList.map((el, i) => (
              <div
                key={`contact_item_${i}`}
                className={styles.contact_item}
                onClick={() => {
                  handleTelephoneClick();
                }}
              >
                <span>{i + 1}</span>
                <a
                  ref={phoneLinkRef}
                  rel={"noreferrer"}
                  target={"_blank"}
                  href={`tel:${el}`}
                >
                  {el}
                </a>
              </div>
            ))}

            {/*CONTACTS LIST / CLOSER*/}
            <div
              className={`${styles.contact_item} ${styles.closer}`}
              onClick={() => {
                setContactsDeployed(!contactsDeployed);
              }}
            >
              <span>
                <Image
                  src={"/PU_closer.svg"}
                  alt={"close contact phones"}
                  fill={true}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </span>
              <a>{translation?.close}</a>
            </div>
          </div>
        </div>
      ) : //    One contact bar
      contPhones && !contactsDeployed ? (
        <div className={styles.contacts_wrapper}>
          <a href={`tel:${contPhones.onceContact}`}>{contPhones.onceContact}</a>

          <a
            className={styles.moreButton}
            onClick={() => {
              setContactsDeployed(!contactsDeployed);
            }}
          >
            {translation?.contacts}
          </a>
        </div>
      ) : null}
    </>
  );
};

export default CallBackRequest_modal;
