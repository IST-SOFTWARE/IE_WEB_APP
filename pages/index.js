import { useState } from "react";
import Header from "../components/Header/Header"
import Hello from "../components/LandingPages/Hello"
import LangSwitcher from "../components/LangSwitcher"

const HelloContent = {
    "Label": {
        "ru" : "ОБОРУДОВАНИЕ ДЛЯ ЛИФТОВ\ И ЭСКАЛАТОРОВ",
        "eng": "EQUIPMENT FOR ELEVATORS\ AND ESCALATORS"
    },
    "Tagline": {
        "ru": "Lift your business up \n with IST Elevator.",
        "eng": "Lift your business up \n with IST Elevator."
    },
    
    "SendFormTitle":{
        "ru": "Заказать звонок",
        "eng": "Callback request",
    },

    "SendFormName": {ru: "Имя", eng: "Name"},
    "SendFormPhone": {ru: "Телефон", eng: "Phone"},

    "SendFormSender":{
        "ru": "Отправить заявку",
        "eng": "Send a request"
    },

    "SendFormPhoneTitle":
    {
        "ru": "Наш телефон",
        "eng": "Our phone"
    },

    "CompanyPhone": {
        "ru": "+7(000)000-00-00",
        "eng": "+49(000)000-00-00"
    },
    
    "ScrollDown":{
        "ru": "Листай вниз",
        "eng": "Scroll down"
    }
};
const Languages = {
    "Title" : {
        "ru" : "Язык",
        "eng" : "Language"
    }
};
const HeaderContent = {
    "CatalogTitle":{
        "ru": "Каталог",
        "eng": "Catalog"
    },
    "SearchPlaceholder":{
        "ru": "Ищем что-то?",
        "eng": "Looking for something?"
    },
    "ContectsTitle":{
        "ru": "Контакты",
        "eng": "Contacts"
    },
    "CartTitle":{
        "ru": "Корзина",
        "eng": "Cart"
    },
    "LoginTitle":{
        "ru": "Войти",
        "eng": "LogIn"
    }
};


export default function Index(){
    const[globalLng, setLang] = useState("eng");
    
    function ToggleLang(){
        globalLng === "ru" ? setLang("eng") : setLang("ru");
    }

    function LangChecker(data, def, settings, lng){ 
        try{
            return (data[settings])[lng] === undefined ? def : (data[settings])[lng];
        } 
        catch{
            return def;
        }
    }

    return(
        <>
            <Header
                HeaderLangChecker={LangChecker}
                content = {HeaderContent}
                lang = {globalLng}
            />
            <LangSwitcher
                switchFnc={ToggleLang}
                SwLangChecker={LangChecker}
                lang={globalLng}
                content={Languages}
            />
            <div className="container">
                <Hello
                HelloLangChecker={LangChecker}
                content={HelloContent}
                lang={globalLng}/>
            </div>
        </>
    )
}