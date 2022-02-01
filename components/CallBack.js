import styles from "../styles/CallBack.module.css"

export default function CallBack({phone}) {
    return(
        <>
            <div className={styles.CallBack}>
                <div className={styles.BaseBlock}>
                <p>Заказать звонок:</p>
                    <div className={styles.InputBlock}>
                        <input type="text" placeholder="Имя:"/>
                        <input type="text" placeholder="Телефон:"/>
                        <button>Отправить заявку</button>
                    </div>
                </div>
                <p>Наш телефон: <a>{phone}</a></p>
            </div>
        </>
    )
}