import {ICartSelector, ICartSelector_type} from "../Abstract/ICartTypes";

export const switchSelectedState_cartActions = (
    cartSelector: ICartSelector
) => {
    if (!cartSelector) return;

    const prevSelectorsList = [...cartSelector.selectedState];
    const foundIdx = prevSelectorsList.findIndex(el => el?.id === cartSelector?.data?.id);

    foundIdx > -1
        ? prevSelectorsList.splice(foundIdx, 1)
        : prevSelectorsList.push(cartSelector?.data);

    cartSelector.setSelectedState(prevSelectorsList);
}