import React, { FC, useState } from "react";
import styles from "./categoryHints.module.scss";

type ICategoryItem = {
  id: number;
  itemName: string;
};

type ICategoryCollection = {
  actionName: string;
  collectionName: string;
  collectionOfItems: Array<ICategoryItem>;
};

interface ICategoryHints {
  hintsLimit: number;
  hints: Array<ICategoryCollection>;
}

const ISTCategoryHints: FC<ICategoryHints> = ({ hintsLimit, hints }) => {
  const [collection, setCollection] = useState<ICategoryCollection[]>(
    hints.slice(0, hintsLimit)
  );

  return (
    <div className={styles.search_results}>
      {collection.map((hint) => {
        return (
          <div
            key={`results_${hint.collectionName}`}
            className={styles.result_container}
          >
            <div className={styles.result_title_name}>
              {hint.collectionName}
            </div>

            <div className={styles.possible_results}>
              {hint.collectionOfItems.map((item) => {
                return (
                  <span
                    key={`item_${item.id}_${item.itemName}`}
                    className={styles.result}
                  >
                    {item.itemName}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ISTCategoryHints;
