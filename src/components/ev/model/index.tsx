import { VehicleDTO } from '@/pages/api/vehicle/list'
import { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage'
import { VehicleRecord } from '../AddVehicle'

import { texts } from './texts'
import style from './model.module.css'
import { useTranslation } from '@/i18n'
import Input from '@/components/UI/input'

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
    const [filteredMakes, setFilteredMakes] = useState<VehicleRecord>({})
    const [filteredModels, setFilteredModels] = useState<Array<VehicleDTO>>([])
    const [searchMake, setSearchMake] = useState<string>('')
    const [searchModel, setSearchModel] = useState('')

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

    // Direct the search to the correct handler
    const searchHandler = (value: string) => {
        switch (nestedMenuDepth) {
            case 1:
                searchMakeHandler(value)
                break
            case 2:
                searchModelHandler(value)
                break
            default:
                return
        }
    }

    const searchMakeHandler = (value: string) => {
        setSearchMake(value)
    }

    const searchModelHandler = (value: string) => {
        setSearchModel(value)
    }

    // Filter the makes based on the search string
    useEffect(() => {
        if (!searchMake) {
            setFilteredMakes(evs)
            return
        }
        const filteredKeys = Object.keys(evs).filter((make) =>
            make.toLowerCase().includes(searchMake.toLowerCase())
        )
        const filteredEvs: VehicleRecord = {}
        filteredKeys.forEach((key) => {
            filteredEvs[key] = evs[key]
        })
        setFilteredMakes(filteredEvs)
    }, [searchMake])

    // Filter the models based on the search string
    useEffect(() => {
        if (!searchModel) {
            setFilteredModels(evs[activeMake])
            return
        }
        const activeEv = evs[activeMake]
        const filteredEvs = activeEv.filter((ev) => {
            const includesMake = ev.naming.make
                ?.toLowerCase()
                .includes(searchModel.toLowerCase())
            const includesModel = ev.naming.model
                ?.toLowerCase()
                .includes(searchModel.toLowerCase())
            const includesEdition = ev.naming.edition
                ?.toLowerCase()
                .includes(searchModel.toLowerCase())
            const includesVersion = ev.naming.version
                ?.toLowerCase()
                .includes(searchModel.toLowerCase())
            if (
                includesMake ||
                includesModel ||
                includesEdition ||
                includesVersion
            ) {
                return true
            }
        })
        setFilteredModels(filteredEvs)
    }, [searchModel])

    // Initialize the default model list when a make is picked
    useEffect(() => {
        setFilteredModels(evs[activeMake])
    }, [activeMake])

    // Reset search field when switching context menu
    useEffect(() => {
        setSearchMake('')
        setSearchModel('')
    }, [nestedMenuDepth])

    // This is needed to ensure that nothing is cleaned up before the localstorage is updated
    useEffect(() => {
        if (updated) {
            setUpdated(false)
            cbFn()
        }
    }, [updated])

    return (
        <>
            <Input
                name="model-make-search-input"
                label="Search"
                value={nestedMenuDepth === 1 ? searchMake : searchModel}
                onChange={searchHandler}
            />
            {nestedMenuDepth === 1 && filteredMakes && (
                <div className={style.list}>
                    <p className={style.header}>
                        {t(texts.first)} <b>{t(texts.second)}</b>{' '}
                        {t(texts.third)}
                    </p>
                    {Object.keys(filteredMakes).map((make) => (
                        <div key={make} className={style.item}>
                            <p onClick={() => onMakeClick(make)}>{make}</p>
                        </div>
                    ))}
                </div>
            )}
            {nestedMenuDepth === 2 && filteredModels && (
                <div className={style.list}>
                    <h3>{activeMake}</h3>
                    {filteredModels.map((ev) => (
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
