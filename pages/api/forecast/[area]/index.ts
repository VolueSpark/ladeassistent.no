import {
    PLATFORM_API_URL,
    getOrRefreshAccessToken,
} from '@/src/api/platform-client'
import { ForecastSegment, PriceArea, PriceUnit } from '@/src/api/types'
import { NextApiRequest, NextApiResponse } from 'next'

export type ForecastDTO = {
    priceArea: PriceArea
    priceUnit: PriceUnit
    forecastSegments: ForecastSegment[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ForecastDTO>
) {
    const { area, currency, energyUnit, vatRate } = req.query

    const token = await getOrRefreshAccessToken()
    const response = await fetch(
        `${PLATFORM_API_URL}/api/forecast/${area}?Currency=${currency}&EnergyUnit=${energyUnit}&VATRate=${vatRate}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.token.access_token}`,
            },
        }
    )
    const data = (await response.json()) as ForecastDTO

    res.status(200).json(data)
}
