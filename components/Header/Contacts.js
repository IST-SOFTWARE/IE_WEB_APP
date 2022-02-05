import styles from "../../styles/Header.module.css"

export default function Contacts({contTitle}){
    return(
        <>
            <button className={styles.ContactsBlock}>
                <img src="./contacts_ico.png" alt="phone and time" width="33px" height="33px"/>
                <a>{contTitle}</a>
            </button>
        </>
    )
}