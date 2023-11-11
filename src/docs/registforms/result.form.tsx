import { ViewBody } from "../../type/home.type"
import bodystyle from "../../css/bodystyle.module.css"
import { useEffect, useRef, useState } from "react"
import { RegistRequest } from "./methods/request"
import { RequestException, RequestState } from "../../type/request.type"
import Loading from "../common/loading"
import { RegistRequestBody, UUIDS } from "../../type/regist.type"

function CreateResult({ 
    merchantId,
    storeId,
    walletId,
    reqState,
    setChangeView,
} : { 
    merchantId?: string,
    storeId?: string,
    walletId?: string,
    reqState: RequestState,
    setChangeView(view: ViewBody) : void,
}) {
    const copyUUID = (uuid: string) => {
        navigator.clipboard.writeText(uuid)
        alert("코드를 복사했습니다.")
    }
    const wait = () => (
        <div className={bodystyle.comment_container}>
            <p>요청에 대한 응답을 기다리는중 입니다...</p>
            <pre>잠시만 기다려주세요!</pre>
        </div>
    )
 
    const success = () => (
        <div className={bodystyle.comment_container}>
            <p>축하합니다! 성공적으로 가게를 개설하셨습니다!</p>
            <pre>발급된 코드는 로그인시에 사용되며,{"\n"}타인에게 절대 공유해선 안됩니다.</pre>
            <pre>한번 발급된 코드는 재발급이 불가능 하니{"\n"}잊어버리지 않게 메모해두고 사용하시길 바랍니다.</pre>
        </div>
    )

    const failed = () => (
        <div className={bodystyle.comment_container}>
            <p>회원가입에 실패했습니다</p>
            <pre>서버와 연결상태가 불안정 하거나{"\n"}입력에 실수한 부분이 있는지 확인해주세요!</pre>
            <pre>지속적으로 회원가입에 실패한다면,{"\n"}에러내용과 함께 문의해주세요.</pre>
        </div>
    )

    return (
        <div className={bodystyle.create_result_container}>
            {
                reqState === "idle" || reqState === "wait"
                ? wait()
                : (reqState === "done" ? success() : failed())
            }
            <div className={bodystyle.logincode_container}>
                <span id={bodystyle.header}>로그인 코드</span>
                <div className={bodystyle.wrapper}>
                    <input
                    id={bodystyle.inputImage}
                    readOnly
                    onClick={() => copyUUID(merchantId ?? "")}
                    value={merchantId}
                    ></input>
                </div>
                <p>우측에 아이콘을 클릭하여 복사 할 수 있습니다.</p>
            </div>
            <div className={bodystyle.logincode_container}>
                <span id={bodystyle.header}>가게 코드</span>
                <div className={bodystyle.wrapper}>
                    <input
                    id={bodystyle.inputImage}
                    readOnly
                    onClick={() => copyUUID(storeId ?? "")}
                    value={storeId}
                    ></input>
                </div>
                <p>우측에 아이콘을 클릭하여 복사 할 수 있습니다.</p>
            </div>
            <div className={bodystyle.logincode_container}>
                <span id={bodystyle.header}>지갑 코드</span>
                <div className={bodystyle.wrapper}>
                    <input
                    id={bodystyle.inputImage}
                    readOnly
                    onClick={() => copyUUID(walletId ?? "")}
                    value={walletId}
                    ></input>
                </div>
                <p>우측에 아이콘을 클릭하여 복사 할 수 있습니다.</p>
            </div>
            <div
            onClick={() => setChangeView("login")}
            className={bodystyle.actionbutton}
            style={{ alignSelf: "center" }}
            ><p>{ reqState === "fail" ? "처음으로" : "로그인하기" }</p></div>
        </div>
    )
}

export default function CreateResultForm({
    setChangeView,
    getReqBody,
} : {
    setChangeView(view: ViewBody) : void,
    getReqBody: () => RegistRequestBody,
}) {
    const uuids = useRef<UUIDS>({})
    const reqState = useRef<RequestState>("idle")
    const [loadingState, setLoadingState] = useState<boolean>(false)

    /**
     * 회원가입 요청 함수 작성 하기
     * 
     * 시간차룰 두고 setState를 호출하는 이유는 혹시 모를 무한루프 때문
     * @returns 
     */
    const regist = async () => {
        if(reqState.current === "done") {
            reqState.current = "idle"
            return
        } else if(reqState.current === "wait") return
        const body = getReqBody()
        RegistRequest.fetchRequest(
            "POST", 
            "/merchant/regist",
            {
                ...body,
                images: [],
            },
        )
        .then((result) => {
            if("message" in result) {
                reqState.current = "fail"
                alert(result.message)
            } else {
                if(!result.data.uuids) {
                    reqState.current = "fail"
                    alert("서버와 통신이 불안정하여 데이터를 가져오는데 실패했습니다.\n운영진에게 문의하여 재발급 받아주세요.")
                } else {
                    uuids.current = result.data.uuids as UUIDS
                    reqState.current = "done"
                }
            }
            setTimeout(()=>{
                setLoadingState(false)
            }, 100)
        })
        .catch(err => {
            reqState.current = "fail"
            if(err instanceof RequestException) {
                alert(`에러: ${err.exception}\n${err.message}`)
            }
            setTimeout(()=>{
                setLoadingState(false)
            }, 100)
        })

        if(reqState.current !== "fail") {
            reqState.current = "wait"
            setLoadingState(true)
        }
    }
    useEffect(() => {
        regist()
    })
    
    return (
        <div className={bodystyle.result_container}>
            <Loading
            loadingState={loadingState}
            />
            <CreateResult
            reqState={reqState.current}
            merchantId={uuids.current.merchant}
            storeId={uuids.current.store}
            walletId={uuids.current.wallet}
            setChangeView={setChangeView}
            />
        </div>
    )
}