export type PriceArea = 'NO1' | 'NO2' | 'NO3' | 'NO4' | 'NO5'
export type Currency = 'NOK' | 'EUR'
export type EnergyUnit = 'kWh' | 'mWh'

export type VAT = {
    rate: number
    hasVAT: boolean
}

export type PriceUnit = {
    currency: Currency
    vat: VAT
    evnergyUnit: EnergyUnit
}

export type ChargingSessionParameters = {
    powerInKiloWatts: number
    duration: string
}

export type Price = Record<string, number>

export type ForecastSegment = {
    from: string
    to: string
    averagePrice: number
}

export type ForecastAdvice = ForecastSegment & {
    loss: number
    type: 'Avoid' | 'Normal' | 'Good'
}

export type Advice = {
    from: string
    to: string
    type: 'Avoid' | 'Normal' | 'Good'
    cost: number
    averagePrice: number
}

export type SpotPrice = {
    time: string
    price: number
}
