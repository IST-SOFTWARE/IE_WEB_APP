import React, {CSSProperties, FC} from 'react';
import styles from "./ISTComment.module.scss"
import Image from "next/image";


type styleProps = Pick<CSSProperties,
    "margin" | "marginRight" | "marginLeft" | "marginTop" | "marginBottom">


interface ISTComment{
    name: string,
    rate: string,
    comment: string,
    category: string,

    style?: styleProps;
}



const IstComment:FC<ISTComment> = (
    {
        name,
        rate,
        comment,
        category,
        style,
    }) => {

    return(
        <>
            <div className={styles.comment_container}
                style={style}
            >
                <div className={styles.comment_header}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.category}>{category}</div>
                    <div className={styles.rate_container}>
                        <div className={styles.comment_rate}>
                            <Image
                                src={rate}
                                alt={"FeedBack_Reaction_image"}
                                fill={true}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.comment}>
                    {comment}
                </div>

                <div className={styles.rFull_link}>
                    <a>Read full</a>
                </div>
            </div>
        </>
    )
}

export default IstComment;