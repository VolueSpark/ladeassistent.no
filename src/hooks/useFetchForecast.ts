import { ForecastDTO } from '@/pages/api/forecast/[area]'
import { useCallback } from 'react'

// TODO: allow submission of query params
export default function useFetchForecast() {
    return useCallback(async function useFetchForecast(
        area: string
    ): Promise<ForecastDTO> {
        const response = await fetch(
            `/api/forecast/${area}?currency=NOK&energyUnit=kWh&vatRate=1.25`
        )
        const data = await response.json()

        return data
    },
    [])
}
