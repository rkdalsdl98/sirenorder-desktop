import { useState } from "react";
import LoginBody from "../docs/loginbody";
import { ViewBody } from "../type/home.type";
import RegistBody from "../docs/registbody";

export default function Home({
    onChangeLoadingState,
} : {
    onChangeLoadingState(state: boolean): void,
}) {
    const [view, setView] = useState<ViewBody>("login")
    switch(view) {
        case "login":
            return ( <LoginBody onChangeView={setView} onChangeLoadingState={onChangeLoadingState}/> )
        case "regist":
            return ( <RegistBody onChangeView={setView} onChangeLoadingState={onChangeLoadingState}/>)
    }
}