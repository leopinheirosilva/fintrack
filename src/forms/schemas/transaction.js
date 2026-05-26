import z from 'zod'

// regras para validaçõo de campos do formulário com zod
export const createTransactionFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z.number({
    required_error: 'O valor é obrigatório',
  }),
  date: z.date({
    required_error: 'Selecione uma data',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    message: 'Selecione o tipo da transação',
  }),
})

// regras para validaçõo de campos do formulário com zod
export const editTransactionFormSchema = createTransactionFormSchema.extend({
  id: z.string().uuid(),
})
