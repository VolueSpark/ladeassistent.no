import { ForecastAdviceDTO } from '@/pages/api/forecast/[area]/advice'
import { useCallback } from 'react'

// TODO: allow submission of body data
export default function useSubmitForecastAdvice() {
    return useCallback(async function useSubmitForecastAdvice(
        area: string
    ): Promise<ForecastAdviceDTO> {
        const response = await fetch(`/api/forecast/${area}/advice`, {
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
                segmentOptionsParameters: {
                    segmentSize: 6,
                },
            }),
        })
        const data = await response.json()

        return data
    },
    [])
}
