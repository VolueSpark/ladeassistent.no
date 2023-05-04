import { VehicleDTO } from '@/pages/api/vehicle/list'
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { VehicleRecord } from '../AddVehicle'

import { texts } from './texts'
import style from './model.module.css'
import { useTranslation } from '@/i18n'

type ModelProps = {
    evs: VehicleRecord
    nestedMenuDepth: number
    setNestedMenuDepth: (depth: number) => void
    cbFn: () => void
}

export default function Model({
    evs,
    nestedMenuDepth,
    setNestedMenuDepth,
    cbFn,
}: ModelProps) {
    const { t } = useTranslation()
    const [activeMake, setActiveMake] = useState<string>('')
    const [updated, setUpdated] = useState(false)

    const [_vehicle, setVehicle] = useLocalStorage<string>('ev', '')
    const [_vehicleImg, setVehicleImg] = useLocalStorage<string>('ev_image', '')
    const [_vehicleCapacity, setVehicleCapacity] = useLocalStorage<string>(
        'ev_capacity',
        ''
    )

    const onMakeClick = (make: string) => {
        setActiveMake(make)
        setNestedMenuDepth(2)
    }

    const onModelClick = (vehicle: VehicleDTO) => {
        setVehicle(`${vehicle.naming.make ?? ''} ${vehicle.naming.model ?? ''}`)
        setVehicleImg(vehicle.media.image.thumbnail_url ?? '')
        setVehicleCapacity(vehicle.battery.full_kwh?.toString() ?? '')
        setUpdated(true)
    }

    // This is needed to ensure that nothing is cleaned up before the localstorage is updated
    useEffect(() => {
        if (updated) {
            setUpdated(false)
            cbFn()
        }
    }, [updated])

    return (
        <>
            {nestedMenuDepth === 1 && (
                <div>
                    <p className={style.header}>
                        {t(texts.first)} <b>{t(texts.second)}</b>{' '}
                        {t(texts.third)}
                    </p>
                    {Object.keys(evs).map((make) => (
                        <div key={make} className={style.item}>
                            <p onClick={() => onMakeClick(make)}>{make}</p>
                        </div>
                    ))}
                </div>
            )}
            {nestedMenuDepth === 2 && (
                <div>
                    <h3>{activeMake}</h3>
                    {evs[activeMake].map((ev) => (
                        <div key={ev.id} className={style.item}>
                            <p onClick={() => onModelClick(ev)}>
                                {ev.naming.make} {ev.naming.model}{' '}
                                {ev.naming.edition} {ev.naming.version}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
