import { object, string } from 'yup'

export const formSchema = object({
  title: string().min(5).required(),
  description: string().min(12).max(50),
})
