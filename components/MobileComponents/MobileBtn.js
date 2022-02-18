import { useState } from "react"

export default function MobileBtn({PUsetter}){

    return(
        <>
            <div className="MobileBtn">
                <button onClick={()=>PUsetter(true)}>
                    Заказать звонок
                </button>
            </div>
        </>
    )
}