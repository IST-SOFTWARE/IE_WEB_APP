import styles from "../../styles/Header.module.css"

const Login = () => {
    return(
        <>
            <button className={styles.cartAndLoginBlock}>
                <img src="./Login_ico.png" alt="Login" width="42px" height="42px"/>
                <a>Войти</a>
            </button>
        </>
    )
}
export default Login