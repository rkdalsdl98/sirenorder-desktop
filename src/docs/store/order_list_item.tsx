import storestyle from "../../css/storestyle.module.css"

export default function OrderListItem() {
    return (
        <li id={storestyle.orderlist_item_container}>
            <div id={storestyle.type_wrapper}>
                <span id={storestyle.type}>포장 주문</span>
                <div 
                id={storestyle.button}
                ><span>완료</span></div>
            </div>
            <div id={storestyle.order_no_wrapper}>
                <div id={storestyle.no}>주문번호 1</div>
                <div id={storestyle.button}>
                    <span>주문상세</span>
                </div>
            </div>
        </li>
    )
}