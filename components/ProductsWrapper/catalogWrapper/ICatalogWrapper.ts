import { CSSProperties, Dispatch } from 'react'
import { ICartCollection } from '../../../queries/cart/cartActions'

export interface ICatalogWrapper {
  additionalForwarding: string;
  loadingSetter: Dispatch<boolean>;

  itemWrapper_ClassName?: string;
  wrapper_ClassName?: string;

  itemWrapperStyles?: CSSProperties;
  wrapperStyles?: CSSProperties;
}
