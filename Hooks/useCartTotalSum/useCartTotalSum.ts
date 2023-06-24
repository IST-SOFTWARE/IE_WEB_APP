import {ICartTotalSum, ICartTotalSum_prodsInf} from "./ICartTotalSum";
import {useCallback, useEffect, useState} from "react";
import {IProductData} from "../../components/UI/common";

export const useCartTotalSum = ({
    cartSelector,
    getProductByIdQuery_func,
}: ICartTotalSum) => {

    const[loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ICartTotalSum_prodsInf[]>();

   const getItemsInfo = useCallback(():ICartTotalSum_prodsInf[] =>{
       if(!getProductByIdQuery_func || !cartSelector)
           return

       const prodsInfo:ICartTotalSum_prodsInf[] = [];

       let result = cartSelector.map( async (cart_sel_id, idx) => {
           return await getProductByIdQuery_func(cart_sel_id)
            .catch((ex) => console.warn(ex));
        })

       // Promise.all(result).then<IProductData[]>((prom) => {
       //    if(!prom || prom.length <= 0) return
       //
       //     prom.map((item)=>{
       //
       //     })
       //
       // })


   },[cartSelector])

    useEffect(()=>{
        console.log("UE OUT DATA: ", data);
    },[data])

    // function urlToBase64(url) {
    //     return new Promise((resolve, reject) => {
    //         request.get(url, function (error, response, body) {
    //             if (!error && response.statusCode == 200) {
    //                 resolve("data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64'));
    //             } else {
    //                 reject(response);
    //             }
    //         });
    //     })
    // }

// // Map input data to an Array of Promises
//     let promises = input.map(element => {
//         return urlToBase64(element.image)
//             .then(base64 => {
//                 element.base64Data = base64;
//                 return element;
//             })
//     });
//
// // Wait for all Promises to complete
//     Promise.all(promises)
//         .then(results => {
//             // Handle results
//         })
//         .catch(e => {
//             console.error(e);
//         })

   return{
       getItemsInfo,
       loading
   }

}