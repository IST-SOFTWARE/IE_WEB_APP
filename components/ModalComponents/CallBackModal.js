import { useState } from "react";
import styles from "../../styles/ModalComponents/ModalBase.module.css";

export default function CallBackModal(){
    const[callUser, setCallUser] = useState({
        name: "",
        phone: "",
    });
    return(
        <>
            <div className={styles.ModalFormContent}>
                <label>
                    Имя:
                    <input type="text" placeholder="Андрей"
                    value={callUser.name}
                    onChange={(e) => setCallUser((user) => ({...user, name: e.target.value}))}
                    />
                </label>
                <label>
                    Телефон:
                    <input type="text" placeholder="+7(000)000-00-00"
                    value={callUser.phone}
                    onChange={(e) => setCallUser((user) => ({...user, phone: e.target.value}))}
                    />
                </label>

                <button>
                    Отправить
                </button>

                <a>+7(000)000-00-00</a>
            </div>
        </>
    );
}