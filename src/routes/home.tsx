import { useState } from "react";
import LoginBody from "../docs/loginbody";
import { ViewBody } from "../type/home.type";
import RegistBody from "../docs/registbody";

export default function Home() {
    const [view, setView] = useState<ViewBody>("login")
    switch(view) {
        case "login":
            return ( <LoginBody onChangeView={setView}/> )
        case "regist":
            return ( <RegistBody onChangeView={setView}/>)
    }
}