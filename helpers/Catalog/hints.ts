import { IGeneralCategoryQuery } from "../../queries/categories/generalCategoryQuery";

type newHintsList = {
    fieldName: string;
    slug?: string;
  };

export const change_General_Query_To_ICategory = (
    data: IGeneralCategoryQuery
  ): Array<newHintsList[]> => {
    
    const mfgChangingList: newHintsList[] = [];
    const typeChangingList: newHintsList[] = [];
    const unitChangingList: newHintsList[] = [];

    if (data?.manufacturer_category.length > 0) {
      data.manufacturer_category.map((el) => {
        return mfgChangingList.push({
          fieldName: el.manufacturer_name,
        } as newHintsList);
      });
    }

    if (data?.Type_category.length > 0) {
      data.Type_category.map((el) => {
        return typeChangingList.push({
          fieldName: el.type_name,
        } as newHintsList);
      });
    }

    if (data?.Unit_category.length > 0) {
      data.Unit_category.map((el) => {
        return unitChangingList.push({
          fieldName: el.unit_name,
        } as newHintsList);
      });
    }

    return [[...mfgChangingList], [...typeChangingList], [...unitChangingList]];
  };