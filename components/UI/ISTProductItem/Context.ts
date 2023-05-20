import {createContext} from "react";
import {IProductItem} from "./common";
import {IProductItem_distributor} from "./Abstract/ICartTypes";

export const ISTProductItemDistributor_Context = createContext<IProductItem_distributor>(null);