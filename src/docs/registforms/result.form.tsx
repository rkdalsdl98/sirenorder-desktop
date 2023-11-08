import { ViewBody } from "../../type/home.type"
import bodystyle from "../../css/bodystyle.module.css"
import { useState } from "react"

export default function CreateResultForm({
    setChangeView,
    onChangeLoadingState,
} : {
    setChangeView(view: ViewBody) : void,
    onChangeLoadingState(state: boolean): void,
}) {
    const [uuid, setUUID] = useState("0ed6162c-7920-4442-c0a7-3aacc0d43d48")
    const copyUUID = () => {
        navigator.clipboard.writeText(uuid)
        alert("코드를 복사했습니다.")
    }

    return (
        <div className={bodystyle.create_result_container}>
            <div className={bodystyle.comment_container}>
                <p>축하합니다! 성공적으로 가게를 개설하셨습니다!</p>
                <pre>발급된 코드는 로그인시에 사용되며,{"\n"}타인에게 절대 공유해선 안됩니다.</pre>
                <pre>한번 발급된 코드는 재발급이 불가능 하니{"\n"}잊어버리지 않게 메모해두고 사용하시길 바랍니다.</pre>
            </div>
            <div className={bodystyle.logincode_container}>
                <span id={bodystyle.header}>로그인 코드</span>
                <div className={bodystyle.wrapper}>
                    <input
                    id={bodystyle.inputImage}
                    readOnly
                    onClick={copyUUID}
                    value={uuid}
                    ></input>
                </div>
                <p>우측에 아이콘을 클릭하여 복사 할 수 있습니다.</p>
            </div>
            <div
            onClick={() => setChangeView("login")}
            className={bodystyle.actionbutton}
            style={{ alignSelf: "center" }}
            ><p>로그인하기</p></div>
        </div>
    )
}