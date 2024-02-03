import {z} from 'zod'

export const addProductValidation = z.object({
  title: z.string().min(1,'campo titulo está vazio').toUpperCase(),
  name: z.string().min(1, 'campo nome está vazio').max(100, 'nome deve conter menos de 100 caracteres').toUpperCase(),
  description: z.string().min(1).min(1, 'campo descrição está vazio').max(1000, 'descrição deve conter menos que 1000 caracteres'),
  price: z.string().min(1, 'campo preço está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'preço tem que ser um numero'}),
  quantity: z.string().min(1, 'campo quantidade está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'quantidade tem que ser um numero'})
})

export const editProductValidation = z.object({
  title: z.string().min(1,'campo titulo está vazio').toUpperCase().optional(),
  name: z.string().min(1, 'campo nome está vazio').max(100, 'nome deve conter menos de 100 caracteres').toUpperCase().optional(),
  description: z.string().min(1).min(1, 'campo descrição está vazio').max(1000, 'descrição deve conter menos que 1000 caracteres').optional(),
  price: z.string().min(1, 'campo preço está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'preço tem que ser um numero'}).optional(),
  quantity: z.string().min(1, 'campo quantidade está vazio').refine((val) => isNaN(Number(val)) ? false : true, {message: 'quantidade tem que ser um numero'}).optional()
})


export type addProductValidationType = z.infer<typeof addProductValidation>
export type editProductValidationType = z.infer<typeof editProductValidation>