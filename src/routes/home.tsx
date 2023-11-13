import { useEffect, useRef, useState } from "react";
import LoginBody from "../docs/loginbody";
import { ViewBody } from "../type/home.type";
import RegistBody from "../docs/registbody";
import { Socket } from "socket.io-client";
import { SocketLoginBody } from "../socket/socket.type";
import { SocketMethods } from "../socket/methods";
import StoreBody from "../docs/storebody";

export default function Home() {
    const [view, setView] = useState<ViewBody>("login")
    const [socket, setSocket] = useState<Socket | undefined>(undefined)
    const timerHandler = useRef<NodeJS.Timer | null>(null)

    const connect = (data: SocketLoginBody) => {
        const con = SocketMethods.Connection.connectSocket()
        if(!con) {
            alert("서버와 연결에 실패했습니다.")
            return
        }
        con.on("disconnect", () => {
            disconnect(con)
        })
        con.on("error", (err: any) => {
            if("status" in err) {
                if(err.status === 204) alert("로그인 정보가 올바르지 않습니다.")
                else alert(`오류코드: ${err.status}\n${err.message}`)
            } else {
                console.log(err)
            }
            disconnect()
        })
        con.emit('login', {
            merchantId: data.merchantId,
            pass: data.pass,
        } as SocketLoginBody,
        (res: any) => {
            if(!("result" in res) || !res.result) {
                alert(res.message)
                SocketMethods.Connection.disconnect(con)
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
                    console.log(`receive ${data.message}`)
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
            onChangeView={setView}
            connect={connect}
            disconnect={disconnect}
            connected={socket === undefined ? false : socket.connected}
            /> )
    }
}