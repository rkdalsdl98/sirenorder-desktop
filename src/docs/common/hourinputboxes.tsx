import { useState } from "react"
import bodystyle from "../../css/bodystyle.module.css"
import { PlaceHolerSize } from "../../type/regist.type"
import DayAndNightDropdownBox from "./dropdownbox"

export function HourInputBoxes({
    leftPlaceholder,
    rightPlaceholder,
    placeholderSize,
    setCurrValue,
} : {
    leftPlaceholder: string,
    rightPlaceholder: string,
    setCurrValue(value: Object) : void, 
    placeholderSize?: PlaceHolerSize,
}) {
    const [open, setOpen] = useState<string>("")
    const [openDayAndNight, setOpenDayAndNight] = useState<string>("AM")
    const [close, setClose] = useState<string>("")
    const [closeDayAndNight, setCloseDayAndNight] = useState<string>("PM")
    const [isOpenDropdownView, setOpenDropdownView] = useState(false)
    const [isCloseDropdownView, setCloseDropdownView] = useState(false)

    const handleClickOpenDropdownViewContainer = () => {
        setOpenDropdownView(!isOpenDropdownView)
    }
    const handleBlurOpenDropdownViewContainer = () => {
        setTimeout(() => {
        setOpenDropdownView(false)
        }, 200);
    }
    const handleClickCloseDropdownViewContainer = () => {
        setCloseDropdownView(!isCloseDropdownView)
    }
    const handleBlurCloseDropdownViewContainer = () => {
        setTimeout(() => {
        setCloseDropdownView(false)
        }, 200);
    }
    const onChangeOpen = async (event: any) => {
        const v = event.target.value
        setOpen(`${v}:${openDayAndNight}`)
        setCurrValue({ open: `${v}:${openDayAndNight}`, close })
    }
    const onChangeclose = async (event: any) => {
        const v = event.target.value
        setClose(`${v}:${closeDayAndNight}`)
        setCurrValue({ open, close: `${v}:${closeDayAndNight}` })
    }

    const onChangeOpenDayAndNight = (data: string) => {
        setOpenDayAndNight(data)
        handleClickOpenDropdownViewContainer()
    }
    const onChangeCloseDayAndNight = (data: string) => {
        setCloseDayAndNight(data)
        handleClickCloseDropdownViewContainer()
    }

    return (
        <div className={bodystyle.hours}>
            <div className={bodystyle.openhours}>
                <div id={(placeholderSize === "middle" || placeholderSize === undefined)
                ? bodystyle.placeholder_middle_size
                : (placeholderSize === "small" ? bodystyle.placeholder_small_size
                    : bodystyle.placeholder_large_size)}>
                    <input
                    value={open}
                    placeholder={leftPlaceholder}
                    onChange={onChangeOpen}
                    maxLength={2}
                    type="text"
                    />
                    <h5 style={{ cursor: "pointer" }} onClick={handleClickOpenDropdownViewContainer}>{openDayAndNight}</h5>
                </div>
                <div onBlur={handleBlurOpenDropdownViewContainer}>
                    {isOpenDropdownView 
                    && <DayAndNightDropdownBox 
                    key="storeopen" 
                    isOpenHour={true}
                    onChangeOpenDayAndNight={onChangeOpenDayAndNight}
                    onChangeCloseDayAndNight={onChangeCloseDayAndNight}
                    />}
                </div>
            </div>
            <span>~</span>
            <div className={bodystyle.closehours}>
                <div id={(placeholderSize === "middle" || placeholderSize === undefined)
                ? bodystyle.placeholder_middle_size
                : (placeholderSize === "small" ? bodystyle.placeholder_small_size
                    : bodystyle.placeholder_large_size)}>
                    <input
                    value={close}
                    onChange={onChangeclose}
                    placeholder={rightPlaceholder}
                    maxLength={2}
                    type="text"
                    />
                    <h5 style={{ cursor: "pointer" }} onClick={handleClickCloseDropdownViewContainer}>{closeDayAndNight}</h5>
                </div>
                <div onBlur={handleBlurCloseDropdownViewContainer}>
                    {isCloseDropdownView 
                    && <DayAndNightDropdownBox 
                    key="sirenorder" 
                    onChangeOpenDayAndNight={onChangeOpenDayAndNight}
                    onChangeCloseDayAndNight={onChangeCloseDayAndNight}
                    isOpenHour={false}
                    />}
                </div>
            </div>
        </div>
    )
}