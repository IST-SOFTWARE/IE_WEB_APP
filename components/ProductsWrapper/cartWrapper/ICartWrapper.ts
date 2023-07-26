import { CSSProperties, Dispatch } from 'react'
import { ICartCollection } from '../../../queries/cart/cartActions'
import { ICartSelector } from '../../UI/ISTProductItem/Abstract/ICartTypes'
import { IProductItem } from '../../UI/ISTProductItem/common'
import { mobileTrigger_size } from '../../UI/common'

export interface cartCollection {
  cartCollection_by_id: ICartCollection;
}

export interface ICartWrapper {
  cartSelector: Omit<ICartSelector, "data">;
  loadingSetter: Dispatch<boolean>;

  mobileTriggerSize?: mobileTrigger_size;
  itemStyles?: Pick<IProductItem, "style">;
  wrapperStyles?: CSSProperties;

  amountData?: {
    amountPriceSetter: Dispatch<number>;
    amountQuantitySetter: Dispatch<number>;
  };
}