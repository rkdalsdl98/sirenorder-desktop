import { useEffect, useState } from "react";
import LoginBody from "../docs/loginbody";
import { ViewBody } from "../type/home.type";
import RegistBody from "../docs/registbody";
import { Socket } from "socket.io-client";
import { SocketLoginBody } from "../socket/socket.type";
import { SocketMethods } from "../socket/methods";
import StoreBody from "../docs/storebody";

export default function Home({} : {}) {
    const [view, setView] = useState<ViewBody>("login")
    const [socket, setSocket] = useState<Socket | undefined>(undefined)

    const connect = (data: SocketLoginBody) => {
        const con = SocketMethods.Connection.connectSocket()
        if(!con || (con && !con.connected)) {
            alert("서버와 연결에 실패했습니다.")
            return
        }
        con.on("error", (err: any) => {
            if("status" in err) {
                if(err.status === 204) alert("로그인 정보가 올바르지 않습니다.")
                else alert(`오류코드: ${err.status}\n${err.message}`)
            } else {
                console.log(err)
            }
            SocketMethods.Connection.disconnect(con)
            setSocket(undefined)
        })
        con.emit('login', {
            merchantId: data.merchantId,
            pass: data.pass,
        } as SocketLoginBody,
        (res: any) => {
            setSocket(con)
            setView("store")
            console.log(res)
        })
    }
    const disconnect = () => {
        if(socket) {
            SocketMethods.Connection.disconnect(socket)
            setSocket(undefined)
        }
    }

    useEffect(() => {
        if(socket) {
            // ...이벤트
        }
    }, [socket])
    switch(view) {
        case "login":
            return ( <LoginBody onChangeView={setView} connect={connect}/> )
        case "regist":
            return ( <RegistBody onChangeView={setView}/>)
        case "store":
            return ( <StoreBody onChangeView={setView} disconnect={disconnect}/> )
    }
}