import { NextApiRequest, NextApiResponse } from 'next'

const ASSET_API_BASE_URL = process.env.ASSET_API_BASE_URL
const ASSET_API_KEY = process.env.ASSET_API_KEY as string
const ASSET_API_HEADERS = new Headers({
    'X-API-KEY': ASSET_API_KEY,
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | { message: string }>
) {
    const id = req.query.id as string

    const ensureUser = await ensureUserExists(id)
    if (ensureUser.status !== 200) {
        console.error('Something bad happened', await ensureUser.text())
        res.status(500).end()
        return
    }

    const response = await fetchLink(id)

    if (response.status !== 200) {
        res.status(500).end(JSON.stringify(response))
        return
    }

    const text = (await response.text()) as string

    res.status(200).json(text)
}

async function ensureUserExists(userId: string) {
    const response = await fetch(
        `${ASSET_API_BASE_URL}/users/${userId}/ensure`,
        {
            headers: ASSET_API_HEADERS,
            method: 'POST',
        }
    )
    return response
}

async function fetchLink(userId: string) {
    const response = await fetch(
        `${ASSET_API_BASE_URL}/users/${userId}/link?redirectUri=https://www.ladeassistent.no`,
        {
            headers: ASSET_API_HEADERS,
        }
    )
    return response
}
