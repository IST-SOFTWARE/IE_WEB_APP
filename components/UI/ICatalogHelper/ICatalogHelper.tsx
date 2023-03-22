import React, { useState } from "react";
import styles from "./ICatalogHelper.module.scss";
import CatalogHelperButton from "./ICatalogHelperButton";

interface ButtonHelpers {
  icon: string;
  title: string;
  actionFoo?: (...props: any) => any;
}

const ICatalogHelper = ({ buttonts }) => {
  const [buttonHelpers, setButtonHelpers] = useState<ButtonHelpers[]>(buttonts);
  const [currentHelper, setCurrentHelper] = useState<number>(null);

  return (
    <div className={styles.catalog_help_mobile}>
      <div className={styles.catalog_help_mobile_options}>
        {buttonHelpers.map((el, i) => {
          return (
            <CatalogHelperButton
              idx={i}
              key={`HELPER_${i}`}
              title={el.title}
              icon={el.icon}
              isCurrent={currentHelper === i}
              action={setCurrentHelper}
              foo={el.actionFoo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ICatalogHelper;
