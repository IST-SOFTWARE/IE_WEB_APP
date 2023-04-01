import React, { useState } from "react";
import ISTProductItem from "../../../UI/ISTProductItem/ISTProductItem";
import IstInput, { inputTypesVars } from "../../../UI/ISTInput/ISTInput";
import ISTCategoryHints from "../../../UI/ISTCategoryHints/ISTCategoryHints";
import Image from "next/image";
import cloudSearch from "../../../../public/Modals/Catalog/cloudSearch.svg";
import ISTButtonN from "../../../UI/ISTButton/ISTButtonN";
import styles from "../../../../styles/Modals/catalog/catalogSearch/catalogSearch.module.scss";

type ICategoryItem = {
  id: number;
  itemName: string;
};

type ICategoryCollection = {
  actionName: string;
  collectionName: string;
  collectionOfItems: Array<ICategoryItem>;
};

const CatalogSearchModal = ({}) => {
  const [searchState, setSearchState] = useState<string>("");

  const [searchResults, setSearchResults] = useState<
    ICategoryCollection[] | null
  >([null]);

  return (
    <>
      {/*Filters bock*/}
      <div
        className={`d-none d-lg-block col-0 col-lg-6`}
        style={{
          border: "solid 1px red",
        }}
      >
        <header className={styles.header}>Поиск</header>
        <div className={styles.inputAndHints_block}>

          <IstInput
            inputType={inputTypesVars.any_string}
            placeholder={"Enter your request"}
            required={true}
            outDataSetter={setSearchState}
            actualData={searchState}
            style={{
              height: "50px",
              borderRadius: "15px",
            }}
          />

            <div className={styles.hints_block}>
                <ISTCategoryHints
                  hintsLimit={3}
                  hints={[
                    {
                      actionName: "",
                      collectionName: "Производители",
                      collectionOfItems: [
                        { id: 1, itemName: "Kone" },
                        { id: 2, itemName: "OTIS" },
                        { id: 2, itemName: "ЩЛЗ" },
                      ],
                    },
                    {
                      actionName: "",
                      collectionName: "Узлы",
                      collectionOfItems: [
                        { id: 1, itemName: "Приямок шахты лифта" },
                        {
                          id: 2,
                          itemName:
                            "Привод ДК, балки ДК и ДШ, двери кабины и шахты, порталы, БУАД, двери боствиг",
                        },
                        {
                          id: 3,
                          itemName:
                            "Кабина (каркас) и интерьер кабины лифта, крыша кабины, противовес",
                        },
                      ],
                    },
                    {
                      actionName: "",
                      collectionName: "Типы",
                      collectionOfItems: [
                        {
                          id: 1,
                          itemName:
                            "Резиновая/пластиковая прокладка, буфер, демпфер, вставка, отбойник",
                        },
                        { id: 2, itemName: "Башмак, вкладыш ДК/ДШ" },
                        {
                          id: 3,
                          itemName:
                            "Башмак, вкладыш башмака направляющих кабины и противовеса",
                        },
                      ],
                    },
                  ]}
                />
            </div>
        </div>
      </div>

      {/*Products bock*/}
      <div
        className={"col-12 col-lg-6 h-100"}
        style={{
          border: "solid 1px blue",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <header className={styles.header}>Товары</header>
          {searchResults && (
            <div style={{ width: "180px", alignSelf: "center" }}>
              <ISTButtonN
                title={{ caption: "Все результаты" }}
                dark={{
                  solid: false,
                  style: {
                    borderRadius: "15px",
                    fillContainer: true,
                  },
                }}
              />
            </div>
          )}
        </div>
        {searchResults ? (
          <div className={"col-12 p-0 d-flex justify-content-center"}>
            <div className={styles.catalogItems_block}>
                {new Array(10).fill("").map((i) => {
                    return (
                        <div
                            className={styles.productCardVariant_Block}
                            key={`productItem_${i}_u_key`}
                        >
                            <ISTProductItem
                                id={i}
                                title={"Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad"}
                                price={"200"}
                                style={{
                                    margin: "10px",
                                    inline: false,
                                }}
                                vendCode={"IST 000001"}
                                currency={"RU"}
                            />
                        </div>
                    );
                })}
            </div>
          </div>
        ) : (
          <div className={styles.noResultsBlock}>
            <Image
              src={cloudSearch}
              alt={"not result"}
              width={186}
              height={186}
              fill={false}
              style={{
                objectFit: "contain",
              }}
            />
            <div className={styles.noResultsText}>
              Start typing a query to search for a product
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CatalogSearchModal;
