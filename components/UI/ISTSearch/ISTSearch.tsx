import { iteratorSymbol } from "immer/dist/internal";
import React, { useState } from "react";
import IstInput, { inputTypesVars } from "../ISTInput/ISTInput";
import styles from "./search.module.scss";

const ISTSearch = () => {
  const [item, setItem] = useState<string>("");

  return (
    <div className={styles.container}>
      <header className={styles.title}>Поиск</header>
      <IstInput
        inputType={inputTypesVars.any_string}
        placeholder={"Enter your request"}
        required={true}
        outDataSetter={setItem}
        actualData={item}
        style={{
          height: "55px",
          borderRadius: "15px",
        }}
      />
      <div className={styles.search_results}>
        {/* map результатов (максиально 3 дива с результатом) */}
        {[1, 2, 3].map((result) => {
          return (
            <div key={`result_${result}`} className={styles.result_container}>
              <span className={styles.result_title_name}>Производители</span>
              <div className={styles.possible_results}>
                <span className={styles.result}>Kone</span>
                <span className={styles.result}>OTIS</span>
                <span className={styles.result}>ЩЛЗ</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ISTSearch;
