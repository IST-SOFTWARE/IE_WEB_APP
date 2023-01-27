import React, {CSSProperties, FC} from 'react';
import styles from "./ISTComment.module.scss"
import Image from "next/image";
import {cstmStyles} from "../common";
import {reviewItem} from "../../../Apollo/Queries/landingPages/feedbackPage/getFB_Reviews";


type styleProps = Pick<CSSProperties,
    "margin" | "marginRight" | "marginLeft" | "marginTop" | "marginBottom">




interface ISTComment{
    name: string,
    rate: string,
    comment: string,
    category: string,

    customAdaptiveStyles?: cstmStyles,

    style?: styleProps;
}



const ISTComment:FC<ISTComment> = (
    {
        name,
        rate,
        comment,
        category,
        style,
        customAdaptiveStyles,
    }) => {

    return(
        <>
            <div className={`${styles.comment_container} ${customAdaptiveStyles?.comment_container}`}
                style={style}
            >
                <div className={`${styles.comment_header} ${customAdaptiveStyles?.comment_header}`}>
                    <div className={`${styles.name} ${customAdaptiveStyles?.name}`}>{name}</div>
                    <div className={`${styles.category} ${customAdaptiveStyles?.category}`}>{category}</div>
                    <div className={`${styles.rate_container} ${customAdaptiveStyles?.rate_container}`}>
                        <div className={`${styles.comment_rate} ${customAdaptiveStyles?.comment_rate}`}>
                            <Image
                                src={rate}
                                alt={"FeedBack_Reaction_image"}
                                fill={true}
                            />
                        </div>
                    </div>
                </div>

                <div className={`${styles.comment} ${customAdaptiveStyles?.comment}`}>
                    {comment}
                </div>

                <div className={`${styles.rFull_link} ${customAdaptiveStyles?.rFull_link}`}>
                    <a>Read full</a>
                </div>
            </div>
        </>
    )
}

// Print all comments

export function printComments(
        data: Array<reviewItem>,
        uniqueKeyDesignation: string,
        customAdaptiveStyles?: cstmStyles,
        listWrapperClassName?: string,
        everyItemWrapperClassName?: string,
        componentInnerStyles?: styleProps
){
    function getOutComment(el:reviewItem, i:number){
        return(
            <ISTComment
                key={`fb_page_review_item_${i}_${uniqueKeyDesignation}`}
                name={el?.name ?? "John Doe"}
                rate={el?.rating_src ?? ""}

                comment={el?.message ?? "Lorem ipsum dolor sit amet, " +
                    "consectetur adipiscing elit. Nullam elementum ac " +
                    "nunc ultricies luctus. Aenean nec tempor justo. "
                }

                category={el?.category ?? "Category get err"}
                style={componentInnerStyles ?? {}}
                customAdaptiveStyles={customAdaptiveStyles ?? null}
            />
        )
    }

    return(
        <div className={`${listWrapperClassName ?? ""}`}>
            {data?.map((el, i)=>{
               if(!everyItemWrapperClassName)
                   return(getOutComment(el, i))
               else
                   return(
                       <div className={everyItemWrapperClassName}>
                           {getOutComment(el,i)}
                       </div>
                   )
            })}
        </div>
    )
}

//

export default ISTComment;