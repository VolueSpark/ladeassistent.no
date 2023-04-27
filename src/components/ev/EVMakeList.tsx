import { VehicleDTO, VehicleListDTO } from '@/pages/api/vehicle/list'
import { useEffect, useState } from 'react'
import EVList from './EVList'

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
    const [evs, setEvs] = useState<VehicleRecord>({})
    const [activeMake, setActiveMake] = useState<string>('')

    useEffect(() => {
        async function run() {
            const response = await fetch('/api/vehicle/list')
            const data = (await response.json()) as VehicleListDTO
            setEvs(vehicleListDTOMapper(data))
        }
        run()
    }, [])

    return (
        <div>
            {!activeMake &&
                Object.keys(evs).map((make) => (
                    <p key={make} onClick={() => setActiveMake(make)}>
                        {make}
                    </p>
                ))}
            {activeMake && (
                <div>
                    <button onClick={() => setActiveMake('')}>{`<-`}</button>
                    <EVList make={activeMake} evs={evs[activeMake]} />{' '}
                </div>
            )}
        </div>
    )
}
