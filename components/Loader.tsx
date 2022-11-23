import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {loader} from "next/dist/build/webpack/config/helpers";

interface ILoader{
    children: React.ReactNode | React.ReactChild,
    state: boolean
}


const Loader: FC<ILoader> =
    ({
        children,
        state
     }) => {

        const [isLoading, setIsLoading] = useState<boolean>(true);
        const [prevState, setPrevSate] = useState<boolean>(true);

        const contentPage = useRef(null);
        const loaderPage = useRef(null);

        const willChangeProp = (boolAction: boolean, obj, prop):void => {
            if(boolAction)
                obj.style.willChange = prop;
            else
                obj.style.willChange = "auto";
        }

        const startLoad = async(state: boolean, stateSetter?: React.Dispatch<boolean>):Promise<any>=>{

            const timeOutInMs: number = 500;

            async function timeOut(ms){
                return new Promise(
                    resolve => setTimeout(resolve, ms));
            }

            if(state){
                await timeOut(timeOutInMs).then(
                    to => {
                        console.log("LOADING...");
                        stateSetter(true);
                    }
                );
            }

            if(!state)
                await timeOut(timeOutInMs).then(
                    to => {
                        stateSetter(false);
                    }
                );

        }



        // @ts-ignore
        useEffect(()=>{
            let isSubscribed = true;

            const loaderFnc = async() =>{
                startLoad(state, setIsLoading);
            }

            loaderFnc().catch(
                console.warn
            )


            return () => isSubscribed = false;
        },[state]);



        useEffect(()=>{
            if(isLoading === false && contentPage && loaderPage){

                contentPage.current.classList.add("active");
                loaderPage.current.classList.add("active");
            }


        },[contentPage, loaderPage, isLoading])

        return (
            <>
                <div className={"content_loader"} ref={loaderPage}>
                    <h1>LOADING</h1>
                </div>
                <div className={"loaded_content"} ref={contentPage}>
                    {!isLoading ? children : null}
                </div>
            </>


        )
    }

export default Loader;