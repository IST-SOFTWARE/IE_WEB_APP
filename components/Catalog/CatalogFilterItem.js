import styles from "../../styles/ModalComponents/CatalogFilter.module.css"
import IST_CheckBox from "../IST_CheckBox"
import { useState, useEffect, useReducer } from "react"

export default function CatalogFilterItem({isChecBox, state, list, label, filtered}){

    const[itemLabel, setLabel] = useState(label);
    const[filterValuesList, setValuesList] = useState([]);
    const[menuState, toggleMenu] = useState(false);


    const labelDescriptor = {
        Manufacturers: "Производитель",
        Types: "Тип",
        Units: "Узел"
    } 

    useEffect(()=>{
        if(itemLabel.toString().match(/[MFG][Manufacture]/gi) !== null)
            setLabel(labelDescriptor.Manufacturers)

        if(itemLabel.toString().match(/type/gi) !== null)
            setLabel(labelDescriptor.Types)

        if(itemLabel.toString().match(/Unit/gi) !== null)
            setLabel(labelDescriptor.Units)
    },[])

    useEffect(() =>{
        if(list){
            const itemsList = Object.values(list)[0];
            // itemsList.map(item => {
            //     if(Object.keys(item).includes("id")){
            //         delete item.id
            //     }
            // })
            setValuesList(itemsList);
        }
    },[])

    function FilterViewer(elem){
        let item = elem;
        if(Object.keys(item).includes("id"))
             delete item.id
        
        return item;
    }

    // useEffect(() =>{
    //     console.log(filterValuesList);
    // },[filterValuesList])

    function handleClick(){

        const clickedBlock = document.getElementById((label ? label : "") + "_dropList");
        let allLists = document.querySelectorAll(`.${styles.FilterValuesList}`);

        allLists.forEach(elem => {
            if(elem.classList.contains(`${styles.active}`) && elem !== clickedBlock)
                elem.classList.remove(`${styles.active}`);
        })
        

        if(clickedBlock.classList.contains(`${styles.active}`))
            clickedBlock.classList.remove(`${styles.active}`);
        else
            clickedBlock.classList.add(`${styles.active}`);

    }

    const checkTypeItem = () =>{
        return(
            <>
                <IST_CheckBox/>
            </>
        )
    }

    const listTypeItem = () =>{
        return(
            <>
               <button className={styles.addFilterParam}
               onClick={(e)=>handleClick(e)}/>

               <div className={styles.FilterValuesList} id={(label ? label : "") + "_dropList"}>
                   <ul>{
                        
                        filterValuesList.map((elem, i) => {
                            return(
                            <li key={i}>{Object.values(FilterViewer(elem))}</li>
                            )
                        })
                        
                    }
                    </ul>
                
                </div>
            </>
        )
    }
    


    return(
        <>
            <div className={styles.filterItemContainer}>
                <p>{itemLabel}:</p>
                {isChecBox ?
                checkTypeItem()
                : 
                listTypeItem()
                }
            </div>
        </>
    )
}