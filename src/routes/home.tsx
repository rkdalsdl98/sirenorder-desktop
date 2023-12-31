import { useEffect, useRef, useState } from "react";
import LoginBody from "../docs/loginbody";
import { ViewBody } from "../type/home.type";
import RegistBody from "../docs/registbody";
import { Socket } from "socket.io-client";
import { SocketLoginBody, SocketResponse, Wallet } from "../socket/socket.type";
import { SocketMethods } from "../socket/methods";
import StoreBody from "../docs/storebody";
import { FailedResponse, SuccessResponse } from "../type/request.type";

export default function Home() {
    const [view, setView] = useState<ViewBody>("login")
    const [socket, setSocket] = useState<Socket | undefined>(undefined)
    const timerHandler = useRef<NodeJS.Timer | null>(null)
    const getSocket = () => socket
    const connect = (data: SocketLoginBody) => {
        const con = SocketMethods.Connection.connectSocket()
        if(!con) {
            alert("서버와 연결에 실패했습니다.")
            return
        }
        con.on("disconnect", () => {
            disconnect(con)
        })
        con.on("error", (err: SocketResponse<FailedResponse>) => {
            if("data" in err) {
                let message = `오류코드: ${err.data!.status}`
                if(err.data!.substatus) message += `\n${err.data!.substatus}`
                alert(message + `\n${err.data!.message}`)
            } else {
                alert("알 수 없는 오류가 발생 했습니다.\n운영팀에 문의해주세요.")
            }
            disconnect()
        })
        con.emit('login', {
            merchantId: data.merchantId,
            pass: data.pass,
        } as SocketLoginBody,
        (res: SocketResponse<SuccessResponse<Wallet> | FailedResponse>) => {
            if(!("result" in res) || !res.result) {
                alert(res.message)
                SocketMethods
                .Connection
                .disconnect(con)
            } else {
                localStorage.setItem("login-data", JSON.stringify({
                    merchantId: data.merchantId,
                    pass: data.pass,
                }))
                setSocket(con)
                setView("store")
            }
        })
    }
    const addPingPongListener = (socket: Socket) => {
        timerHandler.current = (
            setInterval(() => {
                let received: boolean = false
                socket.emit('ping', { message: 'ping' }, (data: { message: string }) => {
                    received = true
                })
                setTimeout(() => {
                    if(!received) {
                        disconnect()
                    }
                    return
                }, 1000)
        }, 2000))
    }
    const removePingPongListener = () => {
        if(timerHandler.current) {
            clearInterval(timerHandler.current)
        }
    }
    const disconnect = (con?: Socket) => {
        if(socket) {
            SocketMethods.Connection.disconnect(
                con ?? socket
            )
        }
        removePingPongListener()
        setSocket(undefined)
    }

    useEffect(() => {
        if(socket) {
            addPingPongListener(socket)
        }
    }, [socket])
    switch(view) {
        case "login":
            return ( <LoginBody onChangeView={setView} connect={connect}/> )
        case "regist":
            return ( <RegistBody onChangeView={setView}/>)
        case "store":
            return ( 
            <StoreBody
            getSocket={getSocket}
            onChangeView={setView}
            connect={connect}
            disconnect={disconnect}
            connected={socket === undefined ? false : socket.connected}
            /> )
    }
}