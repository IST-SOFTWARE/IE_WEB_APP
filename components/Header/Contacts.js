import styles from "../../styles/Header.module.css"

import {useState} from "react";
import ContactsModal from "../DefaultModals/contactsModal";

export default function Contacts({contTitle}){

    const[contactsPU, setContactsPU] = useState(false);

    return(
        <>
            <button className={styles.ContactsBlock}
                    onClick={() => setContactsPU(!contactsPU)}>
                <img src="/contacts_ico.png" alt="phone and time" width="33px" height="33px"/>
                <a>{contTitle}</a>
            </button>

            <ContactsModal
                modalState={contactsPU}
                modalSwitcher={setContactsPU}
            />

        </>
    )
}