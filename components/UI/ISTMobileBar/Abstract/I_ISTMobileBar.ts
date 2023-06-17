import {commonStyles, mobileTrigger_size} from "../../common";

type IISTMobileBar_button = {
    isActive: boolean,
    image: string,
    title: string,
    action: (...props:any) => any;
}

export interface IISTMobileBar{
    /**
     * Max length: 4 buttons. Other items will not be displayed
     */
    buttons: IISTMobileBar_button[],

    style: commonStyles,
    mobileTriggerSize: mobileTrigger_size
}