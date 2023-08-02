import { cartCollection } from '../../ProductsWrapper/common'
import { IProductData } from "../../UI/common";

export interface IOrderingInformation_translation {
  order: string;
  detailsOrder: string;
  products: string;
  sum: string;
  continueOrder: string;
}

export interface IOrderingInformation {
  translation: IOrderingInformation_translation;
  nextModalFunc: (...props) => any;
}

export interface IOrderRequest {
  translation: IOrderRequest_translation;
  previousModalFunc: (...props) => any;
}

export interface IOrderedCart {
  selectedIds: Array<string | number>;
  cartData: cartCollection;
}

export interface IOrderRequest_translation {
  order: string;
  detailsOrder: string;
  contactPhoneText: string;
  placeholderPhone: string;
  descriptionText: string;
  descriptionTextInformation: string;
  IPNText: string;
  IPN: string;
  organizationNameText: string;
  organizationName: string;
  fullNameRepresentativeText: string;
  fullNameRepresentative: string;
  emailText: string;
  email: string;
  buttonOrdering: string;
  buttonOrderingDetails: string;
}


