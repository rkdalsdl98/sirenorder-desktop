import { ViewBody } from "../../type/home.type";
import { Hours, PageType, StoreDetailInfo } from "../../type/regist.type";
import bodystyle from "../../css/bodystyle.module.css"
import TwoSideButton from "../common/twosidebutton";
import { HourInputBoxes } from "../common/hourinputboxes";
import { useState } from "react";
import { RegistValidation } from "./methods/validation";

export default function DetailInfoForm({
    addStoreDetail,
    setChangeView,
    setChangeForm,
}: { 
    addStoreDetail(data: StoreDetailInfo) : void,
    setChangeView(view: ViewBody) : void,
    setChangeForm(page: PageType) : void,
}) {
    const [openHours, setOpenHours] = useState<Hours>({})
    const [sirenOrderAndDT, setSirenOrderAndDT] = useState<Hours>({})
    const [phonenumber, setPhoneNumber] = useState<string>("")
    const [parkinginfo, setParkingInfo] = useState<string>("")
    const [waytocome, setWaytocome] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const onChangeOpenHours = (hours: Hours) => setOpenHours(hours)
    const onChangesirenOrderAndDT = (hours: Hours) => setSirenOrderAndDT(hours)
    const onChangePhoneNumber = (event: any) => setPhoneNumber(event.target.value)
    const onChangeParkingInfo = (event: any) => setParkingInfo(event.target.value)
    const onChangeWaytocome = (event: any) => setWaytocome(event.target.value)
    const onChangeDescription = (event: any) => setDescription(event.target.value)
    
    const onChangeView = () => setChangeView("login")
    const alertMessage = (type: string) => {
        switch(type) {
            case "hours":
                alert("시간은 0~12사이에 숫자만 입력이 가능합니다.")
                return
            case "phonenumber":
                alert("매장번호를 한번 더 확인해주세요.")
                return
            case "description":
                alert("소개는 100글자 이내로 작성 해야합니다.")
                return
            default:
                alert("알 수 없는 오류가 발생했습니다.\n앱을 종료한 이후에 재실행 해주세요.")
                return
        }
    }
    const next = () => {
        const detail = {
            openhours: openHours,
            sirenorderhours: sirenOrderAndDT,
            phonenumber,
            parkinginfo,
            waytocome,
            description,
        }

        const validation = RegistValidation.checkDetailInfo({ ...detail })
        if(typeof validation === "boolean") {
            addStoreDetail(detail)
            setChangeForm("last")
        } else alertMessage(validation.type)
    }

    return (
        <div className={bodystyle.middlebody}>
            <span>가게상세정보</span>
            <HourInputBoxes
            leftPlaceholder="평소 개점시간을 입력해주세요."
            rightPlaceholder="평소 마감시간을 입력해주세요."
            setCurrValue={onChangeOpenHours}
            />
            <HourInputBoxes
            leftPlaceholder="사이렌 오더 운영시간을 입력해주세요."
            rightPlaceholder="사이렌오더 마감시간을 입력해주세요."
            placeholderSize="small"
            setCurrValue={onChangesirenOrderAndDT}
            />
            <p id={bodystyle.comment}>시간 옆에 AM, PM을 클릭하여 시간대를 변경 할 수 있습니다.</p>
            <form className={bodystyle.inputform}>
                <input
                value={phonenumber}
                onChange={onChangePhoneNumber}
                placeholder="-를 제외한 매장 대표번호를 입력해주세요."
                maxLength={11}
                />
                <input
                value={parkinginfo}
                onChange={onChangeParkingInfo}
                placeholder="주차 관련 정보를 입력해주세요."
                maxLength={50}
                />
                <input
                value={waytocome}
                onChange={onChangeWaytocome}
                placeholder="고객님이 오시는 길에 알아야 할 정보가 있다면 입력해주세요."
                maxLength={50}
                />
                <input
                value={description}
                onChange={onChangeDescription}
                placeholder="간단한 매장소개를 적어주세요. (기입하지 않아도 됩니다.)"
                maxLength={100}
                />
            <div style={{height: "20px"}}></div>
            </form>
            <TwoSideButton
            prev={onChangeView}
            next={next}
            />
        </div>
    )
}