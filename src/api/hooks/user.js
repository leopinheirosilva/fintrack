import { useMutation, useQuery } from '@tanstack/react-query'

import { UserService } from '@/api/services/user'
import { useAuthContext } from '@/contexts/auth'

// define a queryKey do hook useGetUserBalance
export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }
  ;['balance', userId, from, to]
}
// hook
export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext

  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: () => {
      return UserService.getBalance({ from, to })
    },
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

// define a mutationKey do hook useSignup
export const signupMutationKey = () => {
  return ['signup']
}
// hook
export const useSignup = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables)
      return response
    },
  })
}

// define a mutationKey do hook useLogin
export const loginMutationKey = () => {
  return ['login']
}
// hook
export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.login(variables)
      return response
    },
  })
}
