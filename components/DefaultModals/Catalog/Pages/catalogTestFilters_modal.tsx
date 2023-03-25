import React, {FC} from 'react';
import ICheckBoxList from "../../../UI/ISTFiltersList/ICheckBoxList";

const CatalogTestFiltersModal:FC = () => {
    return (
        <>
            <div
                style={{
                    width: "350px",
                    height: "450px"
                }}
            >
                <ICheckBoxList title={"FILTER TEST"} isOpened={true} fields={[
                    {isActive: false, fieldName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ", checkBox: true},
                    {isActive: false, fieldName: "Field 2", checkBox: true},
                    {isActive: false, fieldName: "Field 3", checkBox: true},
                    {isActive: false, fieldName: "Field 4", checkBox: true},
                ]}/>

                <ICheckBoxList title={"FILTER TEST"} isOpened={true} fields={[
                    {isActive: false, fieldName: "Field 1", checkBox: true},
                    {isActive: false, fieldName: "Field 2", checkBox: true},
                    {isActive: false, fieldName: "Field 3", checkBox: true},
                    {isActive: false, fieldName: "Field 4", checkBox: true},
                ]}/>

            </div>
        </>
    );
};

export default CatalogTestFiltersModal;