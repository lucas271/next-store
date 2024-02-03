import { z } from "zod";

export const reviewValidation = z.object({
    text:  z.string().min(1,"Review precisa ter um texto"),
    rating: z.string().optional()
})


export type reviewValidationType = z.infer<typeof reviewValidation>