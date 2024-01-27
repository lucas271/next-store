import {z} from 'zod'

export const signInValidation = z.object({
  email: z.string().min(1,"Preencha o campo").email("Não é um email valido"),
  password: z.string().min(1,"Preencha o campo").min(6, 'Senha deve ter no minimo 6 digitos')
  .refine((input) => /[a-z]/.test(input) && /[A-Z]/.test(input),
  {message: 'Senha deve conter ao menos uma letra minuscula e uma maiuscula.'})
})

export const signUpValidation = signInValidation.extend({
  name: z.string().min(1,"Preencha o campo").refine(input => !Number(input[0]), {
    message:"Nome de usuario não pode começar com um número"
  }).refine((input) => !/[^A-Za-z0-9]/.test(input),{
    message: "Nome de usúario não deve conter caracteres especiais"
  }),
  repeatPassword: z.string()
}).refine(data => data.repeatPassword === data.password,
{message: 'Senhas são diferentes', path:['repeatPassword']})

export type SignInType = z.infer<typeof signInValidation>
export type SignUpType = z.infer<typeof signUpValidation>