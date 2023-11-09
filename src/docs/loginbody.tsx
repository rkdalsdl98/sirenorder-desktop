import { useState } from 'react';
import bodystyle from "../css/bodystyle.module.css"
import { ViewBody } from '../type/home.type';
import { RegistRequest } from './registforms/request';
import { FailedResponse, METHOD_OF_SUCCESS_STATUS, SuccessResponse } from '../type/request.type';

export default function LoginBody({ 
    onChangeView,
    onChangeLoadingState,
} : { 
    onChangeView(view: ViewBody): void,
    onChangeLoadingState(state: boolean) : void,
}) {
    const [loginCode, setLoginCode] = useState<string>("")
    const [pass, setPass] = useState<string>("")

    const onChangeCodeInput = (event: any) => setLoginCode(event.target.value)
    const onChangePassInput = (event: any) => setPass(event.target.value)
    const setChangeView = () => onChangeView("regist")
    
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
            type='text'
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
        ><p>로그인</p></div>
    </div>
    )
}