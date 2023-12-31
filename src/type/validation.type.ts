export type FailureType<T> = keyof T
export type Failed<T> = {
    readonly result: boolean
    readonly type: FailureType<T>
}
export type ValidationResult<T> = boolean | Failed<T>