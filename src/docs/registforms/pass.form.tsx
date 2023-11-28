import { useState } from "react"
import bodystyle from "../../css/bodystyle.module.css"
import { ViewBody } from "../../type/home.type"
import { PageType } from "../../type/regist.type"
import TwoSideButton from "../common/twosidebutton"
import { RegistValidation } from "./methods/validation"

export default function PassForm({
    addPassAndIMP,
    setChangeView,
    setChangeForm,
}: { 
    addPassAndIMP(data: { imp_uid: string, pass: string }) : void,
    setChangeView(view: ViewBody) : void,
    setChangeForm(page: PageType) : void,
}) {
    const [pass, setPass] = useState<string>("")
    const [imp_uid, setImpUid] = useState<string>("")
    const onChangePass = (event: any) => setPass(event.target.value)
    const onChangeIMP = (event: any) => setImpUid(event.target.value)
    const onChangeView = () => setChangeView("login")

    const next = () => {
        if(RegistValidation.pass(pass)) {
            addPassAndIMP({
                pass,
                imp_uid,
            })
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
                type="password"
                placeholder="비밀번호를 입력해주세요."
                maxLength={20}
                />
                <input
                value={imp_uid}
                onChange={onChangeIMP}
                placeholder="포트원에서 발급 받은 가맹점 식별번호를 입력해주세요."
                maxLength={30}
                />
            </form>
            <TwoSideButton
            prev={onChangeView}
            next={next}
            />
        </div>
    )
}