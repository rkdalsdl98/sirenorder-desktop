import { SocketResponse } from "../../socket/socket.type"
import { Order } from "../../type/order.type"

export namespace StoreCallbackMethods {
    export namespace Listeners {
        export const order = (
            res: SocketResponse<Order>,
            setState: (order: Order) => void
        )=> {
            try {
                if(res.data) {
                    setState(res.data!)
                } else alert("자동 주문알림 등록에 실패했습니다.\n새로고침 버튼을 눌러 주세요.")
            } catch(e) { alert(`${e}`) }
    
        }
    }
}