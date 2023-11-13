import storestyle from "../../css/storestyle.module.css"
import testimg from "../../css/images/testimg.png"

export default function StoreOrderDetail() {
    return (
        <div className={storestyle.order_detail_wrapper}>
            <div className={storestyle.order_detail_container}>
                <div id={storestyle.img_wrapper}>
                    <img src={testimg}></img>
                </div>
                <div id={storestyle.info_container}>
                    <div id={storestyle.info_wrapper}>
                        <span>아메리카노</span>
                        <p>사이즈: 기본</p>
                        <p>포장 방법: 개인컵</p>
                        <p>수량: 2 개</p>
                        <p>결제금액: 4,000 원</p>
                        <div id={storestyle.tempture_ice}>
                            <span>아이스</span>
                        </div>
                    </div>
                </div>
                <div id={storestyle.button}>
                    <span>닫기</span>
                </div>
                <div className={storestyle.arrow_button_left}>
                    <span>{"<"}</span>
                </div>
                <div className={storestyle.arrow_button_right}>
                    <span>{">"}</span>
                </div>
            </div>
        </div>
    )
}