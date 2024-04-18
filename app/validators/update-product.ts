import vine from '@vinejs/vine'

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    price: vine.string().optional(),
    quantity: vine.number().min(0).optional(),
  })
)
