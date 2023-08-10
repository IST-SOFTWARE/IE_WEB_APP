import { ICatalogFiltersType } from "../../store/slices/common/catalogFiltersType";
import { IGeneralCategoryQuery } from "../../queries/categories/generalCategoryQuery";
import { available_AdditionalFilters } from "../../components/Catalog/Filters/Additional/AdditionalFilters";
import { IFiltersLocale } from "../../locales/filters/filtersLocale";
import { ICatalogQueries } from "../../components/Catalog/Abstract/ICatalogQueries";
import { ITranslation } from "../../Hooks/useTranslation/ITranslation";

export const getFiltersDesignationSList_filtersHelper = (
  selectedTypes: keyof ICatalogFiltersType
): string => {
  return selectedTypes;
};

export const filterSetter_filtersHelper = (
  filtersList: ICatalogFiltersType,
  key: keyof ICatalogFiltersType,
  filter: string
): string[] => {
  if (!filtersList) return;

  const outArr: Array<string> = filtersList[key] ? [...filtersList[key]] : [];

  const elIdx = outArr.indexOf(filter);
  elIdx > -1 ? outArr.splice(elIdx, 1) : outArr.push(filter);

  return outArr;
};

export const isActiveNow_filtersHelper = (
  filtersList: ICatalogFiltersType,
  key: keyof ICatalogFiltersType,
  name: string
): boolean => {
  if (!filtersList) return;

  let res = false;

  filtersList[key]?.map((el) => {
    if (el === name) res = true;
  });

  return res;
};

export const getFiltersItemsAsArray_filtersHelper = (
  data: IGeneralCategoryQuery,
  category: keyof IGeneralCategoryQuery,
  key: string
): string[] => {
  const ouArr = new Array<string>();
  const dataOfCategory = data[category];

  dataOfCategory.map((el) => {
    if (el[key]) ouArr.push(el[key]);
  });

  return ouArr;
};

export const filterExclude_filtersHelper = (
  excludeValues: string[],
  targetObj: string[]
): string[] => {
  if (!(excludeValues?.length === targetObj?.length))
    return targetObj.filter(function (el) {
      return excludeValues.indexOf(el) < 0;
    });

  return [""];
};

export const listHasActives_filtersHelper = (
  catalog: ICatalogQueries<ICatalogFiltersType>,
  filter: keyof ICatalogFiltersType
): boolean => {
  if (catalog?.filters)
    return catalog.filters[filter] && catalog.filters[filter]?.length > 0;

  return false;
};

export const getAdditionalFilter_filtersHelper = (
  el: string,
  currentTranslation: ITranslation<IFiltersLocale>
) => {
  let outData: string;

  switch (el) {
    case available_AdditionalFilters.isAvailable:
      outData = currentTranslation.translation.available.isAvailable;
      break;
    case available_AdditionalFilters.onOrder:
      outData = currentTranslation.translation.available.onOrder;
      break;

    case currentTranslation.translation.available.isAvailable:
      outData = available_AdditionalFilters.isAvailable;
      break;

    case currentTranslation.translation.available.onOrder:
      outData = available_AdditionalFilters.onOrder;
      break;

    default:
      outData = el;
  }

  return outData;
};

export const getNamedFiltersListItem_filtersHelper = (
  el: keyof ICatalogFiltersType,
  currentTranslation: ITranslation<IFiltersLocale>
) => {
  if (!currentTranslation || !el) return;

  let outData: string;

  switch (el) {
    case "mfg":
      outData = currentTranslation.translation.namesOfFiltersList.manufacturer;
      break;
    case "type":
      outData = currentTranslation.translation.namesOfFiltersList.type;
      break;

    case "unit":
      outData = currentTranslation.translation.namesOfFiltersList.unit;
      break;

    case "available":
      outData = currentTranslation.translation.namesOfFiltersList.available;
      break;

    default:
      outData = el;
  }

  return outData;
};
