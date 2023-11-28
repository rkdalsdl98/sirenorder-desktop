import { ViewBody } from "../../type/home.type";
import { PageType, StoreInfo } from "../../type/regist.type";
import bodystyle from "../../css/bodystyle.module.css"
import { useRef, useState } from "react";
import emptyimg from "../../css/images/empty.png"
import TwoSideButton from "../common/twosidebutton";
import { RegistValidation } from "./methods/validation";

const TEST_THUMBNAIL = "https://firebasestorage.googleapis.com/v0/b/mocatmall.appspot.com/o/store.jpg?alt=media&token=3be0c239-ead4-48e8-8738-a1cc308965d0"

export default function StoreInfoForm({
    addStoreInfo,
    setChangeView,
    setChangeForm,
}: { 
    addStoreInfo(data: Omit<StoreInfo, "detail">) : void,
    setChangeView(view: ViewBody) : void,
    setChangeForm(page: PageType) : void,
}) {
    const [storename, setStoreName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [thumbnail, setThumbnail] = useState<string | undefined>(undefined)
    const finder =  useRef<any>(null)

    const onChangeStoreName = (event: any) => setStoreName(event.target.value)
    const onChangeAddress = (event: any) => setAddress(event.target.value)
    const onChangeView = () => setChangeView("login")

    const onChangeThumbnail = (event: any) => {
        const files = event.target.files
        if(files.length !== 1) {
            return
        }
        const file : File = files[0]
        if(RegistValidation.checkFileFormat(file)) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                if(fileReader.result !== null)
                    setThumbnail(TEST_THUMBNAIL)
            }
        }
    }
    const alertMessage = (type: string) => {
        switch(type) {
            case "storename":
                alert("가게 이름은 20자 이내로 작성 해야합니다.")
                return
            case "thumbnail":
                alert("대표 이미지를 선택해주세요.")
                return
            default:
                alert("알 수 없는 오류가 발생했습니다.\n앱을 종료한 이후에 재실행 해주세요.")
                return
        }
    }
    const findThumbnail = (_: any) => finder.current.click()
    const next = () => {
        const info = {
            storename,
            address,
            thumbnail,
        }
        
        const validation = RegistValidation.checkInfo({...info})
        if(typeof validation === "boolean") {
            addStoreInfo(info)
            setChangeForm("detailinfo")
        } else alertMessage(validation.type)
    }
    return (
        <div className={bodystyle.largebody}>
            <span>가게정보</span>
            <form className={bodystyle.inputform}>
                <input
                value={storename}
                onChange={onChangeStoreName}
                placeholder="가게이름을 입력해주세요."
                maxLength={20}
                />
                <input
                value={address}
                onChange={onChangeAddress}
                placeholder="가게주소를 입력해주세요."
                />
                <input
                className={bodystyle.inputImage}
                onClick={findThumbnail}
                style={{ paddingLeft: "30px"}}
                readOnly
                placeholder="노출될 가게 대표 이미지를 선택해주세요."
                ></input>
                <input 
                type="file" 
                style={{display: "none"}}
                ref={finder}
                onChange={onChangeThumbnail}
                ></input>
                <div>
                    <img src={thumbnail ?? emptyimg}></img>
                    <h6>이미지 미리보기</h6>
                    <p>이미지 크기는 2:1 비율을 추천 드립니다.</p>
                </div>
            </form>
            <TwoSideButton
            prev={onChangeView}
            next={next}
            />
        </div>
    )
}