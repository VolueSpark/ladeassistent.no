import { Settings } from '@voluespark/spark.elements'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n'

import style from './style.module.css'
import { texts } from './texts'

export default function Edit() {
    const { t } = useTranslation()
    const [ev, setEv] = useState<string>('')
    const [evCapacity, setEvCapacity] = useState<string>('')
    const [chargerCapacity, setChargerCapacity] = useState<string>('')
    const [chargingPercentageStart, setChargingPercentageStart] =
        useState<string>('')
    const [chargingPercentageStop, setChargingPercentageStop] =
        useState<string>('')
    const [evImage, setEvImage] = useState('')

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
    return (
        <div className={style.container}>
            <Settings
                title={t(texts.title)}
                car={{
                    brand: ev,
                    model: ev,
                    batteryCapacity: parseInt(evCapacity),
                    img: (
                        <img
                            className={style.image}
                            src={evImage}
                            alt="Image of vehicle"
                        />
                    ),
                }}
                parameters={{
                    chargerCapacity: parseInt(chargerCapacity),
                    chargingInterval: [
                        parseInt(chargingPercentageStart),
                        parseInt(chargingPercentageStop),
                    ],
                }}
                info={t(texts.info)}
                onItemClick={(value) => console.log('clicked', value)}
                buttonValue={t(texts.button)}
                onButtonClick={() => console.log('clicked button')}
            />
        </div>
    )
}
