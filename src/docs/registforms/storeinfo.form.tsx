import { ViewBody } from "../../type/home.type";
import { PageType, StoreInfo } from "../../type/regist.type";
import bodystyle from "../../css/bodystyle.module.css"
import { useRef, useState } from "react";
import emptyimg from "../../css/images/empty.png"
import TwoSideButton from "../common/twosidebutton";

export default function StoreInfoForm({
    addStoreInfo,
    setChangeView,
    setChangeForm,
}: { 
    addStoreInfo(data: Omit<StoreInfo, "detail">) : void,
    setChangeView(view: ViewBody) : void,
    setChangeForm(page: PageType) : void,
}) {
    const [storeName, setStoreName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [thumbnail, setThumbnail] = useState<string | null>(null)
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
        const splitFile = file.name.split(".")
        if(checkFileFormat(splitFile[splitFile.length - 1])) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                if(fileReader.result !== null)
                    setThumbnail(fileReader.result as string)
            }
        }
    }

    const checkFileFormat = (format: string) : boolean => {
        switch(format) {
            case "png":
            case "jpg":
            case "jpeg":
                return true
            default:
                return false
        }
    }
    const findThumbnail = (event: any) => finder.current.click()
    const validation = () : boolean => {
        if(/^[가-힣a-z-A-Z]{1,20}$/.test(storeName)
        && address.length <= 100
        && thumbnail !== null) {
            return true
        }
        return false
    }

    const next = () => {
        const isValid = validation()
        if(isValid) {
            addStoreInfo({
                storename: storeName,
                storeaddress: address,
                thumbnail: thumbnail!,
            })
            setChangeForm("detailinfo")
        } else {
            // alert function....
        }
    }
    return (
        <div className={bodystyle.largebody}>
            <span>가게정보</span>
            <form className={bodystyle.inputform}>
                <input
                value={storeName}
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