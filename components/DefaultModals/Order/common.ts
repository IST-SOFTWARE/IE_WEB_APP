import { Dispatch, ReactNode } from 'react'
import { IImageOptimizationOptions, cartItemGetter_fnc } from '../../UI/common'
import { IRegionSlice } from '../../../store/slices/regionSlice/IRegionSlice'
import { IRegionsListType } from '../../../store/slices/common/regionsListType'
import { ICartSelector_type } from '../../UI/ISTProductItem/Abstract/ICartTypes'
import { modalStater } from '../../../Hooks/useBaseModal/modalSetter'

export interface IOrderingInformation_translation {
  order: string;
  detailsOrder: string;
  products: string;
  sum: string;
  continueOrder: string;
}


export interface IOrderingModal{
  loadingSetter: Dispatch<boolean>
}
export interface IOrderingInformation {
  children: ReactNode;
  translation: IOrderingInformation_translation;
  openRequestPage: (...props) => any; 
}

export interface IOrderRequest {
  translation: IOrderRequest_translation;
  openOrderingInfo: (...props) => any;
}

export interface IOrderedCartWrapper {
  selectedItems: ICartSelector_type[];
  cartItemGetter: cartItemGetter_fnc;
  region: IRegionSlice<IRegionsListType>;
  imageOptimization?: IImageOptimizationOptions
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

export type ICartSelected = {
  cartSelected: string[],
}



