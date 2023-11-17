import { Order } from "../../type/order.type"
import OrderItem from "./order_item"

export default function OrderList({
    orders,
    onOpenDetail,
}: {
    orders: Order[],
    onOpenDetail(order: Order, isNotify: boolean): void,
}) {
    return (
        <ul key="order">
            {
                orders.map((o, i) => (
                    <div key={i} style={{ width: "inherit", height: "80px" }}>
                         <OrderItem 
                         order={o}
                         onOpenDetail={onOpenDetail}
                         /> 
                    </div>
                ))
            }
        </ul>
    )
}