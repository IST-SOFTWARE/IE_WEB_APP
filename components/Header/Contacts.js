import styles from "../../styles/Header.module.css"

const Contacts = () => {
    return(
        <>
            <button className={styles.ContactsBlock}>
                <img src="./contacts_ico.png" alt="phone and time" width="33px" height="33px"/>
                <a>Контакты</a>
            </button>
        </>
    )
}
export default Contacts