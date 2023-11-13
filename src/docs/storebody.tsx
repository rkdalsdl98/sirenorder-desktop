import { ViewBody } from "../type/home.type";
import storestyle from "../css/storestyle.module.css"
import OrderListItem from "./store/order_list_item";
import StoreNotifyListItem from "./store/notify_list_item";
import { SocketLoginBody } from "../socket/socket.type";
import StoreOrderDetail from "./store/store_order_detail";


export default function StoreBody({ 
    onChangeView,
    connect,
    disconnect,
    connected,
} : { 
    onChangeView(view: ViewBody): void,
    connect(data: SocketLoginBody): void
    disconnect(): void,
    connected: boolean,
}) {
    const logout = () => {
        disconnect()
        onChangeView("login")
    }
    const reConnect = () => {
        const cache = localStorage.getItem("login-data")
        if(cache) {
            const json : SocketLoginBody = JSON.parse(cache)
            connect(json)
            return
        } else {
            alert("브라우저에 저장된 정보가 없습니다.\n처음화면으로 돌아갑니다.")
            onChangeView("login")
            return
        }
    }
    return (
        <div className={storestyle.store_container}>
            {/* <StoreOrderDetail/> */}
            <div className={storestyle.connected_container}>
                <div className={storestyle.connected_state_container}>
                    <div id={
                        connected 
                        ? storestyle.state_connect
                        : storestyle.state_disconnect
                    }></div>
                    <span>연결상태</span>
                </div>
                {
                    connected
                    ? <div style={{ display: "none" }}></div>
                    : <div 
                        id={storestyle.button}
                        onClick={reConnect}
                        >
                        <span>재연결</span>
                      </div>
                }
            </div>
            <div className={storestyle.order_container}>
                <div className={storestyle.order_wrapper}>
                    <h1>주문 목록</h1>
                    <ul>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                        <OrderListItem/>
                    </ul>
                </div>
                <div className={storestyle.order_wrapper}>
                    <h1>주문 알림</h1>
                    <ul>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                        <StoreNotifyListItem/>
                    </ul>
                </div>
            </div>
        </div>
    )
}