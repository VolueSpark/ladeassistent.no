import { VehicleDTO, VehicleListDTO } from '@/pages/api/vehicle/list'
import { useEffect, useState } from 'react'

import style from './style.module.css'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n'
import { texts } from './texts'
import Charger from './charger'
import Interval from './interval'
import Model from './model'
import { Icon } from '../UI'

export type VehicleRecord = Record<string, Array<VehicleDTO>>

export const vehicleListDTOMapper = (
    vehicleListDTO: VehicleListDTO
): VehicleRecord => {
    const record: VehicleRecord = {}
    vehicleListDTO.data.vehicleList.forEach((vehicle) => {
        if (!record[vehicle.naming.make ?? 'unknown'])
            record[vehicle.naming.make ?? 'unknown'] = new Array<VehicleDTO>()
        record[vehicle.naming.make ?? 'unknown'].push(vehicle)
    })
    return record
}

export default function AddVehicle() {
    const { t } = useTranslation()
    const router = useRouter()

    const [menuDepth, setMenuDepth] = useState<number>(1)
    const [nestedMenuDepth, setNestedMenuDepth] = useState<number>(1)

    // Data
    const [evs, setEvs] = useState<VehicleRecord>({})

    useEffect(() => {
        async function run() {
            const response = await fetch('/api/vehicle/list')
            const data = (await response.json()) as VehicleListDTO
            setEvs(vehicleListDTOMapper(data))
        }
        run()
    }, [])

    const onBackClick = () => {
        if (nestedMenuDepth !== 1) setNestedMenuDepth(nestedMenuDepth - 1)
        else setMenuDepth(menuDepth - 1)
    }

    const onNextClick = () => {
        setMenuDepth(menuDepth + 1)
    }

    useEffect(() => {
        if (nestedMenuDepth !== 1) setNestedMenuDepth(1)
    }, [menuDepth])

    return (
        <div className={style.container}>
            <div className={style.onboarding__controls}>
                {menuDepth !== 1 || nestedMenuDepth !== 1 ? (
                    <div
                        className={style.onboarding__controls__back}
                        onClick={onBackClick}
                    >
                        <Icon iconName="arrow" width={16} height={16} />
                        <p>{t(texts.controls.back)}</p>
                    </div>
                ) : (
                    <div></div>
                )}
                <p className={style.menu__depth}>
                    <b>{menuDepth}</b> / {3}
                </p>
                <p onClick={() => router.push('/')}>
                    {t(texts.controls.close)}
                </p>
            </div>
            {menuDepth === 1 && (
                <Model
                    evs={evs}
                    cbFn={() => setMenuDepth(2)}
                    nestedMenuDepth={nestedMenuDepth}
                    setNestedMenuDepth={setNestedMenuDepth}
                />
            )}
            {menuDepth === 2 && (
                <Charger
                    controlsValue={t(texts.controls.next)}
                    controlsOnClick={onNextClick}
                />
            )}
            {menuDepth === 3 && (
                <Interval
                    controlsValue={t(texts.controls.done)}
                    controlsOnClick={() => router.push('/')}
                />
            )}
        </div>
    )
}
