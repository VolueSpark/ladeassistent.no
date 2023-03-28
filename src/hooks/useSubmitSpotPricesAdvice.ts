import { SpotPriceAdviceDTO } from '@/pages/api/spot-prices/[area]/advice'
import { useCallback } from 'react'

// TODO: allow submission of body data
export default function useSubmitSpotPricesAdvice() {
    return useCallback(async function useSubmitSpotPricesAdvice(
        area: string
    ): Promise<SpotPriceAdviceDTO> {
        const response = await fetch(`/api/spot-prices/${area}/advice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceUnitParameters: {
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
        const data = await response.json()

        return data
    },
    [])
}
