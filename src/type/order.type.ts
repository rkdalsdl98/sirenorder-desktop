export interface Order {
    readonly uuid: string
    readonly saleprice: number
    readonly totalprice: number
    readonly store_uid: string
    readonly deliveryinfo: DeliveryInfo
    readonly menus: MenuInfo[]
}
export type DeliveryInfo = {
    readonly memo: string
    readonly take: boolean
    readonly paymenttype: PaymentType
}
export type PaymentType = 
| "virtual-account"
| "none-account"
| "card"
| "paid"
export type MenuInfo = {
    readonly name: string
    readonly price: number
    readonly thumbnail: string
    readonly count: number
    readonly size: MenuSize
    readonly bottle: MenuBottle
    readonly tempture: MenuTempture
}

export type MenuSize = "default" | "mega"
export type MenuBottle = "persornal" | "disposable" | "plastic"
export type MenuTempture = "ice" | "hot"