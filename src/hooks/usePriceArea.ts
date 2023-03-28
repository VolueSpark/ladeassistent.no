import {
    isOkPriceAreaResponse,
    PriceAreaRequest,
    PriceAreaResponse,
} from '@/pages/api/price-area'
import { useState } from 'react'

export default function usePriceArea(setPriceArea: (arg0: string) => void) {
    const [locationError, setLocationError] = useState<string>()

    const getGeolocation = () => {
        const geo = navigator.geolocation
        if (!geo) {
            return
        }
        geo.getCurrentPosition(onLocation, onLocationError)
    }

    const onLocation = async (position: GeolocationPosition) => {
        const payload: PriceAreaRequest = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }
        let res = await fetch('/api/price-area', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        const data: PriceAreaResponse = await res.json()

        if (isOkPriceAreaResponse(data)) {
            if (data.priceArea) {
                setPriceArea(data.priceArea)
            }
        } else {
            setLocationError(data.errors.join(', '))
        }
    }
    const onLocationError = (error: GeolocationPositionError) => {
        setLocationError(error.message)
    }

    return { getGeolocation, locationError }
}
