import { useTranslation } from '@/i18n'
import style from './charger.module.css'
import { texts } from './texts'
import { Button, Radio } from '@voluespark/spark.elements'
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'

type ChargerProps = {
    controlsValue: string
    controlsOnClick: () => void
}

export default function Charger({
    controlsValue,
    controlsOnClick,
}: ChargerProps) {
    const [_chargerCapacity, setChargerCapacity] = useLocalStorage<string>(
        'charger_capacity',
        ''
    )
    // TODO: remove this, only use local storage
    const [activeChargerCapacity, setActiveChargerCapacity] =
        useState<number>(3.7)

    useEffect(() => {
        setChargerCapacity(activeChargerCapacity.toString())
    }, [activeChargerCapacity])

    const { t } = useTranslation()

    return (
        <div className={style.container}>
            <div>
                <h3>
                    {t(texts.first)} <b>{t(texts.second)}</b>
                </h3>
                <p>{t(texts.info)}</p>
            </div>
            <div className={style.radio__container}>
                <Radio
                    name="3.7kW"
                    label="3.7 kW"
                    checked={activeChargerCapacity === 3.7}
                    onClick={() => setActiveChargerCapacity(3.7)}
                />
                <Radio
                    name="11kW"
                    label="11 kW"
                    checked={activeChargerCapacity === 11}
                    onClick={() => setActiveChargerCapacity(11)}
                />
                <Radio
                    name="22kW"
                    label="22 kW"
                    checked={activeChargerCapacity === 22}
                    onClick={() => setActiveChargerCapacity(22)}
                />
            </div>
            <Button variant="default" onClick={controlsOnClick}>
                {controlsValue}
            </Button>
        </div>
    )
}
