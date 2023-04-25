import React, {FC, useEffect, useRef, useState} from 'react';
import useWindowDimensions from "../../../Hooks/useWindowsDimensions";
import styles from "../../../styles/PageTracker/pageTracker.module.scss"
import {useAppSelector} from "../../../Hooks/reduxSettings";
import TrackerPoint from "./trackerPoint";
import {IScrollSpyState} from "../data/scrollSpy";


interface IScrollTracker{
    state: IScrollSpyState,
}

const PageTracker:FC<IScrollTracker> = ({
        state
    }) => {

    return(
        <>
                {state ? state.positions.map((elem, i) => {
                    return(
                            <TrackerPoint
                                index={i+1}
                                isActual={elem === state.actualPosition}
                                key={`${i}_scrollPoint`}
                                scrollTo={elem.y}
                                content={elem.tag}
                                // actualInterval={actualInterval}

                            />
                    )
                }) : null}

        </>
    )
}

export default PageTracker;