import { ViewBody } from "../type/home.type";
import storestyle from "../css/storestyle.module.css"
import { SocketLoginBody, SocketResponse } from "../socket/socket.type";
import ConnectState from "./store/connect_state";
import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { SocketMethods } from "../socket/methods";
import { Order } from "../type/order.type";
import StoreNotifyList from "./store/notify_list";
import { StoreCallbackMethods } from "./store/methods";
import sound from "../sounds/dingdong.mp3"
import StoreOrderDetail from "./store/store_order_detail";
import OrderList from "./store/order_list";

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
    const [isNotify, setIsNotify] = useState<boolean>(false)

    const bell = useRef<HTMLAudioElement>(null)

    const onFinishedOrder = (findId: string) => {
        const socket = getSocket()
        if(!socket) {
            alert("서버와 연결되어있지 않습니다.")
            return
        }

        const order = orders.find(o => o.uuid === findId)
        if(order === undefined) {
            alert("존재하지 않는 주문입니다.")
            return;
        }
        try {
            SocketMethods
            .Event
            .emitEvent(socket, {
                key: "finish-order",
                callback: finishOrder,
            }, order)
        } catch(e) { alert(`${e}`) }
    }
    const finishOrder = (order: Order) => {
        order.orderState = "finish"
        const after = orders.filter(o => o.uuid !== order.uuid)
        setOrders([...after, order])
    }
    const refuseOrder = (notifies: Order[]) => setOrderNotifies(notifies)
    const acceptOrder = (notifies: Order[], order: Order) => {
        setOrderNotifies(notifies)
        setOrders([...orders, order])
        closeDetail()
    }
    const showDetail = (order: Order, isNotify: boolean) => {
        setCurrOrder(order)
        setIsNotify(isNotify)
    }
    const closeDetail = () => setCurrOrder(undefined)
    const onAcceptOrder = (acceptKey: string) => {
        const socket = getSocket()
        if(!socket) {
            alert("서버와 연결되어있지 않습니다.")
            return
        }

        let order
        const notifies = orderNotifies.filter(o => {
            if(o.uuid === acceptKey) {
                order = o
                return false
            }
            return true
        })

        try {
            SocketMethods
            .Event
            .emitEvent(socket, {
                key: "accept-order",
                callback: acceptOrder,
            }, acceptKey, order, notifies)
        } catch(e) { alert(`${e}`) }
    }
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
        order.orderState = "cooking"
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
                        StoreCallbackMethods
                        .Listeners
                        .order(res, onUpdateOrderNotifies),
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
                isNotify={isNotify} 
                order={currOrder}
                onAcceptOrder={onAcceptOrder}
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
                    <OrderList
                    onOpenDetail={showDetail}
                    onFinishedOrder={onFinishedOrder}
                    orders={orders}
                    />
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