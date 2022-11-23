import React, {FC, Ref} from 'react';
import PhoneInput from "react-phone-number-input/input";
import styles from "../../../styles/UI/IstInput.module.scss"
export enum inputTypesVars {
    any_string = "any_string",
    phone = "phone_num",
}


interface IIstInput{
    inputType: inputTypesVars,
    placeholder: string,
    required: boolean,
    outDataSetter: React.Dispatch<string>,
    actualData: string,
}


const IstInput = React.forwardRef<HTMLInputElement, IIstInput>((
                    props: IIstInput,
                    ref: Ref<HTMLInputElement>
                    ) => {
        return (
            <div className={`${styles.inputForm} afterBlock_ISTInput`}>
                {props.inputType === inputTypesVars.any_string ? (
                    <input type="text" placeholder={props.placeholder}
                           ref={ref}
                           onChange={(e) => props.outDataSetter(e.target.value)}
                           value={props.actualData}
                           required = {props.required}
                    />
                ) : (
                    <PhoneInput type="text"
                                placeholder={props.placeholder}
                                ref={ref}
                                required = {props.required}
                                onChange={props.outDataSetter}
                                value={props.actualData}
                    />
                )}

            </div>
        )
});


IstInput.displayName = "IstInput";
export default IstInput;