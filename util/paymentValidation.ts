import {z} from 'zod'

const PaymentTypeEnum = z.enum(['PIX', 'CREDIT']);
export type PaymentTypeInterface = z.infer<typeof PaymentTypeEnum>;


export const paymentValidation = z.object({
  cardHolder: z.string().min(1, "Preencha o campo").toUpperCase(),
  cardNumber: z.string().min(1, "Preencha o campo")
  .refine((value) => {
    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
    const mastercardPattern = /^5[1-5][0-9]{14}$/
    return (
      visaPattern.test(value) ||
      mastercardPattern.test(value)
    )
  },{
    message: "Número do cartão inválido. Verifique novamente.",
    path: ["cardNumber"],
  }).refine((value) => {
    const trimmedValue = value.replace(/\s/g, "")
    const digits = trimmedValue.split("").reverse()

    let sum = 0
    let isEven = false

    for (let i = 0; i < digits.length; i++) {
      let digit = parseInt(digits[i], 10)

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0; // Check if the sum is divisible by 10
  }, {
    message: "Número do cartão inválido. Verifique novamente.",
    path: ["cardNumber"],
  }),
  CVV: z.string().min(1, "Preencha o campo").min(3, 'Mínimo 3 caracteres').max(4, 'Máximo 4 caracteres'),
  paymentType: z.string().min(1, 'Selecione um metodo').toUpperCase().refine((input) => {
    let isInputValid: boolean = true
    PaymentTypeEnum._def.values.forEach(element => {
      element !== input && isInputValid === false 
    })
    return isInputValid
  }, {
    message: 'Tipo de pagamento invalido',
    path: ['paymentType']
  })
})

export type PaymentValidationType = z.infer<typeof paymentValidation>