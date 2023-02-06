import React, {FC} from 'react';
import styles from "../../styles/Header/Header.module.scss"
import Image from "next/image";


interface Header{
    children: React.ReactNode
}

const Header:FC<Header> = ({
    children
                           }) => {
    return(
        <div className={styles.headerCont}>
            <div className={'container-fluid header-adaptive'}>
                <div className={'h-100 row d-flex align-items-center'}>

                    {/*LOGO*/}

                    <div className={'col-2 col-lg-2 h-100 d-none d-lg-flex align-items-center'}

                    >
                        <div className={styles.headerLogo}>
                            <Image
                                src={'/Logo/w_logo_svg.svg'}
                                alt={"Logo"}
                                fill={true}
                                style={{
                                    objectFit: "contain",
                                    objectPosition: "left"
                                }}
                            />
                        </div>
                    </div>

                    <div className={'col-2 h-100 d-flex d-lg-none align-items-center position-relative'}>
                        <div className={styles.mobLogo}>
                            <div className={styles.headerLogo}>
                                    <Image
                                        src={'/Logo/mob_logo.svg'}
                                        alt={"Logo"}
                                        fill={true}
                                        style={{
                                            objectFit: "contain",
                                            objectPosition: "center"
                                        }}
                                    />
                            </div>
                        </div>
                    </div>

                    {/*CATALOG & SEARCH*/}

                    <div className={'px-0 px-sm-3 col-7 col-sm-7 col-lg-7 d-flex align-items-center h-75'}

                    >
                        <div className={styles.headerCatalog}>
                            <button className={styles.catalogBtn}>
                                <div className={styles.catalogBtn_img}>
                                    <Image
                                        src={'/Header/catalog_btn.svg'}
                                        alt={'Catalog button'}
                                        fill={true}
                                        style={{
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                                    <span>Каталог</span>
                            </button>

                            <input type={"button"}
                                   className={`text-left ${styles.searchBtn}`}
                                   value={"Поиск"}
                                   name={"search"}
                            />
                        </div>
                    </div>

                    {/*NAVIGATION*/}

                    <div className={'px-2 px-sm-3 col-3 col-sm-3 d-flex h-75 align-items-center justify-content-end'}

                    >
                        <div className={styles.headerNav}>
                            <button className={styles.cartBtn}>
                                <div className={styles.cartBtn_img}>
                                    <Image
                                        src={'/Header/header_cart.svg'}
                                        alt={'cart'}
                                        fill={true}
                                        style={{
                                            objectFit:"contain"
                                        }}
                                    />
                                </div>
                            </button>

                            <button className={styles.contactsBtn}>
                                <div className={styles.contactsBtn_img}>
                                    <Image
                                        src={'/Header/header_contacts.svg'}
                                        alt={'contacts'}
                                        fill={true}
                                        style={{
                                            objectFit:"contain"
                                        }}
                                    />
                                </div>
                                <span>Контакты</span>
                            </button>

                            <div
                                // className={styles.children_block}
                                style={{
                                    position: "absolute",
                                    display: "none"
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header;