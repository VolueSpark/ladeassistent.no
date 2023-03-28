import { SpotPricesDTO } from '@/pages/api/spot-prices/[area]'
import { useCallback } from 'react'

export default function useFetchSpotPrices() {
    return useCallback(async function useFetchSpotPrices(
        area: string
    ): Promise<SpotPricesDTO> {
        const response = await fetch(
            `/api/spot-prices/${area}?currency=NOK&energyUnit=kWh&vatRate=1.25`
        )
        const data = await response.json()

        return data
    },
    [])
}
