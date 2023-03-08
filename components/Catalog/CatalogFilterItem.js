import styles from "../../styles/ModalComponents/CatalogFilter.module.css"
import IST_CheckBox from "../IST_CheckBox"

import { SetAvailability_BP } from "./Reducer/boilerplates";
import { SetAvailabilityGenerator } from "./Reducer/actions";

import { useState, useEffect, useRef, useCallback } from "react"

export default function CatalogFilterItem({isChecBox, list, label, boilerplate, filterUpdater, CatalogReducer}){

    const[itemLabel, setLabel] = useState(label);
    const[FiltersLoaded, setFiltersLoaded] = useState(false);

    const[filterValuesList, setValuesList] = useState([]);
    const[filters, setFilters] = useState([]);
    const[boolFilter, setBoolFilter] = useState(false);


    const stateUpdater = useCallback((bp, state) =>{
        const newState = {
            bp,
            state
        }
        return newState;
    },[filters, boolFilter])


    useEffect(()=>{
        if(isChecBox && boilerplate && boilerplate !== null){
            const newState = stateUpdater(boilerplate, boolFilter);
            filterUpdater(newState);
        }
    },[boolFilter])

    useEffect(()=>{
        if(boilerplate && boilerplate !== null && filters && !isChecBox){
            const newState = stateUpdater(boilerplate, filters);
            filterUpdater(newState);
        }
    },[filters])

    function compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
    }

    function addFilterToList(elem){
        const filtersList = Array.from(filters);
        const fullList = Array.from(filterValuesList);
        filtersList.push(elem);

        fullList.map((item,i) => {
            if(elem.id === item.id)
                fullList.splice(i, 1);
        })


        fullList.sort(compareValues('id'))
        setFilters(filtersList);
        setValuesList(fullList);
    }


    function removeFilterFromList(elem){
        const filtersList = Array.from(filters);
        const fullList = Array.from(filterValuesList);
        fullList.push(elem);

        filtersList.map((item,i) => {
            if(elem.id === item.id)
            filtersList.splice(i, 1);
        })
  
        fullList.sort(compareValues('id'))
        setFilters(filtersList);
        setValuesList(fullList);
    }




    function FilterViewer(elem){
        let item = Object.assign({}, elem);
        if(Object.keys(item).includes("id"))
             delete item.id

        return item;
    }


    function handleClick(){

        const clickedAdder = document.getElementById((label ? label : "") + "_addBtn");
        const clickedBlock = document.getElementById((label ? label : "") + "_dropList");
        let allLists = document.querySelectorAll(`.${styles.FilterValuesList}`);
        let allBtns = document.querySelectorAll(`.${styles.addFilterParam}`);


        //hide all lists 
        allLists.forEach(elem => {
            if(elem.classList.contains(`${styles.active}`) && elem !== clickedBlock)
                elem.classList.remove(`${styles.active}`);
        })

        //unactive all btns 
        allBtns.forEach(elem => {
            if(elem.classList.contains(`${styles.active}`) && elem !== clickedAdder)
                elem.classList.remove(`${styles.active}`);
        })

        //show/hide list
        if(clickedBlock.classList.contains(`${styles.active}`)){
            clickedBlock.classList.remove(`${styles.active}`);
        }
        else{
            clickedBlock.classList.add(`${styles.active}`);
        }

        //active/disactive btn
        if(clickedAdder.classList.contains(`${styles.active}`)){
            clickedAdder.classList.remove(`${styles.active}`);
        }
        else{
            clickedAdder.classList.add(`${styles.active}`);
        }

    }


    function ListsHider(event){
        let allLists = document.querySelectorAll(`.${styles.FilterValuesList}`);
        let allBtns = document.querySelectorAll(`.${styles.addFilterParam}`);
        if(
            (!event.target.classList.contains(`${styles.addFilterParam}`))&&
            (!event.target.classList.contains(`${styles.ListItems}`))&&
            (!event.target.classList.contains(`${styles.FilterValuesList}`))&&
            (!event.target.classList.contains(`FilterValuesList_UL`))
            
        ){
            allLists.forEach(elem => {
                if(elem.classList.contains(`${styles.active}`))
                    elem.classList.remove(`${styles.active}`);
            })

            allBtns.forEach(elem => {
                if(elem.classList.contains(`${styles.active}`))
                    elem.classList.remove(`${styles.active}`);
            })
        }
    }

    useEffect(()=>{ 
        window.addEventListener("click", ListsHider);
        return () => {
            window.removeEventListener("click", ListsHider);
          };
    },[])


    const filterNewLoadUpdater = (catalogReducer, bp, filterValues) => {
        if(catalogReducer && bp){
            const loadedFilters = catalogReducer[bp];

            const filtersList = Array.from(filters);
            const fullList = Array.from(filterValuesList);
           

            if(loadedFilters.length > 0){
                loadedFilters.map(elem => {
                    filtersList.push(elem);
                    fullList.map((item,i) => {
                        if(elem.id === item.id)
                            fullList.splice(i, 1);
                    })
                })
         
            } 
            
            fullList.sort(compareValues('id'))
            setFilters(filtersList);
            setValuesList(fullList);
                    
        }
    }


    useEffect(() =>{
            if(list){
                const itemsList = Object.values(list)[0];
                const sortList = itemsList.sort(compareValues('id'));
                setValuesList(sortList);
                setFiltersLoaded(true);
            }
    },[])

    useEffect(()=>{
        if(FiltersLoaded){
            filterNewLoadUpdater(CatalogReducer, boilerplate, filterValuesList)
        }
    },[FiltersLoaded])

    

    // useEffect(()=>{
    //     if(CatalogReducer && boilerplate && isInitialMount.current){
    //         const loadedFilters = CatalogReducer[boilerplate];
    //         // console.log("loadedFilters", loadedFilters);
    //         // console.log("filterValuesList", filterValuesList);

    //         // console.log("filters",`[${boilerplate}]`, filters);
    //         // console.log("filterValuesList", filterValuesList);

    //         if(loadedFilters.length > 0){
    //             loadedFilters.map(elem => {
    //                 console.log(elem);
    //             })
    //             console.log(filterValuesList);

    //             // const filtersList = Array.from(filters);
    //             // loadedFilters.map(elem => {
    //             //     filtersList.push(elem);
            
    //             //     filterValuesList.map((item,i) => {
    //             //         if(elem.id === item.id)
    //             //         filterValuesList.splice(i, 1);
    //             //     })
            
    //             //     filterValuesList.sort(compareValues('id'))
    //             //     setFilters(filtersList);
    //             // });
                
    //         } 
    //         // isInitialMount.current = false;
    //     }

    // },[])

    useEffect(()=>{
        if(isChecBox && CatalogReducer && boilerplate){
            const loadedFilters = CatalogReducer[boilerplate];
            if(loadedFilters !== undefined)
                setBoolFilter(loadedFilters);
        }
    },[])


    const checkTypeItem = () =>{
        return(
            <>
                <div className={styles.CheckBoxSpace}>
                    <IST_CheckBox feedback={setBoolFilter} state={boolFilter}/>
                </div>
            </>
        )
    }

    const listTypeItem = () =>{
        return(
            <>
                <div className={styles.selectedFilters}>
                    {filters && filters.length > 0 ? (
                        filters.map((elem, i) =>{
                            if(i <= 1)
                                return  <p onClick={()=>removeFilterFromList(elem)}>
                                            {Object.values(FilterViewer(elem))}
                                        </p>
                            else
                                null
                        })
                    )
                    : null}
                    {filters && filters.length >= 3 ? (
                        <a>...</a>
                    ) : null}
                </div>

               <button className={styles.addFilterParam}
               onClick={(e)=>handleClick(e)} id={(label ? label : "") + "_addBtn"}/>

               <div className={styles.FilterValuesList} id={(label ? label : "") + "_dropList"}>
                   <ul className="FilterValuesList_UL">
                    {filters && filters.length > 0 ? 
                        filters.map((elem, i)=>{
                            return(
                                <li key={(i + 1) * 1000}
                                className={styles.ListItems + " " + styles.selected}
                                onClick={()=>removeFilterFromList(elem)}>
                                {Object.values(FilterViewer(elem))}
                                <button/>
                            </li>
                            )
                        })
                    : null}
                    {
                        filterValuesList.map((elem, i) => {
                            // console.log(elem);
                            return(
                            <li key={(i + 1) + 1000}
                            className={styles.ListItems}
                            onClick={()=>addFilterToList(elem)}>
                                {Object.values(FilterViewer(elem))}
                            </li>
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