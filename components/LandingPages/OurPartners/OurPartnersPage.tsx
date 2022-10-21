import styles from '../../../styles/OurPartners/ourPartnersPage.module.css'
import MainLabel from "../../MainLabel";
import LabelLoader from "../../ModalComponents/LabelLoader";
import PartnerItem from "./PartnerItem";
import PartnersList, {alignVariant} from "./PartnersList";
import {useEffect, useState} from "react";



type partnerData = {
    title: string,
    image_url: string;
    partner_url: string;
}

type partnerPageData = {
    Title: string,
    Title_Ru: string,
}

class partnersPage{
    pageData : partnerPageData;
    partnersList: partnerData[];

    constructor({});
    constructor(data: any) {
        const _partnersList = Array<partnerData>();
        const _partnerPageData: partnerPageData = {
            Title: data.Title,
            Title_Ru: data.Title_Ru
        }

        if(data?.partners_list
            && data?.partners_list.length > 0){

            data.partners_list.map(elem=>{
               const partner =
                   elem["Partners_id"] ?
                       elem["Partners_id"]: null;
                if(partner){
                    const _partner: partnerData = {
                        title: partner.title,
                        partner_url: partner.partner_url,
                        image_url: partner.image_url
                    }
                    _partnersList.push(_partner);
                }
            });
        }

        this.partnersList = _partnersList;
        this.pageData = _partnerPageData;

    }

}


export default function OurPartnersPage({content}){

    const[pageData, setPageData] = useState<partnersPage>(
        new partnersPage({})
    );

    const[pageTitle, setPageTitle] = useState();
    const[partnersList, setPartnersList] = useState();

    useEffect(()=>{
        if(content) {
            if(content){
                const pageData = new partnersPage(content);
                setPageData(pageData);
            }
        }
    },[content])


    return(
        <>
            <div className={styles.ourPartnersPage}>
                <div className={styles.ourPartnersPage_mainLabel}>
                    <div className={"row"}>
                        <div className={"col-md-8"}>
                            <MainLabel padding="130px" >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                {/*<LabelLoader LoadSizeInSymbols={30} field={"Title_Ru"} data={pdPageData}/>*/}
                            </MainLabel>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-md-9"}>
                            <PartnersList rowsProperties={[
                                        {objectsInRow: 4, rowsNum: 2, screenSize: 950},
                                        {objectsInRow: 2, rowsNum: 3, screenSize: 250}
                                    ]}
                                    horizontalAlign={alignVariant.center}
                                    verticalAlign={alignVariant.center}
                            >
                                {pageData.partnersList.map((elem, index) => (
                                    <PartnerItem image={elem.image_url}
                                                 item_tile={elem.title}
                                                 item_url={elem.partner_url}
                                                 key={index}/>
                                ))}
                            </PartnersList>
                        </div>
                        <div className={"col-md-6"}>
                            <div className={styles.PartnersJoinBlock}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}