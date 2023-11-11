export type SubStatus = 
| "NotEqualPass" 
| "TypeException" 
| "ForgeryData" 
| "ExpiredToken" 
| "NotValidCode"
| "Duplicated"

export type SuccessResponse<T> = {
    readonly data: T
    readonly status: number
    readonly metadata?: unknown
}
export type FailedResponse = {
    readonly message: string
    readonly status: number
    substatus?: SubStatus
}
export type TryCatch<T, E extends FailedResponse> = SuccessResponse<T> | E
export type Method = 
| "POST"
| "GET"

export const METHOD_OF_SUCCESS_STATUS : Record<Method, number> = {
    "POST": 201,
    "GET": 200,
}

export type RequestExceptionType = 
| "TimeOutException"
| "UnknownException"

export class RequestException {
    constructor(
        readonly exception: RequestExceptionType,
        readonly message: string,
    ){}
}

export type RequestState = "idle" | "wait" | "done" | "fail"