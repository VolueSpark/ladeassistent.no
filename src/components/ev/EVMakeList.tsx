import { VehicleDTO, VehicleListDTO } from '@/pages/api/vehicle/list'
import { useEffect, useState } from 'react'

import style from './style.module.css'
import useLocalStorage from 'use-local-storage'
import { useRouter } from 'next/router'
import { Button, Radio, Range } from '@voluespark/spark.elements'
import { useTranslation } from '@/i18n'
import { texts } from './texts'

type VehicleRecord = Record<string, Array<VehicleDTO>>

const vehicleListDTOMapper = (
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

export default function EVMakeList() {
    const { t } = useTranslation()
    const router = useRouter()
    // TODO: rework to use the whole menu
    const [menuDepth, setMenuDepth] = useState<number>(1)
    const [nestedMenuDepth, setNestedMenuDepth] = useState<number>(1)
    // Data
    const [evs, setEvs] = useState<VehicleRecord>({})
    // First menu
    const [activeMake, setActiveMake] = useState<string>('')
    // Second menu
    const [activeVehicle, setActiveVehicle] = useState<VehicleDTO | null>(null)
    // Third menu
    const [activeChargerCapacity, setActiveChargerCapacity] =
        useState<number>(3.7)
    const [chargingRange, setchargingRange] = useState<Array<number>>([10, 80])

    // Local storage
    const [_vehicle, setVehicle] = useLocalStorage<string>('ev', '')
    const [_vehicleCapacity, setVehicleCapacity] = useLocalStorage<string>(
        'ev_capacity',
        ''
    )
    const [_chargerCapacity, setChargerCapacity] = useLocalStorage<string>(
        'charger_capacity',
        ''
    )
    const [_chargingPercentageStart, setChargingPercentageStart] =
        useLocalStorage<string>('charging_percentage_start', '')
    const [_chargingPercentageStop, setChargingPercentageStop] =
        useLocalStorage<string>('charging_percentage_stop', '')

    useEffect(() => {
        async function run() {
            const response = await fetch('/api/vehicle/list')
            const data = (await response.json()) as VehicleListDTO
            setEvs(vehicleListDTOMapper(data))
        }
        run()
    }, [])

    useEffect(() => {
        setVehicle(
            `${activeVehicle?.naming.make} ${activeVehicle?.naming.model}`
        )
        setVehicleCapacity(activeVehicle?.battery.full_kwh?.toString())
    }, [activeVehicle])

    useEffect(() => {
        setChargerCapacity(activeChargerCapacity.toString())
    }, [activeChargerCapacity])

    useEffect(() => {
        setChargingPercentageStart(chargingRange[0].toString())
        setChargingPercentageStop(chargingRange[1].toString())
    }, [chargingRange])

    const onMakeClick = (make: string) => {
        setActiveMake(make)
        setNestedMenuDepth(2)
    }

    const onModelClick = (vehicle: VehicleDTO) => {
        setActiveVehicle(vehicle)
        setMenuDepth(2)
    }

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
                        <p>
                            <b>{t(texts.controls.back)}</b>
                        </p>
                    </div>
                ) : (
                    <div></div>
                )}
                <p className={style.menu__depth}>
                    {menuDepth} / {3}
                </p>
                <p onClick={() => router.push('/')}>
                    {t(texts.controls.close)}
                </p>
            </div>
            {menuDepth === 1 && (
                <>
                    {nestedMenuDepth === 1 && (
                        <div>
                            <h3>
                                {t(texts.headers.make.first)}{' '}
                                <b>{t(texts.headers.make.second)}</b>{' '}
                                {t(texts.headers.make.third)}
                            </h3>
                            {Object.keys(evs).map((make) => (
                                <div key={make} className={style.item}>
                                    <p onClick={() => onMakeClick(make)}>
                                        {make}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    {nestedMenuDepth === 2 && (
                        <div>
                            {!activeVehicle && (
                                <div>
                                    <h3>{activeMake}</h3>
                                    {evs[activeMake].map((ev) => (
                                        <div key={ev.id} className={style.item}>
                                            <p onClick={() => onModelClick(ev)}>
                                                {ev.naming.make}{' '}
                                                {ev.naming.model}{' '}
                                                {ev.naming.edition}{' '}
                                                {ev.naming.version}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
            {menuDepth === 2 && (
                <div className={style.onboarding__subpage__container}>
                    <div>
                        <h3>
                            {t(texts.headers.charger.first)}{' '}
                            <b>{t(texts.headers.charger.second)}</b>
                        </h3>
                        <p>{t(texts.headers.charger.info)}</p>
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
                    <Button variant="default" onClick={onNextClick}>
                        Next
                    </Button>
                </div>
            )}
            {menuDepth === 3 && (
                <div className={style.onboarding__subpage__container}>
                    <div>
                        <h3>
                            {t(texts.headers.interval.first)}{' '}
                            <b>{t(texts.headers.interval.second)}</b>
                        </h3>
                        <p>{t(texts.headers.interval.info)}</p>
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
                    <Button variant="default" onClick={() => router.push('/')}>
                        {t(texts.controls.done)}
                    </Button>
                </div>
            )}
        </div>
    )
}
