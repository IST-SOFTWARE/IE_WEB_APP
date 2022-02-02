import Header from "../components/Header/Header"
import Hello from "../components/LandingPages/Hello"
import LangSwitcher from "../components/LangSwitcher"

export default function index(){
    return(
        <>
            <Header/>
            {/* <LangSwitcher/> */}
            <div className="container">
                <Hello/>
            </div>
        </>
    )
}