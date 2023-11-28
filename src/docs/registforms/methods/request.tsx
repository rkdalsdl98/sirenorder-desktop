import { 
    FailedResponse, 
    Method, 
    RequestException, 
    SuccessResponse,
} from "../../../type/request.type"

export namespace RegistRequest {
    const url : string | undefined = process.env.REACT_APP_FETCH_URL

    /**
     * resolve에서도 오류가 반환될 수 있지만 해당 오류는 서버측에서 보낸 오류이고,
     * 
     * reject로 반환되는 오류는 클라이언트에서 요청 차단 or 
     * 기타 알 수 없는 오류에 경우에 발생합니다.
     * @param body 
     * @param method 
     * @param route "/route1/route2/..."
     * @returns Promise
     */
    export const fetchRequest = (
        method: Method,
        route: string,
        body?: Object,
    ) => {
        return new Promise<SuccessResponse<any> | FailedResponse>(async (resolve, reject)=> {
            const controller = new AbortController()
            const signal = controller.signal
            let done : boolean = false
            setTimeout(() => {
                if(!done) {
                    controller.abort()
                    reject(new RequestException("TimeOutException", "요청시간이 초과되었습니다."))
                }
            }, 10000)
            await fetch(`${url}${route}`, {
                method,
                signal,
                body: body === undefined ? undefined : JSON.stringify({ data: body }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(data => {
                if("status" in data) {
                    resolve(data)
                } else reject(new RequestException("UnknownException", "알 수 없는 오류가 발생했습니다."))
            })
            .catch(err => {
                console.log(err)
                reject(new RequestException("UnknownException",  "알 수 없는 오류가 발생했습니다."))
            })
        })
    }
}