import styles from "../../../styles/OurPartners/ourPartnersParticles.module.scss"
import NextImageRatioSaver from "../../NextImageRatioSaver";
import {useCallback, useEffect, useState} from "react";
import Image from "next/image";


export default function PartnerItem({image, item_tile, item_url}){

    return(
        <>
            <div className={styles.partnerItemBody}>
                <Image
                    src={image ? image : null}
                    alt = {item_tile ? item_tile : null}
                    fill
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>
        </>
    )
}