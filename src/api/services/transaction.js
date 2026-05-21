import { protectedApi } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado
   * @param {*} input - Transação a ser criada
   * @param {*} input.name - Nome da transação
   * @param {*} input.date - Data da transação (YYYY-MM-DD)
   * @param {*} input.amount - Valor da transação
   * @param {*} input.type - Tipo da transação (EARNING, EXPENSE, INVESTMENT)
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input)
    return response.data
  },
}
