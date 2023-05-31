import React, { FC, useEffect, useState } from "react";
import styles from "./categoryHints.module.scss";
import { ICategory, ICategoryHints } from "./ICategoryHints";
import { IFilterType } from "../hooks/ISTFiltersHook/common";
import { ICheckBoxItem } from "../ISTFiltersList/common";
import { ISTHintCategory } from "./ISTHint";

const ISTCategoryHints: FC<ICategoryHints> = ({
  hintsLimit,
  hintsList: hints,
  hintsCategoryCollection,
}) => {
  const [collectionName, setCollectionName] = useState<ICategory[]>(
    hintsCategoryCollection
  );

  const [categoryCollection, setCategoryCollection] = useState(hints);
  

  useEffect(() => {
    setCategoryCollection(hints);
  }, [hints]);

  return (
    <div className={styles.search_results}>
      {collectionName.map((hint, index) => {
        return (
          <div
            key={`results_${hint.collectionName}`}
            className={styles.result_container}
          >
            {categoryCollection[index].length > 0 ? (
              <div className={styles.result_title_name}>
                {hint.collectionName}
              </div>
            ) : null}

            <ISTHintCategory
              listedHintsId={hint.listedHintsId}
              switcherOptions={hint.switcherOptions}
              hintsList={categoryCollection}
              hintsLimit={hintsLimit}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ISTCategoryHints;
