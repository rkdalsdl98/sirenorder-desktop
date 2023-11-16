import storestyle from "../../css/storestyle.module.css"
import { Order } from "../../type/order.type"

export default function StoreNotifyItem({
    order,
    onOpenDetail,
} : {
    order: Order,
    onOpenDetail(order: Order): void,
}) {
    const openDetail = () => onOpenDetail(order)
    return (
        <li key={order.uuid} id={storestyle.notifylist_item_container}>
            <div id={storestyle.type_wrapper}>
                <span id={storestyle.type}>포장 주문</span>
                <p>{`${order.menus.length}개 메뉴 주문`}</p>
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