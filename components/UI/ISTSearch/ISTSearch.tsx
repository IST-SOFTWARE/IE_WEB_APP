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
          // marginLeft: "4px", //вынести в родителя
        }}
      />
      <div className={styles.search_results}>
        {/* map результатов (максиально 3 дива с результатом) */}

        {[
          {
            resultTitle: "Производители",
            possibleResults: ["Kone", "OTIS", "ЩЛЗ"],
          },
          {
            resultTitle: "Узлы",
            possibleResults: [
              "Приямок шахты лифта",
              "Привод ДК, балки ДК и ДШ, двери кабины и шахты, порталы, БУАД, двери боствиг",
              "Кабина (каркас) и интерьер кабины лифта, крыша кабины, противовес",
            ],
          },
          {
            resultTitle: "Типы",
            possibleResults: [
              "Резиновая/пластиковая прокладка, буфер, демпфер, вставка, отбойник",
              "Башмак, вкладыш ДК/ДШ",
              "Башмак, вкладыш башмака направляющих кабины и противовеса",
            ],
          },
        ].map((result) => {
          return (
            <div key={`results_${result}`} className={styles.result_container}>
              
              <div className={styles.result_title_name}>
                {result.resultTitle}
              </div>

              <div className={styles.possible_results}>
                {result.possibleResults.map((possibleresult) => {
                  return (
                    <span
                      key={`possibleResults_${possibleresult}`}
                      className={styles.result}
                    >
                      {possibleresult}
                    </span>
                  );
                })}
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ISTSearch;

//
