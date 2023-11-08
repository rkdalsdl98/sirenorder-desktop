export type RegistRequestBody = {
    pass?: string
    storeinfo?: StoreInfo
}

export type StoreInfo = {
    storename?: string
    storeaddress?: string
    thumbnail?: string
    detail?: StoreDetailInfo
}

export type Hours = {
    open?: string
    close?: string
}

export type SirenOrderHours = {
    sirenorder?: Hours
    dt?: Hours
}

export type StoreDetailInfo = {
    hours?: { openhours: Hours, sirenorderhours: SirenOrderHours }
    phonenumber?: string
    parkinginfo?: string
    waytocome?: string
    images?: string[]
    description?: string
}

export type PageType = "pass" | "storeinfo" | "detailinfo" | "subimage" | "last"
export type PlaceHolerSize = "small" | "middle" | "large"