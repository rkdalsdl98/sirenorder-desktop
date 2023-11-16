import * as IO from "socket.io-client"
import { Order } from "../type/order.type"
import { SocketResponse } from "./socket.type"

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
                if(!res.result) throw new Error("주문 취소를 실패했습니다.\n재요청 이후에도 같은 문제가 지속된다면 운영팀에 문의해주세요.")
                callback(after)
            })
    }
}

type ListenerKeys = keyof typeof LISTENERS
type EventKeys = keyof typeof EVENTS
type EventCallback = (...args: any[]) => unknown