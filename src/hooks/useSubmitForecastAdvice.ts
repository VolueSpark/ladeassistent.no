import { ForecastAdviceDTO } from '@/pages/api/forecast/[area]/advice'
import { useCallback, useState } from 'react'

// TODO: allow submission of body data
export default function useSubmitForecastAdvice() {
    const [forecastAdvice, setForecastAdvice] = useState<ForecastAdviceDTO>()
    const [forecastAdviceError, setForecastAdviceError] = useState('')
    const [isLoadingForecastAdvice, setIsLoadingForecastAdvice] =
        useState(false)

    const submitForecastAdvice = useCallback(
        async function useSubmitForecastAdvice(
            area: string,
            segmentSize: number
        ): Promise<void> {
            setIsLoadingForecastAdvice(true)
            setForecastAdviceError('')
            const response = await fetch(`/api/forecast/${area}/advice`, {
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
                    segmentOptionsParameters: {
                        segmentSize: segmentSize,
                    },
                }),
            })

            setIsLoadingForecastAdvice(false)

            if (response.status !== 200) {
                const error = await response.json()
                setForecastAdviceError(error.message)
            }

            const data = await response.json()
            setForecastAdvice(data)
        },
        []
    )

    return {
        forecastAdvice,
        forecastAdviceError,
        isLoadingForecastAdvice,
        submitForecastAdvice,
    }
}
