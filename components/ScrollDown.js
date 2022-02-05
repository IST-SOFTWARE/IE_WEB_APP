import styles from "../styles/ScrollDown.module.css"

export default function ScrollDown({text}){
    return(
        <>
            <div className={styles.sdBlock}>
                <img src="./sd_ico.svg" alt="Scroll down" width="40px" height="52px"/>
                <p>{text}</p>
            </div>
        </>
    )
}