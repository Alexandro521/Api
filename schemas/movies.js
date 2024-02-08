import z from 'zod'

const movieSchema = z.object({
    title: z.string(),
    year: z.number().min(1950).max(2024),
    director: z.string(),
    duration: z.number().int(),
    poster: z.string().url({
        message: 'invalid url'
    }),
    genre: z.array(z.enum(['Action','Comedy','Sci-Fi','family','Animation'])),
    rate: z.number().positive().min(0).max(10)

})

export function validateMovie(object){
    return movieSchema.safeParse(object)
}
export function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object)
}

