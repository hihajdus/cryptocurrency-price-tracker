export interface Base {
    asset_id_base: string,
    rates: Rate[]
}
export interface Rate {
    asset_id_quote: string,
    rate: number,
    time: string
}