import { ViewBody } from "../type/home.type";
import storestyle from "../css/storestyle.module.css"
import { SocketLoginBody, SocketResponse } from "../socket/socket.type";
import ConnectState from "./store/connect_state";
import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { SocketMethods } from "../socket/methods";
import { Order } from "../type/order.type";
import OrderListItem from "./store/order_list_item";
import StoreNotifyList from "./store/notify_list";
import { StoreCallbackMethods } from "./store/methods";
import sound from "../sounds/dingdong.mp3"
import StoreOrderDetail from "./store/store_order_detail";

export default function StoreBody({ 
    onChangeView,
    getSocket,
    connect,
    disconnect,
    connected,
} : { 
    onChangeView(view: ViewBody): void,
    getSocket(): Socket | undefined,
    connect(data: SocketLoginBody): void
    disconnect(): void,
    connected: boolean,
}) {
    const [orderNotifies, setOrderNotifies] =  useState<Order[]>([])
    const [orders, setOrders] = useState<Order[]>([])
    const [currOrder, setCurrOrder] = useState<Order | undefined>(undefined)
    const bell = useRef<HTMLAudioElement>(null)

    const logout = () => {
        disconnect()
        onChangeView("login")
    }
    const refuseOrder = (notifies: Order[]) => setOrderNotifies(notifies)
    const showDetail = (order: Order) => setCurrOrder(order)
    const closeDetail = () => setCurrOrder(undefined)
    const onRefuseOrder = (removeKey: string) => {
        const socket = getSocket()
        if(!socket) {
            alert("서버와 연결되어있지 않습니다.")
            return
        }

        let order
        const after = orderNotifies.filter(o => {
            if(o.uuid === removeKey) {
                order = o
                return false
            }
            return true
        })

        try {
            SocketMethods
            .Event
            .emitEvent(socket, {
                key: "refuse-order",
                callback: refuseOrder,
            }, order, after)
            closeDetail()
        } catch(e) { alert(`${e}`) }
    }
    const onUpdateOrderNotifies = (order: Order) => {
        if(bell.current) {
            if(!bell.current.paused) {
                bell.current.currentTime = 0
                bell.current.play()
            } else bell.current.play()
        }
        setOrderNotifies([...orderNotifies, order])
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
    const closeStore = () => {
        localStorage.removeItem("login-data")
        disconnect()
        onChangeView("login")
    }   
    useEffect(() => {
        const socket = getSocket()
        if(connected) {
            SocketMethods
            .EventListeners
            .bindListeners(socket!, [
                {
                    key: "listen-order",
                    callback: (res: SocketResponse<Order>) => 
                        StoreCallbackMethods.Listeners.order(res, onUpdateOrderNotifies),
                }
            ])
        }
    })
    return (
        <div className={storestyle.store_container}>
            <audio ref={bell} src={sound}>
            </audio>
            {
                currOrder !== undefined
                ? <StoreOrderDetail 
                order={currOrder}
                onRefuseOrder={onRefuseOrder}
                onCloseDetail={closeDetail}
                />
                : <div style={{display: "none"}}></div>
            }
            <ConnectState
            reConnect={reConnect}
            connected={connected}
            closeStore={closeStore}
            />
            <div className={storestyle.order_container}>
                <div className={storestyle.order_wrapper}>
                    <h1>주문 목록</h1>
                    { orders.map((o, i) => ( <OrderListItem key={i}/> )) }
                    <ul key="order">
                    </ul>
                </div>
                <div className={storestyle.order_wrapper}>
                    <h1>주문 알림</h1>
                    <StoreNotifyList
                    onOpenDetail={showDetail}
                    notifies={orderNotifies}
                    />
                </div>
            </div>
        </div>
    )
}