import styles from "../../../styles/OurPartners/ourPartnersParticles.module.css";
import {FC, useCallback, useEffect, useRef, useState} from "react";
import React from 'react';

export enum alignVariant{
    start = 'start',
    center = 'center',
    end = 'end'
}


interface RowsProperties{
    screenSize: number,
    objectsInRow: number,
    rowsNum: number
}

interface PartnersList{
    rowsProperties?: RowsProperties[],
    children?: React.ReactChild | React.ReactNode,
    horizontalAlign?: alignVariant,
    verticalAlign?: alignVariant,
}

const PartnersList: FC<PartnersList> =
        ({
            children,
            rowsProperties,
            horizontalAlign,
            verticalAlign,
        }) => {

    const[objInPage, setObjInPage] = useState(null);
    const[pages, setPages] = useState(null);

    const[childSize, setChildSize] = useState(100);

    const[screenSize, setScreenSize] = useState(0);
    const[styleOption, setStyleOption] = useState<RowsProperties>(null);

    const[ListOfElems, setListOfElems] = useState(null);
    const[pagedElems, setPagedElems] = useState([]);
    const[actPage, setActPage] = useState(1);
    const[outElems, setOutElems] = useState([]);



    const listBlock = useRef(null);
    const pointersBlock = useRef(null);

    const handleUserResize = useCallback(event => {
        const screenSize = window.innerWidth;
        setScreenSize(screenSize);
    }, []);

    useEffect(()=>{
        window.addEventListener("resize", handleUserResize);
        return () => {
            window.removeEventListener("resize", handleUserResize);
        };
    },[handleUserResize]);


    useEffect(()=>{
        handleUserResize(null);

    },[])

    useEffect(()=>{
        if(children)
            setListOfElems(children);
    },[children])


    useEffect(()=>{
        if(styleOption && ListOfElems && listBlock){
            const objInPage = styleOption.rowsNum * styleOption.objectsInRow;
            const pagesNum = Math.ceil(ListOfElems.length / objInPage);

            setPages(pagesNum);
            setObjInPage(objInPage);

            const ListSize = listBlock.current.offsetWidth;
            const childSize = Math.floor(ListSize / styleOption.objectsInRow) - 10;

            setChildSize(childSize);
        }
    },[styleOption, ListOfElems, listBlock])


    useEffect(()=>{
        if(pages && objInPage &&
                Array.isArray(ListOfElems)){
            const finishList = [];

            let spliceIndex = 0;
            for(let i = 0; i < pages; i++){
                const elemsList = Array.from(ListOfElems);
                const buffArr = elemsList.splice(spliceIndex, objInPage);
                finishList.push(buffArr);
                spliceIndex += objInPage;
            }

            setPagedElems(finishList);
            setActPage(0);
        }
    },[ListOfElems, pages, objInPage])


    useEffect(()=>{
        setOutElems(pagedElems[actPage]);
    },[actPage, pagedElems])


    useEffect(()=>{
        if(rowsProperties && rowsProperties.length > 0){
            rowsProperties.sort(
                (a, b) =>
                    (a.screenSize > b.screenSize) ? 1 : -1)

            rowsProperties.map((style)=>{
                if(style.screenSize <= screenSize){
                    setStyleOption(style);
                }
            })
        }
    }, [screenSize])

    useEffect(()=>{
        if(styleOption && childSize > 0  && listBlock){
            const rowsNum = styleOption.rowsNum;
            listBlock.current.style.minHeight =
                (childSize * rowsNum) + 20 + "px";
        }
    },[childSize, styleOption, listBlock]);


        return (
        <>
            <div className={styles.partnersList_block}>
                <div className={styles.partnersList} ref={listBlock}>
                    {outElems ? outElems.map((elem, index)=> (
                            <div style={{
                                overflow: 'hidden',
                                borderRadius: "15%",
                                display: 'flex',
                                alignItems: verticalAlign ? verticalAlign : "start",
                                justifyContent: horizontalAlign ? horizontalAlign : "start",

                                width: childSize,
                                height: childSize,

                                background: '#2C3641',

                                margin: "5px"
                            }} key={index}>
                                {elem}
                            </div>
                        )
                    ) : null}
                </div>

                <div className={styles.listPointer} ref={pointersBlock}>
                    {pagedElems && pagedElems.length > 1 ? pagedElems.map((elem, index) =>
                        {
                            if(index === actPage) {
                                return  <div className={styles.pointerBody}
                                            style={{
                                              width: pointersBlock.current.offsetWidth/
                                                  pagedElems.length
                                            }}>

                                            <div key={index}
                                                className={styles.pointer + " " + styles.active}
                                            />

                                        </div>
                            }

                            else
                                return  <div className={styles.pointerBody}
                                             style={{
                                                 width: pointersBlock.current.offsetWidth/
                                                     pagedElems.length
                                             }}
                                             onMouseOver={()=>{setActPage(index)}}
                                             onClick={()=>{setActPage(index)}}
                                        >

                                            <div key={index} className={styles.pointer}/>

                                        </div>
                        }
                    ) : null}
                </div>

            </div>
        </>
    );
}

export default PartnersList;

