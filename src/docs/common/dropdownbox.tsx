import dropdownstyle from "../../css/common/dropdown.module.css"

export default function DayAndNightDropdownBox({
    key,
    isOpenHour,
    onChangeOpenDayAndNight,
    onChangeCloseDayAndNight,
} : {
    isOpenHour: boolean,
    onChangeOpenDayAndNight(data: string) : void,
    onChangeCloseDayAndNight(data: string) : void,
    key?: string,
}) {
    return (
        <ul
        className={dropdownstyle.dropdown_wrapper}
        key={key}>
            {
                ["AM", "PM"].map((li) => (
                    <li
                    className={
                        isOpenHour 
                        ? dropdownstyle.dropdown_item_left
                        : dropdownstyle.dropdown_item_right
                    }
                    onClick={
                        (_) => isOpenHour
                        ? onChangeOpenDayAndNight(li)
                        : onChangeCloseDayAndNight(li)
                    }
                    >{li}</li>
                ))
            }
        </ul>
    )
}