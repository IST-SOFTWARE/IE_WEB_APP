import Logo from "../Logo"
import CatalogBtn from "./CatalogBtn"
import Search from "./Search"
import Contacts from "./Contacts"
import Cart from "./Cart"
import Login from "./Login"

import styles from "../../styles/Header.module.css"
const Header = () => {
    return(
        <>
         <div className={styles.header}>
            <div className="container">
                <div className={styles.HeaderContent}>
                    <Logo w="218" h="65" href="./"/>

                    <div className={styles.catalogAndSearch}>
                        <CatalogBtn/>
                        <Search/>
                    </div>

                    <div className={styles.infoLoginCart}>
                        <Contacts/>
                        <Cart/>
                        <Login/>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}
export default Header