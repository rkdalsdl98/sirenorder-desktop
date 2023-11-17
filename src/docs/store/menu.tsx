import storestyle from "../../css/storestyle.module.css"
import { MenuInfo } from "../../type/order.type"
import { useEffect, useState } from "react"

export default function Menu({
    data,
    totalPrice,
}: {
    data: MenuInfo
    totalPrice: number,
}) {
    const [size, setSize] = useState<string>("기본")
    const [bottle, setBottle] = useState<string>("개인컵")
    
    const changeSize = () => {
        switch(data.size) {
            case "default":
                setSize("기본")
                break
            case "mega":
                setSize("메가")
                break
        }
    }
    const changeBottle = () => {
        switch(data.bottle) {
            case "disposable":
                setBottle("일회용컵")
                break
            case "plastic":
                setBottle("플라스틱컵")
                break
            case "persornal":
                setBottle("개인컵")
                break
        }
    }
    const addComma = (num: number) => {
        return num.toLocaleString("ko-KR")
    }

    useEffect(() => {
        changeSize()
        changeBottle()
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
                    <p>포장 방법: {`${bottle}`}</p>
                    <p>수량: {`${data.count}`} 개</p>
                    <p>개별 가격: {`${addComma(data.price)}`} 원</p>
                    <span>총 결제금액: {`${addComma(totalPrice)}`} 원</span>
                    {
                        data.tempture === "ice"
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