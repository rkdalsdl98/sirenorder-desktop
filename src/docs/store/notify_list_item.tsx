import storestyle from "../../css/storestyle.module.css"

export default function StoreNotifyListItem() {
    return (
        <li id={storestyle.notifylist_item_container}>
            <div id={storestyle.type_wrapper}>
                <span id={storestyle.type}>포장 주문</span>
                <div className={storestyle.button_container}>
                    <div 
                    id={storestyle.button}
                    ><span>확인</span></div>
                    <div 
                    id={storestyle.button}
                    ><span>거절</span></div>
                </div>
            </div>
            <div id={storestyle.square}>
                <div id={storestyle.button}>
                    <span>주문상세</span>
                </div>
            </div>
        </li>
    )
}