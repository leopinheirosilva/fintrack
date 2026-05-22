import z from 'zod'

// regras para validação de campos do formulário com zod
export const loginFormSchema = z.object({
  email: z.string().email({
    message: 'O e-mail é inválido',
  }),
  password: z.string().trim().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  }),
})

// regras para validação de campos do formulário com zod
export const signupFormSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório',
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório',
    }),
    email: z.string().email({
      message: 'O e-mail é inválido',
    }),
    password: z.string().trim().min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres',
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: 'A confirmação de senha é obrigatória',
    }),
    terms: z.boolean().refine((value) => value == true, {
      message: 'Campo obrigatório',
    }),
  })
  // lógica para confirmação de senha
  .refine((data) => data.password == data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  })
