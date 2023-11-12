import { ViewBody } from "../type/home.type";
import storestyle from "../css/storestyle.module.css"
import OrderListItem from "./store/order_list_item";
import StoreNotifyListItem from "./store/notify_list_item";

export default function StoreBody({ 
    onChangeView,
    disconnect,
} : { 
    onChangeView(view: ViewBody): void,
    disconnect(): void,
}) {
    const logout = () => {
        disconnect()
        onChangeView("login")
    }
    return (
        <div>
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