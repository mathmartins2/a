import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    price: vine.string(),
    quantity: vine.number().min(0),
  })
)
