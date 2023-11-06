import { ViewBody } from "../type/home.type";
import { useRef, useState } from "react";
import { PageType, RegistRequestBody, StoreDetailInfo, StoreInfo } from "../type/regist.type";
import PassForm from "./registforms/pass.form";
import StoreInfoForm from "./registforms/storeinfo.form";
import DetailInfoForm from "./registforms/detailinfo.form";

export default function RegistBody({ onChangeView } : { onChangeView(view: ViewBody): void }) {
    const [form, setForm] = useState<PageType>("pass")
    const requestbody = useRef<RegistRequestBody>({})

    const addPass = (data: string) => requestbody.current.pass = data
    const addStoreInfo = (data: Omit<StoreInfo, "detail">) => requestbody.current.storeinfo = { 
        ...data,
        detail: requestbody.current.storeinfo?.detail
    }
    const addStoreDetail = (data: StoreDetailInfo) => requestbody.current.storeinfo!.detail = data
    const addImages = (data: string[]) => requestbody.current.storeinfo!.detail!.images = data

    switch(form) {
        case "pass":
        return (
            <PassForm
            setChangeForm={setForm}
            setChangeView={onChangeView}
            addPass={addPass}/>
        )
        case "storeinfo":
        return (
            <StoreInfoForm
            setChangeForm={setForm}
            setChangeView={onChangeView}
            addStoreInfo={addStoreInfo}
            />
        )
        case "detailinfo":
            return (
                <DetailInfoForm
                setChangeForm={setForm}
                setChangeView={onChangeView}
                addStoreDetail={addStoreDetail}
                />
            )
        default:
        return (
            <div>
                <h3>404 NotFound</h3>
                <h4>요청하신 페이지를 찾을 수 없습니다.</h4>
            </div>
        )
    } 
}