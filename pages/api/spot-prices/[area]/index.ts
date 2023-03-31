import {
    PLATFORM_API_URL,
    getOrRefreshAccessToken,
} from '@/src/api/platform-client'
import { Price, PriceArea, PriceUnit } from '@/src/api/types'
import { NextApiRequest, NextApiResponse } from 'next'

export type SpotPricesDTO = {
    priceArea: {
        code: PriceArea
    }
    priceUnits: PriceUnit
    prices: Price
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpotPricesDTO | { message: string }>
) {
    const { area, currency, energyUnit, vatRate } = req.query

    const token = await getOrRefreshAccessToken()
    const response = await fetch(
        `${PLATFORM_API_URL}/smart/v1/prices/actual/${area}?Currency=${currency}&EnergyUnit=${energyUnit}&VATRate=${vatRate}`,
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

    const data = (await response.json()) as SpotPricesDTO

    res.status(200).json(data)
}
