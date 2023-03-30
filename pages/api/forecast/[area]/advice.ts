import {
    PLATFORM_API_URL,
    getOrRefreshAccessToken,
} from '@/src/api/platform-client'
import { ForecastAdvice, PriceArea, PriceUnit } from '@/src/api/types'
import { NextApiRequest, NextApiResponse } from 'next'

export type ForecastAdviceDTO = {
    priceArea: PriceArea
    priceUnit: PriceUnit
    forecastAdvice: ForecastAdvice[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ForecastAdviceDTO | { message: string }>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' })
        return
    }

    const area = req.query.area as string

    const token = await getOrRefreshAccessToken()
    const response = await fetch(
        `${PLATFORM_API_URL}/api/forecast/${area}/advice`,
        {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.token.access_token}`,
            },
            body: JSON.stringify(req.body),
        }
    )

    if (!(response.status === 200)) {
        res.status(response.status).json({
            message:
                'There was en error with the response from one or more external API(s).',
        })
    }

    const data = (await response.json()) as ForecastAdviceDTO

    res.status(200).json(data)
}
