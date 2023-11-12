import * as IO from "socket.io-client"
import { SocketLoginBody } from "./socket.type"

const socket_url = process.env.REACT_APP_SOCKET_URL

export namespace SocketMethods {
    export namespace Connection {
        export const connectSocket = () => {
            if(!socket_url) return
            const socket: IO.Socket = IO.connect(socket_url)
            return socket
        }
        export const disconnect = (socket: IO.Socket) => {
            socket.removeAllListeners()
            socket.disconnect()
        }
    }
}