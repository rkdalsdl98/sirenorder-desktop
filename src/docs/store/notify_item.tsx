import { useEffect, useState } from "react"
import storestyle from "../../css/storestyle.module.css"
import { Order } from "../../type/order.type"

export default function StoreNotifyItem({
    order,
    onOpenDetail,
} : {
    order: Order,
    onOpenDetail(order: Order, isNotify: boolean): void,
}) {
    const [totalMenu, setTotalMenu] = useState<number>(0)
    const openDetail = () => onOpenDetail(order, true)

    useEffect(() => {
        let count : number = 0
        order.menus.forEach(m => count += m.count)
        setTotalMenu(count)
    })
    return (
        <li key={order.uuid} id={storestyle.notifylist_item_container}>
            <div id={storestyle.type_wrapper}>
                <span id={storestyle.type}>포장 주문</span>
                <p>{`${totalMenu}개 메뉴 주문`}</p>
            </div>
            <div id={storestyle.square}>
                <div 
                onClick={openDetail}
                id={storestyle.button}
                >
                    <span>주문상세</span>
                </div>
            </div>
        </li>
    )
}