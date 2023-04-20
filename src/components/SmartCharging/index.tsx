import React, { useEffect, useState } from 'react'
import { PriceArea } from '@/utils/priceArea.helper'
import useLocalStorage from 'use-local-storage'
import { useTranslation } from '@/i18n'
import usePriceArea from '@/src/hooks/usePriceArea'
import { AreaSelector } from '../UI'
import useSubmitForecastAdvice from '@/hooks/useSubmitForecastAdvice'
import useSubmitSpotPricesAdvice from '@/hooks/useSubmitSpotPricesAdvice'
import ForecastTableWrapper from '../ForecastTableWrapper'
import AdviceGraphWrapper from '../AdviceGraphWrapper'

import style from './SmartCharging.module.css'
import ActiveComponentSelector from './ActiveComponentSelector'

const texts = {
    error: {
        nb: 'Vi kan ikke vise data for øyeblikket grunnet en intern feil i henting av data. Vennligst prøv igjen senere.',
        en: 'There was en error rendering component due to an internal failure in fetching data. Please try again later.',
    },
}

type FormProps = {
    area?: PriceArea
    controls?: boolean
}

export type ActiveComponent = 'forecastTable' | 'adviceGraph'

export default function ChargingPlan({ area, controls }: FormProps) {
    const [activeComponent, setActiveComponent] =
        useState<ActiveComponent>('forecastTable')

    const {
        forecastAdvice,
        forecastAdviceError,
        isLoadingForecastAdvice,
        submitForecastAdvice,
    } = useSubmitForecastAdvice()
    const {
        spotPricesAdvice,
        spotPricesAdviceError,
        isLoadingSpotPricesAdvice,
        submitSpotPricesAdvice,
    } = useSubmitSpotPricesAdvice()

    const [region, setRegion] = useLocalStorage<string>('region', '')

    const { getGeolocation, locationError } = usePriceArea(setRegion)
    useEffect(() => {
        if (!locationError) {
            getGeolocation()
        } else {
            console.error(locationError)
        }
    }, [])

    useEffect(() => {
        if (area) setRegion(area)
    }, [area])

    useEffect(() => {
        if (region) {
            if (activeComponent === 'adviceGraph') {
                submitSpotPricesAdvice(region)
            } else if (activeComponent === 'forecastTable') {
                submitForecastAdvice(region)
            }
        }
    }, [region, activeComponent])

    const { t } = useTranslation()

    return (
        <div className={style.experimental_container}>
            {controls && (
                <div className={style.controls_container}>
                    <ActiveComponentSelector
                        value={activeComponent}
                        onChange={(value) =>
                            setActiveComponent(value as ActiveComponent)
                        }
                    />
                    <AreaSelector value={region} onChange={setRegion} />
                </div>
            )}
            {activeComponent === 'adviceGraph' && (
                <>
                    {!isLoadingSpotPricesAdvice && spotPricesAdvice && (
                        <AdviceGraphWrapper data={spotPricesAdvice} />
                    )}
                    {spotPricesAdviceError && <p>{t(texts.error)}</p>}
                </>
            )}
            {activeComponent === 'forecastTable' && (
                <>
                    {!isLoadingForecastAdvice && forecastAdvice && (
                        <ForecastTableWrapper data={forecastAdvice} />
                    )}
                    {forecastAdviceError && <p>{t(texts.error)}</p>}
                </>
            )}
        </div>
    )
}
