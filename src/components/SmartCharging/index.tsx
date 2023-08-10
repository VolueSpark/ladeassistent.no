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
// import { useRouter } from 'next/router'
// import EVCard from './EVCard'

const texts = {
    error: {
        nb: 'Vi kan ikke vise data for øyeblikket grunnet en intern feil i henting av data. Vennligst prøv igjen senere.',
        en: 'Cannot show the component due to an internal error while fetching data. Please try again later.',
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
    const [_ev, setEv] = useState<string>('')
    const [evCapacity, setEvCapacity] = useState<string>('')
    const [chargerCapacity, setChargerCapacity] = useState<string>('')
    const [chargingPercentageStart, setChargingPercentageStart] =
        useState<string>('')
    const [chargingPercentageStop, setChargingPercentageStop] =
        useState<string>('')
    const [_evImage, setEvImage] = useState('')

    // const router = useRouter()

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
        let powerInKiloWatts = 3.6
        let hours = 6
        if (
            evCapacity &&
            chargerCapacity &&
            chargingPercentageStart &&
            chargingPercentageStop
        ) {
            const kWToCharge =
                parseFloat(evCapacity.replaceAll('"', '')) *
                ((parseInt(chargingPercentageStop.replaceAll('"', '')) -
                    parseInt(chargingPercentageStart.replaceAll('"', ''))) /
                    100)

            powerInKiloWatts = parseFloat(chargerCapacity.replaceAll('"', ''))
            hours = Math.ceil(
                kWToCharge / parseFloat(chargerCapacity.replaceAll('"', ''))
            )
        }

        if (region) {
            if (activeComponent === 'adviceGraph') {
                submitSpotPricesAdvice(region, powerInKiloWatts, hours)
            } else if (activeComponent === 'forecastTable') {
                submitForecastAdvice(region, 6)
            }
        }
    }, [
        region,
        activeComponent,
        evCapacity,
        chargingPercentageStart,
        chargingPercentageStop,
        chargerCapacity,
    ])

    useEffect(() => {
        setEv(localStorage.getItem('ev')?.replaceAll('"', '') ?? '')
        setEvCapacity(
            localStorage.getItem('ev_capacity')?.replaceAll('"', '') ?? ''
        )
        setChargerCapacity(
            localStorage.getItem('charger_capacity')?.replaceAll('"', '') ?? ''
        )
        setChargingPercentageStart(
            localStorage
                .getItem('charging_percentage_start')
                ?.replaceAll('"', '') ?? ''
        )
        setChargingPercentageStop(
            localStorage
                .getItem('charging_percentage_stop')
                ?.replaceAll('"', '') ?? ''
        )
        setEvImage(localStorage.getItem('ev_image')?.replaceAll('"', '') ?? '')
    }, [])

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
            {/* {!ev && (
                <Button
                    variant="secondary"
                    value="Legg til bil"
                    icon="/icons/menu.svg"
                    // onClick={() => setMenuVisible(true)}
                    // ref={openRef}
                    onClick={() => router.push('/ev')}
                />
            )}
            {ev && evCapacity && chargerCapacity && (
                <EVCard
                    name={ev}
                    img={evImage}
                    percentageStart={parseInt(chargingPercentageStart)}
                    percentageStop={parseInt(chargingPercentageStop)}
                    charger={parseFloat(chargerCapacity)}
                    onClick={() => router.push('/ev/edit')}
                />
            )} */}
        </div>
    )
}
