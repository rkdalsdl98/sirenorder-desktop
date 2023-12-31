import bodystyle from "../../css/bodystyle.module.css"

export default function TwoSideButton({
    prev,
    next,
} : {
    prev(): void,
    next(): void 
}) {
    return (
        <div className={bodystyle.twosidewrapper}>
            <div
            className={bodystyle.actionbutton}
            onClick={prev}
            ><p>취소</p></div>
            <div
            className={bodystyle.actionbutton}
            onClick={next}
            ><p>다음</p></div>
        </div>
    )
}