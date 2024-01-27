import {z} from 'zod'

export const addProductValidation = z.object({
  title: z.string().min(1).toUpperCase(),
  name: z.string().min(1).max(100, 'nome deve conter menos de 100 caracteres').toUpperCase(),
  description: z.string().min(1).max(1000, 'descrição deve conter menos que 1000 caracteres'),
  price: z.string().refine((val) => isNaN(Number(val)) ? false : true, {message: 'preço tem que ser um numero'}),
  quantity: z.string().refine((val) => isNaN(Number(val)) ? false : true, {message: 'quantidade tem que ser um numero'})
})



export type addProductValidationType = z.infer<typeof addProductValidation>