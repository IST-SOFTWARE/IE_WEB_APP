import { useState } from "react";
import Header from "../components/Header/Header"
import Hello from "../components/LandingPages/Hello"
import LangSwitcher from "../components/LangSwitcher"
import ProductDemo from "../components/LandingPages/ProductDemo";
import InfoOfDev from "../components/InfoOfDev";
import PopUpBase from "../components/PopUpBase";


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
const PDContent = {
    "Label":{
        "ru" : "БОЛЬШОЙ ВЫБОР ЗАПЧАСТЕЙ\nДЛЯ ГРУЗОПОДЪЕМНОЙ\nТЕХНИКИ",
        "eng" : "LARGE SELECTION OF PARTS\nFOR LIFTING EQUIPMENT"
    },
    "1stCard":{
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1644157443/ProductCards/lift_card_n1pcei.png",
        "ru" : "Запчасти для лифтов",
        "eng" : "Spare parts for elevators"
    },
    "2ndCard":{
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1644157443/ProductCards/escal_card_y5u29c.png",
        "ru" : "Запчасти для эскалаторов",
        "eng" : "Escalator\nParts"
    },
    "3thCard":{
        "img" : "https://res.cloudinary.com/dv9xitsjg/image/upload/v1644157443/ProductCards/btn_card_y26fg8.png",
        "ru" : "Модернизация и отделка",
        "eng" : "Modernization and finishing"
    },
    "OpenCatalog":{
        "ru" : "Открыть каталог",
        "eng" : "Open catalog"  
    },
    "AnyQuestions" :{
        "ru":"Возникли вопросы?",
        "eng":"Have questions?"
    },
    "LeaveReq" :{
        "ru": "Оставь {заявку} и мы перезвоним!",
        "eng": "Leave a {request} and we will call you back!"
    }
};

const Languages = {
    "Title" : {
        "ru" : "Язык",
        "eng" : "Language"
    },
    "ChangeText":{
        "ru" : "Переключить язык на \"ENG\" ",
        "eng" : "Switch language to \"RU\" "
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
            <InfoOfDev header="Информация о разработке :D"
            text={
                "Сделал parallax бек для 2 страницы. Сейчас делаю 3. Все на трелло :))"
            }
            />



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

                <ProductDemo
                PDLangChecker={LangChecker}
                content={PDContent}
                lang={globalLng}/>
            </div>
        </>
    )
}