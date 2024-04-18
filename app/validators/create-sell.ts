import vine from '@vinejs/vine'

export const createSellValidator = vine.compile(
  vine.object({
    customerId: vine.string().trim().uuid(),
    productId: vine.string().trim().uuid(),
    quantity: vine.number().min(1),
    total: vine.number().min(1),
  })
)
