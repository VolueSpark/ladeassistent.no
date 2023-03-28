export const priceAreas = ['NO1', 'NO2', 'NO3', 'NO4', 'NO5'] as const

export type PriceArea = typeof priceAreas[number]

export function isPriceArea(area: string): area is PriceArea {
    return priceAreas.includes(area as PriceArea)
}
