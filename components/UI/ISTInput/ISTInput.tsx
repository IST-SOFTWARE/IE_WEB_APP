import React, {CSSProperties, FC, Ref} from 'react';
import PhoneInput from "react-phone-number-input/input";
import styles from "./input.module.scss"
import common_styles from "../common.module.scss"
import {commonStyles} from "../common";

export enum inputTypesVars {
    any_string = "any_string",
    phone = "phone_num",
}



const defaultStyles = {
    borderRadius: "89px",
    height: "55px"
} as commonStyles

interface IIstInput{
    title?: string,
    inputCaption?: string,
    inputType: inputTypesVars,
    placeholder: string,
    required: boolean,
    outDataSetter: React.Dispatch<string>,
    actualData: string,

    style: commonStyles
}


const IstInput = React.forwardRef<HTMLInputElement, IIstInput>((
                    props: IIstInput,
                    ref: Ref<HTMLInputElement>
                    ) => {
        return (
            <div className={`${styles.inputForm} afterBlock_ISTInput`}>
                <div className={common_styles.title}>
                    {props.title}
                </div>

                <div className={common_styles.caption}>
                    {props.inputCaption}
                </div>

                {props.inputType === inputTypesVars.any_string ? (
                    <input type="text" placeholder={props.placeholder}
                           ref={ref}
                           onChange={(e) => props.outDataSetter(e.target.value)}
                           value={props.actualData}
                           required = {props.required}

                           style={props.style ?? {...defaultStyles}}
                           className={`${common_styles.hover_action} ${common_styles.focus_action}`}
                    />
                ) : (
                    <PhoneInput type="text"
                                placeholder={props.placeholder}
                                ref={ref}
                                required = {props.required}
                                onChange={props.outDataSetter}
                                value={props.actualData}

                                style={props.style ?? {...defaultStyles}}
                                className={`${common_styles.hover_action} ${common_styles.focus_action}`}
                    />
                )}



            </div>
        )
});


IstInput.displayName = "IstInput";
export default IstInput;