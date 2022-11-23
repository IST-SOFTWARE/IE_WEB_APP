import {IWord} from "./ILandingLabel";
import {string} from "prop-types";

const FindTags: Array<string> = [
    '[Uu]', '[Pp]', '[span]'
]

const convertTags = (data: string):string => {
    let convertedData = data;
    convertedData = convertedData.replace(/</g, '&lt;');
    convertedData = convertedData.replace(/>/g, '&gt;');

    return convertedData

}

const clearTags = (data: string, ):string => {

    let outData:string = data;
    const clearRegexBase:string = `(\\s*?<\\/?[\\s\\S]*?>\\s*|\\s*?&lt;*\\/?[\\s\\S]*?&gt;\\s*)`;
    const clearRegex = new RegExp(clearRegexBase, 'gi');
    outData = outData.replace(clearRegex, ' ');
    // console.log(outData.match(clearRegex));

    return outData;
}

const concatULined = (dataForConcat: Array<IWord>) => {
    for(let i = 0; i < dataForConcat.length; i++){
        if(dataForConcat[i].underline || dataForConcat[i].link){
            let selectedText:string = "";
            let indexNow = i;
            while((dataForConcat[indexNow]?.underline) || (dataForConcat[indexNow]?.link)){
                selectedText += `${dataForConcat[indexNow].word}${dataForConcat[indexNow + 1]?.underline || dataForConcat[indexNow + 1]?.link ? " " : ""}`;
                dataForConcat.splice(indexNow--, 1)
                indexNow++;
            }
            dataForConcat.splice(i, 0, {
                word: selectedText,
                underline: true
            })
        }
    }

    return dataForConcat;
}

const getDataWithStyledWords = (tagName: string, data: string) : Array<IWord> | null  => {

    const outLabel: Array<IWord> = new Array<IWord>();
    const cleanedData: string = clearTags(data);


    const baseRegex:string  = `&lt;*\\/?${tagName}[\\s\\S]*?&gt;([\\s\\S]*?)&lt;*\\/?${tagName}*?&gt;`
    const regEx = new RegExp(baseRegex, 'g');

    const matchedData: Array<string> =
        Array.from(data.matchAll(regEx), x=>x[1]);

    const splitData:Array<string> =
        cleanedData.split(/(\s+)/).
            filter( function(e) { return e.trim().length > 0; } );


    splitData.length > 0 ? splitData.map(((dataItem, index) => {
      const wordItem: IWord = {
          word: dataItem
      };

      matchedData.length > 0 ? matchedData.map(matchedItem => {
          if(matchedItem.includes(dataItem))
              wordItem.underline = true;


      }): null;

      outLabel.push(wordItem);
    })): null


    return outLabel;

}

const LandingLabelBuilder = (label: string):Array<IWord> | null =>{
    const convertedLabel = convertTags(label);
    const dataWithStyledWords = getDataWithStyledWords(FindTags[0], convertedLabel);

    return concatULined(dataWithStyledWords);
};

export default LandingLabelBuilder;