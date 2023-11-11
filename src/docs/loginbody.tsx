import { useState } from 'react';
import bodystyle from "../css/bodystyle.module.css"
import { ViewBody } from '../type/home.type';
import { SocketLoginBody } from '../socket/socket.type';

export default function LoginBody({ 
    onChangeView,
    connect,
} : { 
    onChangeView(view: ViewBody): void,
    connect(data: SocketLoginBody): void,
}) {
    const [loginCode, setLoginCode] = useState<string>("")
    const [pass, setPass] = useState<string>("")

    const onChangeCodeInput = (event: any) => setLoginCode(event.target.value)
    const onChangePassInput = (event: any) => setPass(event.target.value)
    const setChangeView = () => onChangeView("regist")

    const login = () => {
        connect({
            merchantId: loginCode,
            pass,
        })
    }

    return (
    <div className={bodystyle.loginbody}>
        <span>로그인</span>
        <form className={bodystyle.inputform}>
            <input
           onChange={onChangeCodeInput}
           type='text'
           value={loginCode}
           placeholder='발급받은 코드를 입력해주세요.'
            />
            <input
            onChange={onChangePassInput}
            type='password'
            value={pass}
            placeholder='비밀번호를 입력해주세요.'
            />
        </form>
        <p className={bodystyle.highlightcomment}>데모버전은 
            <span 
            onClick={setChangeView}
            > 이곳 </span>
            을 눌러 상점을 개설 할 수 있어요!
        </p>
        <div
        className={bodystyle.actionbutton}
        onClick={login}
        ><p>로그인</p></div>
    </div>
    )
}