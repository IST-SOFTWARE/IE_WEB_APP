import {modalStater} from "../../../ISTModals/modalSetter";
import {ReactNode} from "react";

export interface ICatalogWrapper {
    data?: modalStater;
    searching?: boolean;
    children: ReactNode;
}

export interface ICatalogWrapperMobile extends
    Pick<ICatalogWrapper, "children"> {}


export interface mobileBar {
    search: {
        action: (...props: any) => any;
    };
    filters: {
        action: (...props: any) => any;
        state: boolean;
    };
    cart: {
        action: (...props: any) => any;
        state: boolean;
    };
    inputOptions: {
        state: boolean;
        onBlur: (...props: any) => any;
    };
}