import { VehicleDTO } from '@/pages/api/vehicle/list'

type EVListProps = {
    make: string
    evs: Array<VehicleDTO>
}

export default function EVList({ make, evs }: EVListProps) {
    return (
        <div>
            <h3>{make}</h3>
            {evs.map((ev) => (
                <p key={ev.id}>
                    {make} {ev.naming.model} {ev.naming.edition}{' '}
                    {ev.naming.version}
                </p>
            ))}
        </div>
    )
}
