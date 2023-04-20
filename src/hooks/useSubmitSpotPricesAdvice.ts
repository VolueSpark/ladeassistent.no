import { SpotPriceAdviceDTO } from '@/pages/api/spot-prices/[area]/advice'
import { useCallback, useState } from 'react'

// TODO: allow submission of body data
export default function useSubmitSpotPricesAdvice() {
    const [spotPricesAdvice, setSpotPricesAdvice] =
        useState<SpotPriceAdviceDTO>()
    const [spotPricesAdviceError, setSpotPricesAdviceError] = useState('')
    const [isLoadingSpotPricesAdvice, setIsLoadingSpotPricesAdvice] =
        useState(false)

    const submitSpotPricesAdvice = useCallback(
        async function useSubmitSpotPricesAdvice(area: string): Promise<void> {
            setIsLoadingSpotPricesAdvice(true)
            setSpotPricesAdviceError('')
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

            setIsLoadingSpotPricesAdvice(false)

            if (response.status !== 200) {
                const error = await response.json()
                setSpotPricesAdviceError(error.message)
            }

            const data = await response.json()

            setSpotPricesAdvice(data)
        },
        []
    )

    return {
        spotPricesAdvice,
        spotPricesAdviceError,
        isLoadingSpotPricesAdvice,
        submitSpotPricesAdvice,
    }
}
