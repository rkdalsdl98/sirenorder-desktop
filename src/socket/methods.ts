import * as IO from "socket.io-client"
import { Order } from "../type/order.type"
import { SocketResponse } from "./socket.type"
import { FailedResponse } from "../type/request.type"

const socket_url = process.env.REACT_APP_SOCKET_URL

export namespace SocketMethods {
    export namespace Connection {
        export const connectSocket = () => {
            if(!socket_url) return
            const socket: IO.Socket = IO.connect(socket_url, {
                reconnection: false,
            })
            return socket
        }
        export const disconnect = (socket: IO.Socket) => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }
    export namespace EventListeners {
        export const bindListeners = (
            socket: IO.Socket,
            listeners: { key: ListenerKeys, callback: EventCallback }[],
        ) => listeners.forEach(e => LISTENERS[e.key](socket, e.callback))
    }
    export namespace Event {
        export const emitEvent = (
            socket: IO.Socket,
            event: { key: EventKeys, callback: EventCallback },
            ...args: any[]
        ) => EVENTS[event.key](socket, event.callback, args)
    }
}

const LISTENERS: Record<string, (socket: IO.Socket, callback: EventCallback) => unknown> = {
    "listen-order": (socket: IO.Socket, callback: EventCallback) => {
        socket.on("order", (res: SocketResponse<Order>) => {
            if(!res.data) throw new Error("주문을 불러오는데 실패했습니다.")
            callback(res)
        })
    }
}
const EVENTS: Record<string, (socket: IO.Socket, callback: EventCallback, ...args: any[]) => unknown> = {
    "refuse-order": (socket: IO.Socket, callback: EventCallback, ...args: any[]) => {
        if(args.length < 1 || args[0][1] === undefined) {
            alert("주문취소 정보를 읽어오는데 실패 했습니다.")
            return
        }
        const [removeOrder, after] = args[0]
        socket.emit(
            "refuse-order", 
            removeOrder as Order,
            (res: SocketResponse<any>) => {
                if(!res.result) {
                    if(res.data && "message" in res.data) {
                        const err = res.data as FailedResponse
                        let message = `오류코드 ${err.status}\n`
                        if(err.substatus) message += err.substatus
                        throw message + err.message
                    }
                    throw "알 수 없는 오류가 발생했습니다."
                }
                callback(after)
            })
    },
    "accept-order": (socket: IO.Socket, callback: EventCallback, ...args: any[]) => {
        if(args.length < 1) {
            alert("주문취소 정보를 읽어오는데 실패 했습니다.")
            return
        }
        const [orderId, order, notifies] = args[0]
        socket.emit(
            "accept-order",
            orderId as string,
            (res: SocketResponse<any>) => {
                if(!res.result) {
                    if("message" in res.data) {
                        const err = res.data as FailedResponse
                        let message = `오류코드 ${err.status}\n`
                        if(err.substatus) message += err.substatus
                        throw message + err.message
                    }
                    throw "알 수 없는 오류가 발생했습니다."
                }
                callback(notifies, order)
            }
        )
    },
}

type ListenerKeys = keyof typeof LISTENERS
type EventKeys = keyof typeof EVENTS
type EventCallback = (...args: any[]) => unknown