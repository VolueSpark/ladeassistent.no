import { AccessToken, ClientCredentials } from 'simple-oauth2'

export const PLATFORM_API_URL = process.env.PLATFORM_API_URL as string
const PLATFORM_CLIENT_ID = process.env.PLATFORM_CLIENT_ID as string
const PLATFORM_CLIENT_SECRET = process.env.PLATFORM_CLIENT_SECRET as string
const VOLUE_IDENTITY_BASE_URL = process.env.VOLUE_IDENTITY_BASE_URL as string
const VOLUE_IDENTITY_TOKEN_PATH = process.env
    .VOLUE_IDENTITY_TOKEN_PATH as string
const PLATFORM_SCOPES = process.env.PLATFORM_SCOPES as string
const EXPIRATION_WINDOW_IN_SECONDS = 300

// "Cached" access_token
let access_token: AccessToken | undefined = undefined

export async function getOrRefreshAccessToken() {
    const client = new ClientCredentials({
        client: {
            id: PLATFORM_CLIENT_ID,
            secret: PLATFORM_CLIENT_SECRET,
        },
        auth: {
            tokenHost: VOLUE_IDENTITY_BASE_URL,
            tokenPath: VOLUE_IDENTITY_TOKEN_PATH,
        },
        options: {
            bodyFormat: 'form',
        },
    })

    const tokenParams = {
        scope: PLATFORM_SCOPES,
    }

    if (!access_token) {
        try {
            access_token = await client.getToken(tokenParams)
        } catch (error: any) {
            console.log('Access Token error', JSON.stringify(error.message))
            throw error
        }
    }

    if (access_token.expired(EXPIRATION_WINDOW_IN_SECONDS)) {
        try {
            access_token = await access_token.refresh()
        } catch (error: any) {
            console.log('Error refreshing access token: ', error.message)
        }
    }

    return access_token
}
