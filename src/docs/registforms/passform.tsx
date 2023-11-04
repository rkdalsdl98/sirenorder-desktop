import { useState } from "react"
import bodystyle from "../../css/bodystyle.module.css"
import { ViewBody } from "../../type/home.type"
import { PageType } from "../../type/regist.type"

export default function PassForm({
    addPass,
    setChangeView,
    setChangePage,
}: { 
    addPass(data: string) : void,
    setChangeView(view: ViewBody) : void,
    setChangePage(page: PageType) : void,
}) {
    const [pass, setPass] = useState<string>("")
    const onChangePass = (event: any) => setPass(event.target.value)
    const onChangeView = () => setChangeView("login")

    const validation = () : boolean => {
        if(/[0-9a-zA-Z]{6,20}/.test(pass)
        && /[\!\`\~\@\#\$\%\^\&\*\_\+\=\/\>\<\?]{1,}/.test(pass)) {
            return true
        }
        return false
    }

    const next = () => {
        const isValid = validation()
        if(isValid) {
            addPass(pass)
            //setChangePage("storeinfo")
        } else {
            // alert function....
        }
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
            <div className={bodystyle.twosidewrapper}>
                <div
                className={bodystyle.actionbutton}
                onClick={onChangeView}
                ><p>취소</p></div>
                <div
                className={bodystyle.actionbutton}
                onClick={next}
                ><p>다음</p></div>
            </div>
        </div>
    )
}