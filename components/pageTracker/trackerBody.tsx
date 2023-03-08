import React, {FC, useEffect, useState} from 'react';
import useWindowDimensions from "../../Hooks/useWindowsDimensions";
import styles from "../../styles/PageTracker/pageTracker.module.scss"

interface ITrackerBody{
    children: React.ReactNode,
}

const TrackerBody:FC<ITrackerBody> = ({
    children
    }) => {
        return(
            <>
                <div className={styles.trackerBody}>
                    {children}
                </div>
            </>
        )
}

export default TrackerBody;