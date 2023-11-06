import { ViewBody } from "../../type/home.type";
import { Hours, PageType, SirenOrderHours, StoreDetailInfo } from "../../type/regist.type";
import bodystyle from "../../css/bodystyle.module.css"
import TwoSideButton from "../common/twosidebutton";
import { HourInputBoxes } from "../common/hourinputboxes";
import { useState } from "react";
import { RegistValidation } from "./validation";

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
    const [sirenOrderAndDT, setSirenOrderAndDT] = useState<SirenOrderHours>({})
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [parkingInfo, setParkingInfo] = useState<string>("")
    const [waytocome, setWaytocome] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const onChangeOpenHours = (hours: Hours) => setOpenHours(hours)
    const onChangesirenOrderAndDT = (hours: Hours) => setSirenOrderAndDT({ sirenorder: hours })
    const onChangePhoneNumber = (event: any) => setPhoneNumber(event.target.value)
    const onChangeParkingInfo = (event: any) => setParkingInfo(event.target.value)
    const onChangeWaytocome = (event: any) => setWaytocome(event.target.value)
    const onChangeDescription = (event: any) => setDescription(event.target.value)
    
    const onChangeView = () => setChangeView("login")
    const validation = () => {

    }

    const next = () => {
        if(RegistValidation.hours(openHours)) {
            console.log(openHours)
        }
        // addStoreDetail({
        //     openhour: openHours,
        //     sirenorderhours: sirenOrderAndDT,
        //     phonenumber: phoneNumber,
        //     waytocome,
        //     description,
        // })
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
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                placeholder="-를 제외한 매장 대표번호를 입력해주세요."
                maxLength={11}
                />
                <input
                value={parkingInfo}
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