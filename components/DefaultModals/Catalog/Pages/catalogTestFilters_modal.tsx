import React, {FC, useState} from 'react';
import ISTFiltersList from "../../../UI/ISTFiltersList/components/ISTFiltersList";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ISTFiltersWrapper from "../../../UI/ISTFiltersList/components/ISTFiltersWrapper";
import useISTFiltersList from "../../../UI/ISTFiltersList/hook/useISTFiltersList";

const CatalogTestFiltersModal:FC = () => {

    const [firstActives, setFirstActives] = useState<boolean>(false)
    const [firstFilter, firstActive] = useISTFiltersList()

    return (
        <>
            <div
                style={{
                    width: "350px",
                    height: "450px"
                }}
            >
                <ISTFiltersWrapper
                    title={"FILTER TEST"}
                    isOpened={true}
                    hasActives={firstActive}
                    mobileSettings={{
                        type: "transfer",
                        mobileSizeTrigger: "LG_992"
                    }}
                >

                    <ISTFiltersList fields={[
                        {isActive: false, fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
                            isCheckBox: true},
                        {isActive: false, fieldName: "Field 2", isCheckBox: true},
                        {isActive: false, fieldName: "Field 3", isCheckBox: true},
                        {isActive: false, fieldName: "Field 4", isCheckBox: true},
                        ]}

                        hookedData={firstFilter}
                    />

                </ISTFiltersWrapper>
            </div>
        </>

    );
};

export default CatalogTestFiltersModal;