import React, { useEffect } from 'react'

import style from './chargingPlan.module.css'
import { PriceArea } from '@/utils/priceArea.helper'
import useLocalStorage from 'use-local-storage'
import {
    AdviceGraph,
    // DailyOverview,
    ForecastTable,
} from '@voluespark/spark.elements'
import { useTranslation } from '@/i18n'
import { texts } from './texts'
import usePriceArea from '@/src/hooks/usePriceArea'
import { InfoText, ChargeNow, AreaSelector } from '../UI'
import useSubmitForecastAdvice from '@/hooks/useSubmitForecastAdvice'
import useSubmitSpotPricesAdvice from '@/hooks/useSubmitSpotPricesAdvice'
// import useFetchSpotPrices from '@/hooks/useFetchSpotPrices'
// import { SpotPricesDTO } from '@/pages/api/spot-prices/[area]'

type FormProps = {
    area?: PriceArea
    controls?: boolean
}

// TODO: update with region selection
export default function ChargingPlan({ area, controls }: FormProps) {
    const {
        forecastAdvice,
        forecastAdviceError,
        isLoadingForecastAdvice,
        submitForecastAdvice,
    } = useSubmitForecastAdvice()
    // const fetchSpotPrices = useFetchSpotPrices()
    const {
        spotPricesAdvice,
        spotPricesAdviceError,
        isLoadingSpotPricesAdvice,
        submitSpotPricesAdvice,
    } = useSubmitSpotPricesAdvice()
    const [region, setRegion] = useLocalStorage<string>('region', '')
    // const [spotPrices, setSpotPrices] = useState<SpotPricesDTO>()
    // const [prices, setPrices] = useState<
    //     {
    //         time: string
    //         price: number
    //     }[]
    // >()

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
            submitSpotPricesAdvice(region)
            submitForecastAdvice(region)
        }
    }, [region])

    // useEffect(() => {
    //     if (spotPrices) {
    //         const priceKeys = Object.keys(spotPrices.prices)
    //         const priceValues = spotPrices.prices
    //         const priceArray: { time: string; price: number }[] = priceKeys.map(
    //             (key) => ({ time: key, price: priceValues[key] })
    //         )
    //         setPrices(priceArray)
    //     }
    // }, [spotPrices])

    const { t } = useTranslation()

    return (
        <div className={style.experimental_container}>
            {controls && <AreaSelector value={region} onChange={setRegion} />}
            {!isLoadingForecastAdvice && !isLoadingSpotPricesAdvice && (
                <>
                    {spotPricesAdvice && (
                        <>
                            <ChargeNow
                                price={
                                    spotPricesAdvice.spotPrices
                                        .slice(0, 4)
                                        .reduce(
                                            (acc, cur) => acc + cur.price,
                                            0
                                        ) * 3.6
                                }
                                now={{
                                    from:
                                        spotPricesAdvice.spotPrices[0].time ??
                                        '',
                                    to:
                                        spotPricesAdvice.spotPrices[3].time ??
                                        '',
                                    cost:
                                        spotPricesAdvice.spotPrices
                                            .slice(0, 4)
                                            .reduce(
                                                (acc, cur) => acc + cur.price,
                                                0
                                            ) * 3.6,
                                    type: 'Now',
                                }}
                                priceUnit={t(texts.nok)}
                                details={t(texts.details)}
                            />
                            <InfoText>{t(texts.estimation)}</InfoText>
                            <hr />
                        </>
                    )}
                    {spotPricesAdvice && (
                        <>
                            {/* // TODO: remove this div */}
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <h3>{t(texts.spot_price)}</h3>
                                <div className={style.graph_container}>
                                    <AdviceGraph
                                        initialHeight={600}
                                        data={spotPricesAdvice.spotPrices}
                                        advice={spotPricesAdvice.advice}
                                        priceUnit="øre"
                                        energyUnit="kWh"
                                        legend={{
                                            Now: t(texts.legend.now),
                                            Best: t(texts.legend.best),
                                            Worst: t(texts.legend.worst),
                                            Avoid: t(texts.legend.avoid),
                                            Unknown: '',
                                            Normal: '',
                                            Good: '',
                                        }}
                                        daysLabelText={{
                                            today: t(texts.daysLabelText.today),
                                            tomorrow: t(
                                                texts.daysLabelText.tomorrow
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                            <InfoText>{t(texts.infoText.spot_price)}</InfoText>
                        </>
                    )}

                    <hr />

                    {/*prices && (
                        // TODO: remove this div
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <h3>{t(chargingPlanTexts.new.overview)}</h3>
                            <div
                                style={{
                                    width: '85%',
                                    display: 'flex',
                                    justifyContent: 'end',
                                    minHeight: '500px',
                                    marginLeft: 'auto',
                                }}
                            >
                                <DailyOverview
                                    data={prices.slice(0, 24).map((p) => ({
                                        time: p.time,
                                        price: p.price * 100,
                                    }))}
                                />
                            </div>
                        </div>
                    )*/}
                    {forecastAdvice && (
                        <>
                            {/* // TODO: remove this div */}
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <h3>{t(texts.forecast)}</h3>
                                <ForecastTable
                                    data={forecastAdvice.forecastAdvice.map(
                                        (f) => ({
                                            ...f,
                                            averagePrice: f.averagePrice * 100,
                                        })
                                    )}
                                    legend={{
                                        good: t(texts.legend.good),
                                        avoid: t(texts.legend.avoid),
                                    }}
                                />
                            </div>
                            <InfoText>{t(texts.infoText.forecast)}</InfoText>
                        </>
                    )}
                </>
            )}
            {(spotPricesAdviceError || forecastAdviceError) && (
                <p>
                    There was en error rendering component due to failure in
                    fetching data.{' '}
                </p>
            )}
        </div>
    )
}
