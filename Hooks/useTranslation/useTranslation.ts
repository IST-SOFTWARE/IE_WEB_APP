import {ITranslation} from "./ITranslation";
import {useRouter} from "next/router";

export const useTransition = <TRANSLATION_BASE_TYPE>(
    translations: ITranslation<TRANSLATION_BASE_TYPE>[]
) => {

    const router = useRouter();
    const locale = router.locale;

    if(!locale) return

    return translations?.find(el => el.locale === locale);

}