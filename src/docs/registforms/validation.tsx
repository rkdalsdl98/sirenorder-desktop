import { Hours, StoreDetailInfo, StoreInfo } from "../../type/regist.type";
import { ValidationResult } from "../../type/validation.type";

export namespace RegistValidation {
    export const checkHours = (
        hours: Hours | Hours[]
    ) : boolean => {
        if(Array.isArray(hours)) {
            return hours.every(v => isHours(v))
        } else {
            return isHours(hours)
        }
    }
    export const isHours = (hours: Hours) : boolean => {
        let { open, close } = hours
        open = open?.split(":")[0]
        close = close?.split(":")[0]
        if((open 
        && /^[0-9]{1,2}$/.test(open)
        && parseInt(open) <= 12)
        && (close 
        && /^[0-9]{1,2}$/.test(close)
        && parseInt(close) <= 12)) {
            return true
        }
        return false
    }
    export const pass = (str: string) : boolean => {
        return /[0-9a-zA-Z]/.test(str)
        && /[\!\`\~\@\#\$\%\^\&\*\_\+\=\/\>\<\?]{1,}/.test(str)
    }
    export const checkFileFormat = (
        file: File | File[],
    ) : boolean => {
        if(Array.isArray(file)) {
            return file.every(f => {
                const splitFile = f.name.split(".")
                const format = splitFile[splitFile.length - 1]
                return isImageFile(format)
            })
        } else {
            const splitFile = file.name.split(".")
            const format = splitFile[splitFile.length - 1]
            return isImageFile(format)
        }
    }
    export const isImageFile = (format: string) : boolean => {
        switch(format) {
            case "png":
            case "jpg":
            case "jpeg":
                return true
            default:
                return false
        }
    }
    export const isPhonenumber = (number: string) : boolean => {
        return number.length === 11 && /^[0-9]{3}[0-9]{4}[0-9]{4}$/.test(number)
    }
    export const isValidStoreName = (name: string) : boolean => {
        return /^[ㄱ-ㅎ가-힣a-z-A-Z]{1,20}$/.test(name)
    }
    export const checkInfo = (info: {
        storename: string,
        thumbnail?: string,
    }) : ValidationResult<Omit<StoreInfo, "detail" | "storeaddress">> => {
        // 검증별 메시지를 나누기 위함
        if(!isValidStoreName(info.storename)) 
            return { result: false, type: "storename" }
        if(info.thumbnail === undefined)
            return { result: false, type: "thumbnail" }
        return true
    }
    export const checkDetailInfo = (detail: {
        hours: Hours | Hours[],
        phonenumber: string,
        description?: string,
    }) : ValidationResult<Omit<
    StoreDetailInfo,
    | "parkinginfo"
    | "waytocome"
    | "images"
    >> => {
        // 검증별 메시지를 나누기 위함
        if(!checkHours(detail.hours))
            return { result: false, type: "hours" }
        if(!isPhonenumber(detail.phonenumber))
            return { result: false, type: "phonenumber" }
        if(detail.description
        && detail.description.length > 100) {
            return { result: false, type: "description" }
        }

        return true
    }
}