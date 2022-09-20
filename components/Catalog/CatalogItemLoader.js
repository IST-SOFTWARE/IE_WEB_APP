import { useEffect, useState} from "react";
import styles from "../../styles/Catalog.module.css"
import AsyncDelay from "../../helpers/debounce";

export default function CatalogItemLoader(props){

    let index = 0;

    const {LoadersNum, Loaded, delay} = props;
    const[LNum,setLNum] = useState(15);
    useEffect(()=>{
        if(LoadersNum !== undefined){
            setLNum(LoadersNum);
        }
        index = 0;
    },[])



    const itemLoader = () => {

        return(
            <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7"  key={index++}>
                <div className={styles.CatalogItemLoader}>
                    <div className={styles.loadinGradient}></div>
                </div>
            </div>
        )
    }

    return !Loaded ? (
        <>
            <div className="
                row
                d-flex
                justify-content-sm-center
                justify-content-md-start">

                {
                    [...Array(LNum)].map(async(i, val) => {


                    })
                }
            </div>
                                       
        </>
    ):
    ""
}