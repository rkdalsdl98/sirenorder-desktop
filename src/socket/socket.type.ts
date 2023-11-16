export type SocketLoginBody = {
    readonly merchantId: string
    readonly pass: string
}
export type SocketResponse<T> = {
    readonly result: boolean
    readonly message: string
    readonly data?: T
}
export type Wallet = {
    readonly sales: Sales[]
}
export type Sales = {
    readonly id?: number
    readonly amounts: number
    readonly menuinfo: any
    readonly salesdate: string
}