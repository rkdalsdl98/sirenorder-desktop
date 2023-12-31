import storestyle from "../../css/storestyle.module.css"
import { Order } from "../../type/order.type"

export default function OrderItem({
    order,
    onOpenDetail,
    onFinishedOrder
}: {
    order: Order,
    onOpenDetail(order: Order, isNotify: boolean): void,
    onFinishedOrder(findId: string): void,
}) {
    const openDetail = () => onOpenDetail(order, false)
    const finishOrder = () => onFinishedOrder(order.uuid)
    return (
        <li id={storestyle.orderlist_item_container}>
            <div id={storestyle.type_wrapper}>
                <span id={storestyle.type}>{
                    order.deliveryinfo[0].take
                    ? "포장 주문"
                    : "매장 취식"
                }</span>
                {
                    order.orderState === "finish"
                    ? <span>처리완료</span>
                    :<div 
                    id={storestyle.button}
                    onClick={finishOrder}
                    ><span>완료</span></div>
                }
            </div>
            <div id={storestyle.order_no_wrapper}>
                <div id={storestyle.no}>주문번호 1</div>
                <div 
                id={storestyle.button}
                onClick={openDetail}
                >
                    <span>주문상세</span>
                </div>
            </div>
        </li>
    )
}