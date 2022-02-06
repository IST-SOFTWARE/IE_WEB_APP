import { useState } from "react"

export default function InfoOfDev({header, text}){

    const [visible, setVisible] = useState("0");

    return(
        <>
            <div className="devInfHelper">
                <button onClick={()=>{setVisible("1")}}>
                    i
                </button>
            </div>

            <div className="InfoOfDev">
                <div className="iod_header">
                    <h1>
                    {header} 
                    </h1>
                    <button onClick={()=>{setVisible("0")}}>
                        <img src="/iod_closer.svg" width="100%"/>
                    </button>
                </div>
                <div className="InfoOfDev_content">
                    <p>
                        {text}
                    </p>
                </div>
                <a href="https://trello.com/b/tyDWCp9I/elevator" target="_blank" rel="noopener noreferrer">
                    Перейти на Trello
                </a>
            </div>

            <style jsx global>{`
              .InfoOfDev{
                  transform: scale(${visible});
              }  
            `}</style>
        </>
    )
}