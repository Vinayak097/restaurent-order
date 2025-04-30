import z from 'zod'
export const crateSchema=z.object({
    name:z.string().max(100),
    phone_number:z.string().max(15),
})