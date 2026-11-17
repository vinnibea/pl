type Token = {
    token: string,
    expires: number
}

type AuthResponse = {
    token: string,
    expires_at: string
}

let refreshing: Promise<string | null> | null = null
const TOKEN_KEY = 'airwallex:token'
const TOKEN_TIME_SAFETY = 5 * 60 * 1000

export const getToken = async (): Promise<string | null> => {
   const storage = useStorage('cache')
   const token = await storage.getItem<Token>(TOKEN_KEY)
   const config = useRuntimeConfig()

   

   if(token && token.expires - TOKEN_TIME_SAFETY > Date.now()) {
      return token.token
   }

   if(refreshing) {
     return refreshing
   }
   
   refreshing = (async () => {
     try {
        console.log(config.airwallaxApi)
        console.log(config.airwallaxClient)
        console.log(config.airwallaxUrl)
        const response = await $fetch<AuthResponse>(`${config.airwallaxUrl}/api/v1/authentication/login`, {
            method: 'POST',
            headers: {
                'x-api-key': config.airwallaxApi,
                'x-client-id': config.airwallaxClient,
                'accept': 'application/json',
                'content-type': 'application/json'

            }
        })
        await storage.setItem<Token>(TOKEN_KEY, {
            token: response.token,
            expires: new Date(response.expires_at).getTime()
        })

        return response.token
     } catch (error) {
        console.warn(error)
        return null
     } finally {
        refreshing = null
     }

   })()

  return refreshing
}

export const airwallexFetch = async <T>(endpoint: string, options: Parameters<typeof $fetch>[1] = {}) => {
    const token = await getToken();
    const config = useRuntimeConfig();
    if(!token) {
        throw createError({
            statusCode: 401, 
            message: 'Error while obtaining token [AIRWALLAX]'
        })
    }
    console.log(token)
    
    return $fetch<T>(`${config.airwallaxUrl}${endpoint}`, {
        ...options,
        headers: {
            ...(options?.headers ? options.headers : {}),
            'Authorization': `Bearer ${token}`
        }
    })

}