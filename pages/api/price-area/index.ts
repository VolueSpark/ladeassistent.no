import { NextApiRequest, NextApiResponse } from 'next'
import { z, ZodIssue } from 'zod'
import isPointInPolygon from '@turf/boolean-point-in-polygon'
import priceArea from './priceArea.json'

const PriceAreaRequest = z.object({
    longitude: z.number(),
    latitude: z.number(),
})

export type PriceAreaRequest = z.infer<typeof PriceAreaRequest>

export type PriceArea = 'NO1' | 'NO2' | 'NO3' | 'NO4' | 'NO5'

export type PriceAreaOkResponse = { priceArea: PriceArea | null }
export type PriceAreaErrorResponse = {
    errors: ZodIssue[]
}

export type PriceAreaResponse = PriceAreaOkResponse | PriceAreaErrorResponse

export function isOkPriceAreaResponse(
    body: PriceAreaResponse
): body is PriceAreaOkResponse {
    return 'priceArea' in body
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PriceAreaResponse>
) {
    switch (req.method) {
        case 'POST':
            const result = PriceAreaRequest.safeParse(req.body)
            if (result.success) {
                const priceArea = getPriceArea(result.data)
                if (priceArea) {
                    res.status(200).json({ priceArea })
                } else {
                    res.status(404).json({ priceArea: null })
                }
            } else {
                res.status(400).json({ errors: result.error.issues })
            }
            return
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${req.method} not allowed`)
    }
}

function removeSpace(str: string | null) {
    return str?.replaceAll(' ', '') as PriceArea | null
}

function getPriceArea({
    longitude,
    latitude,
}: PriceAreaRequest): PriceArea | null {
    const area = priceArea.features.find((f) =>
        isPointInPolygon([longitude, latitude], f.geometry as any)
    )

    return removeSpace(area?.properties.ElSpotOmr as PriceArea)
}
