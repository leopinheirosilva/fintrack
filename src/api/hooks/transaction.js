import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TransactionService } from '../services/transaction'
import { UserService } from '../services/user'
import { getUserBalanceQueryKey } from './user'

// define a mutationKey do hook useCreateTransaction
export const createTransactionMutationKey = () => {
  return ['createTransaction']
}
// hook
export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = UserService()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
    },
  })
}
