import React, {FC, useEffect, useState} from "react";
import styles from "./categoryHints.module.scss";
import {ICategoryCollection, ICategoryHints} from "./ICategoryHints";
import {IFilterType} from "../hooks/ISTFiltersHook/common";
import {ICheckBoxItem} from "../ISTFiltersList/common";
import {ISTHintCategory} from "./ISTHint";


const ISTCategoryHints: FC<ICategoryHints> = ({
    hintsLimit,
    hints
}) => {

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

                            <ISTHintCategory
                                collectionOfItems={hint.collectionOfItems}
                                hookedData={hint.hookedData}
                                switcherOptions={hint.switcherOptions}
                            />
                    </div>
                );
            })}
        </div>
    );
};

export default ISTCategoryHints;
