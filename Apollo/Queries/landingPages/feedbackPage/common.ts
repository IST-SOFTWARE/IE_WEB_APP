import {langCode} from "../../common";

export type category = {
    category: Array<{
        category_name: string,
        languages_code: langCode
    }>
}
