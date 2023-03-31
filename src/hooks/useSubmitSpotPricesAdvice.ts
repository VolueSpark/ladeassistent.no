import { SpotPriceAdviceDTO } from '@/pages/api/spot-prices/[area]/advice'
import { useCallback } from 'react'

// TODO: allow submission of body data
export default function useSubmitSpotPricesAdvice() {
    return useCallback(async function useSubmitSpotPricesAdvice(
        area: string
    ): Promise<SpotPriceAdviceDTO | string> {
        const response = await fetch(`/api/spot-prices/${area}/advice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceUnitsParameters: {
                    currency: 'NOK',
                    energyUnit: 'kWh',
                    vatRate: 1.25,
                },
                chargingSessionParameters: {
                    powerInKiloWatts: 3.6,
                    duration: '04:00:00',
                },
                startFrom: new Date().toISOString(),
            }),
        })

        if (response.status !== 200) {
            const error = await response.json()
            return error.message
        }

        const data = await response.json()

        return data
    },
    [])
}
