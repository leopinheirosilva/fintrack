import { useMutation } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'
import { protectedApi } from '@/lib/axios'
import { UserService } from '@/services/user'

// criação do contexto
export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signout: () => {},
})

// hook personalizado para importar o contexto
export const useAuthContext = () => useContext(AuthContext)

// armazena os tokens do usuário criado no local storage
const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)

  // mutation da signup page
  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables)
      return response
    },
  })
  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser)
        setTokens(createdUser.tokens)
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
      const response = await UserService.login(variables)
      return response
    },
  })
  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser)
        setTokens(loggedUser.tokens)

        toast.success('Usuário logado com sucesso')
      },
      onError: () => {
        toast.error('Usuário inválido! Por favor, tente novamente')
      },
    })
  }

  const signout = () => {
    setUser(null)
    removeTokens()
  }

  // persiste o usuário
  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        // pega os tokens do usuário armazenados no local storage
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        )
        if (!accessToken && !refreshToken) return
        const response = await protectedApi.get('/users/me')
        setUser(response.data)
      } catch (error) {
        // remove o state de usuário caso os tokens sejam inválidos
        setUser(null)
        console.log(error)
      } finally {
        setIsInitializing(false)
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
        signout,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
