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
    res: NextApiResponse<ForecastDTO | { message: string }>
) {
    const { area, currency, energyUnit, vatRate } = req.query

    const token = await getOrRefreshAccessToken()
    const response = await fetch(
        `${PLATFORM_API_URL}/smart/v1/prices/forecast/${area}?Currency=${currency}&EnergyUnit=${energyUnit}&VATRate=${vatRate}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.token.access_token}`,
            },
        }
    )

    if (!(response.status === 200)) {
        res.status(response.status).json({
            message:
                'There was en error with the response from one or more external API(s).',
        })
    }

    const data = (await response.json()) as ForecastDTO

    res.status(200).json(data)
}
