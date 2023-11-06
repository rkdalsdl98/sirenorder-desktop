import { Hours } from "../../type/regist.type";

export namespace RegistValidation {
    export const hours = (hours: Hours) : boolean => {
        const { open, close } = hours
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
}