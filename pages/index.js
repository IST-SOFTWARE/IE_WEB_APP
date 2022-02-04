import Header from "../components/Header/Header"
import Hello from "../components/LandingPages/Hello"
import LangSwitcher from "../components/LangSwitcher"
import ScrollDown from "../components/ScrollDown";

const HelloContent = {
    "Label": {
        "ru" : "ОБОРУДОВАНИЕ ДЛЯ ЛИФТОВ\ И ЭСКАЛАТОРОВ",
        "eng" : "EQUIPMENT FOR ELEVATORS\ AND ESCALATORS"
    },
    "Tagline": {
        "ru": "Lift your business up \n with IST Elevator.",
        "eng": "Lift your business up \n with IST Elevator."
    },
    CallRequest:{
        ru: "Заказать звонок",
        eng: "Request a call",

        SendForms:{
            name: {ru: "Имя", eng: "Name"},
            phone: {ru: "Телефон: +7(000)000-00-00", eng: "Phone: +49(000)000-00-00"}
        },

        SendApp:{
            ru: "Отправить заявку",
            eng: "Send a request"
        },

        PhoneTitle:
        {
            ru:"",
            eng:"Our phone number"
        },

        CompanyPhone: {
            ru: "+7(000)000-00-00",
            eu: "+49(000)000-00-00"
        }
    },
    ScrollDown:{
        ru: "Листай вниз",
        eng: "Scroll down"
    }
};

export default function index(){

    return(
        <>
            <Header/>
            {/* <LangSwitcher/> */}
            <div className="container">
                <Hello content={HelloContent} lang="ru"/>
            </div>
        </>
    )
}