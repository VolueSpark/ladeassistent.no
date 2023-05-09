import { Button, Range } from '@voluespark/spark.elements'

import style from './interval.module.css'
import { texts } from './texts'
import { useTranslation } from '@/i18n'
import useLocalStorage from 'use-local-storage'
import { useEffect, useState } from 'react'

type IntervalProps = {
    controlsValue: string
    controlsOnClick: () => void
    range?: Array<number>
}

export default function Interval({
    controlsValue,
    controlsOnClick,
    range,
}: IntervalProps) {
    const [_chargingPercentageStart, setChargingPercentageStart] =
        useLocalStorage<string>('charging_percentage_start', '')
    const [_chargingPercentageStop, setChargingPercentageStop] =
        useLocalStorage<string>('charging_percentage_stop', '')

    // TODO: use values from local storage
    const [chargingRange, setchargingRange] = useState<Array<number>>(
        range?.length ? range : [10, 80]
    )

    useEffect(() => {
        setChargingPercentageStart(chargingRange[0].toString())
        setChargingPercentageStop(chargingRange[1].toString())
    }, [chargingRange])

    const { t } = useTranslation()

    return (
        <div className={style.container}>
            <div>
                <p className={style.header}>
                    {t(texts.first)} <b>{t(texts.second)}</b>
                </p>
                <p>{t(texts.info)}</p>
            </div>
            <div>
                <Range
                    id="charging_percentage"
                    minValue={0}
                    maxValue={100}
                    value={chargingRange}
                    onChange={(value) => setchargingRange(value)}
                    labels={{
                        left: '0%',
                        center: '50%',
                        right: '100%',
                    }}
                />
            </div>
            <Button variant="default" onClick={controlsOnClick}>
                {controlsValue}
            </Button>
        </div>
    )
}
