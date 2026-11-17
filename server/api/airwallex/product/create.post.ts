import { doCreatePrice, doCreateProduct } from "~/server/utils/airwallex.api"
import crypto from 'node:crypto'
export default defineEventHandler(async (event) => {
    try {
       const createdProduct = await doCreateProduct({
         request_id: crypto.randomUUID(),
         active: true,
         description: 'Service description for a week',
         unit: 'week',
         name: 'Service subscription'
       }) 
      const createdPrice = await doCreatePrice(createdProduct.id);
       return createdPrice;
    } catch (error) {
        throw createError({
            statusCode: 400,
            message: 'Failed to create product'
        })
    }
})