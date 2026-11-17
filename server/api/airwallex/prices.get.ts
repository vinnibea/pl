import { doFetchPrices } from "~/server/utils/airwallex.api"

export default defineEventHandler(async (event) => {
   try {
     const prices = await doFetchPrices()

     return prices;
   } catch (error) {
    console.log(error)
     throw createError({
        statusCode: 404,
        message: `Error while fetching prices ${error}`
     })
   }

})