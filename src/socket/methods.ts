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
        export const setUpEvents = (
            socket: IO.Socket,
            events: { event: Events, callback: EventCallback }[],
        ) => events.forEach(e => LISTENERS[e.event](socket, e.callback))
    }
}

const LISTENERS: Record<string, (socket: IO.Socket, callback: EventCallback) => unknown> = {
    "listen-order": (socket: IO.Socket, callback: (...args: any[]) => unknown) => {
        socket.on("order", (res: SocketResponse<Order>) => {
            if(!res.data) throw new Error("주문을 불러오는데 실패했습니다.")
            callback(res)
        })
    }   
}
type Events = keyof typeof LISTENERS
type EventCallback = (...args: any[]) => unknown