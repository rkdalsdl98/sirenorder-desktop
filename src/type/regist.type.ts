export type RegistRequestBody = {
    pass?: string
    storeinfo?: StoreInfo
}

export type StoreInfo = {
    storename?: string
    address?: string
    thumbnail?: string
    detail?: StoreDetailInfo
}

export type Hours = {
    open?: string
    close?: string
}

export type StoreDetailInfo = {
    openhours?: Hours
    sirenorderhours?: Hours
    phonenumber?: string
    parkinginfo?: string
    waytocome?: string
    images?: string[]
    description?: string
}

export type PageType = "pass" | "storeinfo" | "detailinfo" | "subimage" | "last"
export type PlaceHolerSize = "small" | "middle" | "large"
export type UUIDS = {
    merchant?: string, 
    store?: string, 
    wallet?: string,
}