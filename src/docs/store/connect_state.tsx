import storestyle from "../../css/storestyle.module.css"

export default function ConnectState({
    connected,
    reConnect,
    closeStore,
} : {
    connected: boolean,
    reConnect(): void,
    closeStore(): void,
}) {
    return (
        <div className={storestyle.connected_container}>
            <div className={storestyle.connected_state_container}>
                <div id={
                    connected 
                    ? storestyle.state_connect
                    : storestyle.state_disconnect
                }></div>
                <span>연결상태</span>
            </div>
            <div 
            id={storestyle.button}
            onClick={closeStore}
            >
                <span>마감하기</span>
            </div>
            {
                connected
                ? <div style={{ display: "none" }}></div>
                : <div 
                    id={storestyle.button}
                    onClick={reConnect}
                    >
                    <span>재연결</span>
                </div>
            }
        </div>
    )
}