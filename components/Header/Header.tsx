import React, {FC, useEffect} from 'react';
import styles from "../../styles/Header/Header.module.scss"
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "../../Hooks/reduxSettings";
import {useDispatch} from "react-redux";
import {
    setCatalogState,
    updateCatalog
} from "../../store/slices/catalogSlice/catalogSlice";
import {useCatalog} from "../../Hooks/useCatalog/useCatalog"
import {ICatalogQueries} from "../../Hooks/useCatalog/ICatalogQueries";
import {ICatalogFiltersType} from "../../store/slices/catalogSlice/catalogFiltersType";

interface Header{
    children?: React.ReactNode,

    catalogOpener?: (...props: any) => void,
    searchOpener?: (...props: any) => void
}

const Header:FC<Header> = ({
    children,
    catalogOpener,
    searchOpener
    }) => {

    const reduxCatalogState = useAppSelector(state => state.catalog)


    const {pushQuery, currentState} = useCatalog<ICatalogQueries<ICatalogFiltersType>,
        ICatalogFiltersType>(

    )

    // useEffect(()=>{
    //     if(currentState && reduxCatalogState && reduxCatalogState.catalog === undefined)
    //         catalogDispatch(updateCatalog(currentState));
    // },[currentState, reduxCatalogState])

    // useEffect(()=>{
    //     if(reduxCatalogState && reduxCatalogState.catalog !== undefined)
    //         pushQuery(reduxCatalogState);
    // },[reduxCatalogState])

    return(
        <div className={styles.headerCont}>
            <div className={'container-fluid header-adaptive'}>
                <div className={'h-100 row d-flex align-items-center'}>

                    {/*LOGO*/}
                    <div className={'col-2 col-lg-2 h-100 d-none d-lg-flex align-items-center'}>
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

                    <div className={'px-0 px-sm-3 col-7 col-sm-7 col-lg-7 d-flex align-items-center h-75'}>
                        <div className={styles.headerCatalog}>
                            <button className={styles.catalogBtn}
                                onClick={()=> {
                                        catalogOpener ? catalogOpener() : null

                                    }
                                }
                            >
                                <div className={styles.catalogBtn_img}>
                                    <Image
                                        src={'/Header/catalog_btn.svg'}
                                        alt={'ISTCatalog button'}
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

                                   onClick={()=> {
                                       searchOpener ? searchOpener() : null

                                   }}
                            />
                        </div>
                    </div>

                    {/*NAVIGATION*/}

                    <div className={'px-2 px-sm-3 col-3 col-sm-3 d-flex h-75 align-items-center justify-content-end'}>
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