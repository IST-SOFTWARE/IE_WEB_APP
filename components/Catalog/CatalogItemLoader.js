import { useEffect, useState} from "react";
import styles from "../../styles/Catalog.module.css"

export default function CatalogItemLoader(props){
    const {LoadersNum, Loaded} = props;
    const[LNum,setLNum] = useState(15);
    useEffect(()=>{
        if(LoadersNum !== undefined){
            setLNum(LoadersNum);
        }
    },[])


    return !Loaded ? (
        <>
            <div className="
                row
                d-flex
                justify-content-sm-center
                justify-content-md-start"> 
                    {[...Array(LNum)].map(i =>
                        <div className="mb-4 p-0 col-xxl-3 col-xl-3 col-md-5 col-sm-7 col-7"  key={i}>
                            <div className={styles.CatalogItemLoader}>
                                <div className={styles.loadinGradient}></div>
                            </div>
                        </div> 
                    )}
            </div>
                                       
        </>
    ):
    ""
}