import { differenceInDays } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'

const CHARGETRIP_CLIENT_ID = process.env.CHARGETRIP_CLIENT_ID as string
const CHARGETRIP_APP_ID = process.env.CHARGETRIP_APP_ID as string

export type Naming = {
    make: string | null
    model: string | null
    version: string | null
    edition: string | null
}

export type Battery = {
    full_kwh: number | null
    usable_kwh: number | null
}

export type Media = {
    image: {
        thumbnail_url: string | null
    }
}

export type VehicleDTO = {
    id: string
    naming: Naming
    battery: Battery
    media: Media
}

export type VehicleListDTO = {
    data: {
        vehicleList: Array<VehicleDTO>
    }
}

let lastUpdated: Date | null = null
let vehicleList: VehicleListDTO | null = null

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<VehicleListDTO | { message: string }>
) {
    if (
        !lastUpdated ||
        !vehicleList ||
        (lastUpdated && differenceInDays(lastUpdated, new Date()) > 1)
    ) {
        const response = await queryVehicleList()
        lastUpdated = new Date()
        vehicleList = response
    }

    if (vehicleList) res.status(200).json(vehicleList)
    res.status(500).json({
        message: 'Could not retrieve vehicle list from server.',
    })
}

async function queryVehicleList(): Promise<VehicleListDTO | null> {
    const response = await fetch(`https://api.chargetrip.io/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-client-id': CHARGETRIP_CLIENT_ID,
            'x-app-id': CHARGETRIP_APP_ID,
        },
        body: JSON.stringify({
            query: `{
                vehicleList(page: 0, size: 1000, search: "") {
                    id
                    naming {
                        make
                        model
                        version
                        edition
                    }
                    battery {
                        full_kwh
                        usable_kwh
                    }
                    media {
                        image {
                            thumbnail_url
                        }
                    }
                }
            }`,
        }),
    })

    if (response.status !== 200) return null

    return response.json()
}
