import React, {FC, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setRegion} from "../../../store/slices/regionSlice/regionSlice";

interface regionHandler{
    baseRegion: string
}

const RegionHandler:FC<regionHandler> = ({
    baseRegion
}) => {

    const chRegion = useDispatch();

    // useEffect(()=>{
    //     chRegion(setRegion(baseRegion));
    // },[])

    return(
        <>
        </>
    )
}

export default RegionHandler;