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
    res: NextApiResponse<SpotPricesDTO>
) {
    const { area, currency, energyUnit, vatRate } = req.query

    const token = await getOrRefreshAccessToken()
    const response = await fetch(
        `${PLATFORM_API_URL}/api/spot-prices/${area}?Currency=${currency}&EnergyUnit=${energyUnit}&VATRate=${vatRate}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token.token.access_token}`,
            },
        }
    )

    const data = (await response.json()) as SpotPricesDTO

    res.status(200).json(data)
}
