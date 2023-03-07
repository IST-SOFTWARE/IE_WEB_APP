import React from 'react';
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import ICheckBoxList from "../../../UI/ICheckBoxList/ICheckBoxList";

const CatalogFullProductsListModal = ({}) => {
    return(
        <>
        {/*Filters bock*/}
            <div className={"col-md-5 col-xl-4 position-relative p-0"}>
              <div
                className={"col-md-4 col-xl-3 position-fixed p-0"}
                style={{
                  border: "solid 1px yellow",
                  minHeight: "50px",
                  marginTop: "10px",
                  maxWidth: "370px",
                }}
              >
                <ICheckBoxList
                  title={"производители"}
                  isOpened={true}
                  fields={[
                    {
                      isActive: false,
                      fieldName:
                        "фильтр 1 с большим описанием. Этот фильтр сделан для тестирования длинны текста фильтра, а так же для тестирования окна полного описания фильтра. Если длинна названия фильтра менее задaнной величины (23 символа) окно с полным описанием выводиться не будет.",
                      checkBox: true,
                    },
                    { isActive: false, fieldName: "фильтр 2", checkBox: true },
                    { isActive: false, fieldName: "фильтр 3", checkBox: true },
                    { isActive: false, fieldName: "фильтр 4", checkBox: true },
                  ]}
                />
              </div>
            </div>

            {/*Products bock*/}
            <div
              className={
                "col-md-7 col-xl-8 d-flex flex-wrap align-self-start justify-content-lg-around justify-content-xl-between h-100"
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (
                  <ISTProductItem
                    key={`productItem_${i}_key`}
                    id={i}
                    title={"Product Item"}
                    price={"200"}
                    style={{
                      margin: "10px 0px",
                      inline: false,
                    }}
                    vendCode={"IST 000001"}
                    currency={"RU"}
                  />
                );
              })}
            </div>
        </>
    )
}

export default CatalogFullProductsListModal;