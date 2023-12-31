import storestyle from "../../css/storestyle.module.css"
import { Order } from "../../type/order.type"
import { useEffect, useRef, useState } from "react"
import Menu from "./menu"

export default function StoreOrderDetail({
    order,
    isNotify,
    onAcceptOrder,
    onRefuseOrder,
    onCloseDetail,
} : {
    order: Order,
    isNotify: boolean,
    onAcceptOrder(acceptKey: string): void,
    onRefuseOrder(removeKey: string): void,
    onCloseDetail(): void,
}) {
    const [currIndex, setCurrIndex] = useState<number>(0)
    const prev = useRef<number>(-1)
    const next = useRef<number>(1)

    const acceptOrder = () => onAcceptOrder(order.uuid)
    const refuseOrder = () => onRefuseOrder(order.uuid)
    const moveToPrev = () => {
        --next.current
        setCurrIndex(prev.current--)
    }
    const moveToNext = () => {
        ++prev.current
        setCurrIndex(next.current++)
    }

    return (
        <div className={storestyle.order_detail_wrapper}>
            <div className={storestyle.order_detail_container}>
                <Menu 
                totalPrice={order.totalprice}
                data={order.menus[currIndex]}
                deliveryInfo={order.deliveryinfo[currIndex]}
                />
                <div id={storestyle.buttons}>
                    {
                       isNotify 
                       && <div 
                        id={storestyle.button}
                        onClick={acceptOrder}
                        >
                            <span>확인</span>
                        </div>
                    }
                    {
                        isNotify
                        && <div 
                        id={storestyle.button}
                        onClick={refuseOrder}
                        >
                            <span>거절</span>
                        </div>
                    }
                        <div 
                        id={storestyle.button}
                        onClick={onCloseDetail}
                        >
                            <span>닫기</span>
                        </div>
                </div>
                {
                    prev.current < 0
                    ? <div style={{ display: "none" }}></div>
                    :<div 
                    className={storestyle.arrow_button_left}
                    onClick={moveToPrev}
                    >
                        <span>{"<"}</span>
                    </div>
                }
                {
                    next.current >= order.menus.length
                    ? <div style={{ display: "none" }}></div>
                    :<div 
                    className={storestyle.arrow_button_right}
                    onClick={moveToNext}
                    >
                        <span>{">"}</span>
                    </div>
                }
            </div>
        </div>
    )
}