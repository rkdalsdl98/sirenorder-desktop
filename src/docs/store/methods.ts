import { SocketResponse } from "../../socket/socket.type"
import { Order } from "../../type/order.type"

export namespace StoreCallbackMethods {
    export const order = (
        res: SocketResponse<Order>,
        setState: (order: Order) => void
    ) 
    : { result: boolean, message: string } => {
        try {
            if(res.data) {
                setState(res.data!)
            } else alert("주문알림 등록에 실패했습니다.")
            return {
                result: true,
                message: "done",
            }
        } catch(e) {
            alert(`${e}`)
            return {
                result: false,
                message: "fail",
            }
        }
    }
}