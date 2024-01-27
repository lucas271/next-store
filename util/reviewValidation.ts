import { z } from "zod";

export const reviewUpdateValidation = z.object({
    title:  z.string().min(1,"Review precisa ter um titulo"),
    text:  z.string().min(1,"Review precisa ter um texto"),
    rating: z.number().min(0.5, "valor minimo para review deve ser 0.5").optional()
})


export type reviewUpdateValidationType = z.infer<typeof reviewUpdateValidation>