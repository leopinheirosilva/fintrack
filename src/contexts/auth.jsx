import { useMutation } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

// criação do contexto
export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  // mutation da signup page
  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        // armazena os tokens do usuário criado no local storage
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        toast.success('Conta criada com sucesso')
      },
      onError: () => {
        toast.error('Erro ao criar conta! Por favor, tente novamente')
      },
    })
  }

  // mutation da login page
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('/users/login', {
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })
  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        // armazena os tokes do usuário logado no local storage
        const accessToken = loggedUser.tokens.accessToken
        const refreshToken = loggedUser.tokens.refreshToken
        setUser(loggedUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        toast.success('Usuário logado com sucesso')
      },
      onError: () => {
        toast.error('Usuário inválido! Por favor, tente novamente')
      },
    })
  }

  // persiste o usuário
  useEffect(() => {
    const init = async () => {
      try {
        // pega os tokens do usuário armazenados no local storage
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && !refreshToken) return
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        // remove os tokes armazenados no local storage caso os tokes sejam inválidos
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.log(error)
      }
    }
    init()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
