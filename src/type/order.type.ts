export interface Order {
    readonly uuid: string
    readonly imp_uid: string
    readonly saleprice: number
    readonly totalprice: number
    readonly store_uid: string
    readonly deliveryinfo: DeliveryInfo[]
    readonly menus: MenuInfo[]
    orderState?: OrderState
}
export type DeliveryInfo = {
    readonly memo: string
    readonly take: boolean
    readonly paymenttype: PaymentType
    readonly size: MenuSize
    readonly packagingMethod: PackagingMethod
    readonly tempture: MenuTempture
}
export type PaymentType = 
| "virtual-account"
| "none-account"
| "card"
| "paid"
export type MenuInfo = {
    readonly name: string
    readonly en_name: string
    readonly price: number
    readonly thumbnail: string
    readonly count: number
}

export type MenuSize = "default" | "Short" | "Tall" | "Grande" | "Venti"
export type PackagingMethod = "개인컵" | "매장컵" | "일회용컵"
export type MenuTempture = "COLD" | "HOT"

export type OrderState = "cooking" | "finish"