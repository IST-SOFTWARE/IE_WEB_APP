import Logo from "../Logo"
import LogoMobile from "../LogoMobile"
import CatalogBtn from "./CatalogBtn"
import Search from "./Search"
import Contacts from "./Contacts"
import Cart from "./Cart"
import Login from "./Login"
import styles from "../../styles/Header.module.css"
import { useEffect, useState, forwardRef} from "react"


const Header = forwardRef(({HeaderLangChecker, content, lang}, ref) => {

    return(
        <>
         <div className={styles.header} ref={ref}>
            <div className="container">
                <div className={styles.HeaderContent}>
                    <div className={styles.HeaderBigLogo}>
                        <Logo
                        w="218"
                        h="65"
                        href="/"/>
                    </div>

                    <div className={styles.HeaderMobLogo}>
                        <LogoMobile
                            href="/"
                        />
                    </div>

                    <div className={styles.catalogAndSearch}>
                        <CatalogBtn text={
                        //    HeaderLangChecker(content,
                        //     "Каталог",
                        //     "CatalogTitle",
                        //     lang)

                        "Каталог"
                        }/>
                        <Search placeholder={
                        //    HeaderLangChecker(content,
                        //     "Ищем что-то?",
                        //     "SearchPlaceholder",
                        //     lang)
                        "Ищем что-то?"
                        }
                        />
                    </div>

                    <div className={styles.infoLoginCart}>
                        <Contacts contTitle={
                        "Контакты"
                        }/>
                        <Cart cartTitle={
                        //    HeaderLangChecker(content,
                        //     "Корзина",
                        //     "CartTitle",
                        //     lang)
                        "Корзина"
                        }/>


                        {/*<Login loginTitle={*/}
                        {/*//    HeaderLangChecker(content,*/}
                        {/*//     "Войти",*/}
                        {/*//     "LoginTitle",*/}
                        {/*//     lang)*/}
                        {/*"Войти"*/}
                        {/*}/>*/}


                    </div>
                </div>
            </div>
         </div>
        </>
    )
});

Header.displayName = 'Header';
export default Header;
