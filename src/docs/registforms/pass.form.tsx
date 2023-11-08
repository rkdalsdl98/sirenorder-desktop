import { useState } from "react"
import bodystyle from "../../css/bodystyle.module.css"
import { ViewBody } from "../../type/home.type"
import { PageType } from "../../type/regist.type"
import TwoSideButton from "../common/twosidebutton"
import { RegistValidation } from "./validation"

export default function PassForm({
    addPass,
    setChangeView,
    setChangeForm,
}: { 
    addPass(data: string) : void,
    setChangeView(view: ViewBody) : void,
    setChangeForm(page: PageType) : void,
}) {
    const [pass, setPass] = useState<string>("")
    const onChangePass = (event: any) => setPass(event.target.value)
    const onChangeView = () => setChangeView("login")

    const next = () => {
        if(RegistValidation.pass(pass)) {
            addPass(pass)
            setChangeForm("storeinfo")
        } else alert("비밀번호는 특수문자를 포함한 6글자 이상이어야 합니다.")
    }
    
    return (
        <div className={bodystyle.smallbody}>
            <span>비밀번호</span>
            <form className={bodystyle.inputform}>
                <input
                value={pass}
                onChange={onChangePass}
                placeholder="비밀번호를 입력해주세요."
                maxLength={20}
                />
            </form>
            <TwoSideButton
            prev={onChangeView}
            next={next}
            />
        </div>
    )
}