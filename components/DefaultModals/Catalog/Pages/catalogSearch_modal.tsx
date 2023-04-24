import React, {useEffect, useRef, useState} from "react";
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

type IProductItem = {
    title: string,
    price: string,
    vendCode: string
}

const defCategoryHints: ICategoryCollection[] = [
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
]
const defProdItems: IProductItem[] = [
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },

    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
    {
        title: "Product Item dsdfsdf sedfsdfs sdfsdfwsfwsdfsad",
        price: "200",
        vendCode: "IST000001"
    },
]

const CatalogSearchModal = ({}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchState, setSearchState] = useState<string>("");

  const [searchResults_categories,
        setSearchResults_categories] = useState<ICategoryCollection[] | null>(
      defCategoryHints
  );

  const [searchResults_products,
        setSearchResults_products] = useState<IProductItem[]>(
        defProdItems
  )

    useEffect(()=>{
        if(inputRef && inputRef.current){
            inputRef.current.focus();
        }
    },[inputRef])

  return (
    <>
      {/*Filters bock*/}
      <div
        className={`d-none d-lg-block col-0 col-lg-6 ${styles.catalogFiltersModal_comp}`}
      >
        <div className={styles.headerContainer}>
            <header className={styles.header}>
                Поиск
            </header>
        </div>

        <div className={styles.inputAndHints_block}>

          <IstInput
            ref={inputRef}
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
                  hints={searchResults_categories}
                />
            </div>
        </div>
      </div>

      {/*Products bock*/}
      <div
        className={`col-12 col-lg-6 h-100 pl-0 pl-lg-3 pr-0 pr-lg-3 ${styles.catalogFiltersModal_comp}`}
      >
        <div className={styles.headerContainer} style={{justifyContent: "space-between"}}>

          <header className={styles.header}>
              Товары
          </header>

          {searchResults_products && (
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

        {searchResults_products ? (

          //PRODUCTS LIST OUT

            <div className={`
                ${styles.catalogItems_block} 
                ${searchResults_products?.length > 6 ? styles.longList : ''}`}
            >
                {searchResults_products.map((el, i) => {
                    return (
                        <div
                            className={styles.productCardVariant_Block}
                            key={`productItem_${i}_u_key`}
                        >
                            <ISTProductItem
                                currency={"RU"}
                                itemType={{
                                    productType: "catalog",
                                    parameters: {
                                        inline: false
                                    },
                                    data: {
                                        id: i,
                                        title: "Product Item",
                                        price: "200",
                                        vendCode: "IST000001"
                                    }
                                }}
                            />
                        </div>
                    )
                })}
            </div>


        ) : (

          //EMPTY RESULT
          <div className={styles.noResultsBlock}>
            <Image
              src={cloudSearch}
              alt={"not result"}
              width={176}
              height={176}
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
