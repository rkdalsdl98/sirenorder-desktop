import { ViewBody } from "../type/home.type";
import bodystyle from "../css/bodystyle.module.css"

export default function StoreBody({ 
    onChangeView,
    disconnect,
} : { 
    onChangeView(view: ViewBody): void,
    disconnect(): void,
}) {
    const logout = () => {
        disconnect()
        onChangeView("login")
    }
    return (
        <div>
            <div
            className={bodystyle.actionbutton}
            onClick={logout}
            ><p>로그아웃</p></div>
        </div>
    )
}