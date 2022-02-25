import { useState, useEffect} from "react";
import styles from "../../styles/ModalComponents/ModalBase.module.css";
import Image from "next/image";

export default function CallBackModal({backImg, w, h}){
    const[callUser, setCallUser] = useState({
        name: "",
        phone: "",
    });
    const[backImgUrl, setBgImg] = useState("/null_bg.png");

    useEffect(() => {
        backImg !== undefined ? setBgImg(backImg) : setBgImg("/null_bg.png");
    },[])

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
                <div className={styles.PUbackImg}>
                    <Image
                        src={backImgUrl}
                        width={w}
                        height={h}
                        q={50}
                    />
                </div>
            </div>
            

        </>
    );
}