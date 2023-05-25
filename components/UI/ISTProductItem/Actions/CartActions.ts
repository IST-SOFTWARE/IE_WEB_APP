import {ICartSelector} from "../Abstract/ICartTypes";

export const switchSelectedState_cartActions = (
    idx: number | string,
    data: ICartSelector
) => {
    if (!data) return;

    const prevSelectorsList = [...data.selectedState];
    const foundIdx = prevSelectorsList.indexOf(idx);

    foundIdx > -1
        ? prevSelectorsList.splice(foundIdx, 1)
        : prevSelectorsList.push(idx);

    data.setSelectedState(prevSelectorsList);
}