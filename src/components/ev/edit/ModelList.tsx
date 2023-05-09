import { useEffect, useState } from 'react'
import Model from '../model'
import { VehicleRecord, vehicleListDTOMapper } from '../AddVehicle'
import { VehicleListDTO } from '@/pages/api/vehicle/list'

type ModelListProps = {
    onModelSelect: () => void
}

export default function ModelList({ onModelSelect }: ModelListProps) {
    // Data
    const [evs, setEvs] = useState<VehicleRecord>({})
    const [nestedMenuDepth, setNestedMenuDepth] = useState(1)

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
            <Model
                evs={evs}
                nestedMenuDepth={nestedMenuDepth}
                setNestedMenuDepth={setNestedMenuDepth}
                cbFn={onModelSelect}
            />
        </div>
    )
}
