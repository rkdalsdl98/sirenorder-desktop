import { Order } from "../../type/order.type"
import StoreNotifyItem from "./notify_item"

export default function StoreNotifyList({
    notifies,
    onOpenDetail,
} : {
    notifies: Order[],
    onOpenDetail(order: Order, isNotify: boolean): void,
}) {
    return (
        <ul key="notify">
            {
                notifies.map((n, i) => (
                    <div key={i} style={{ width: "inherit", height: "80px" }}>
                        <StoreNotifyItem 
                        order={n}
                        onOpenDetail={onOpenDetail}
                        />
                    </div>
                ))
            }
        </ul>
    )
}