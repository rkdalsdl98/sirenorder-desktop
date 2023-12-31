import storestyle from "../../css/storestyle.module.css"
import { DeliveryInfo, MenuInfo } from "../../type/order.type"
import { useEffect, useState } from "react"

export default function Menu({
    data,
    deliveryInfo,
    totalPrice,
}: {
    data: MenuInfo,
    deliveryInfo: DeliveryInfo,
    totalPrice: number,
}) {
    const [size, setSize] = useState<string>("기본")
    const [packagingMethod, setPackagingMethod] = useState<string>("개인컵")
    
    const changeSize = () => {
        switch(deliveryInfo.size) {
            case "default":
                setSize("기본")
                break
            case "Short":
            case "Tall":
            case "Grande":
            case "Venti":
                setSize(deliveryInfo.size)
                break
        }
    }
    const changePackagingMethod = () => {
        setPackagingMethod(deliveryInfo.packagingMethod)
    }
    const addComma = (num: number) => {
        return num.toLocaleString("ko-KR")
    }

    useEffect(() => {
        changeSize()
        changePackagingMethod()
        console.log(deliveryInfo)
    })
    return (
        <div className={storestyle.menu_container}>
            <div id={storestyle.img_wrapper}>
                <img src={data.thumbnail}></img>
            </div>
            <div id={storestyle.info_container}>
                <div id={storestyle.info_wrapper}>
                    <span>{`${data.name}`}</span>
                    <p>사이즈: {`${size}`}</p>
                    <p>포장 방법: {`${packagingMethod}`}</p>
                    <p>픽업 방법: {`${deliveryInfo.take ? "포장" : "매장취식"}`}</p>
                    <p>수량: {`${data.count}`} 개</p>
                    <span>총 결제금액: {`${addComma(totalPrice)}`} 원</span>
                    {
                        deliveryInfo.tempture === "COLD"
                        ?<div id={storestyle.tempture_ice}>
                            <span>ICE</span>
                        </div>
                        :<div id={storestyle.tempture_hot}>
                            <span>HOT</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}