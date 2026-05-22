import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useLogin, useSignup } from '@/api/hooks/user'
import { UserService } from '@/api/services/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

// criação do contexto
export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  logout: () => {},
})

// hook personalizado para importar o contexto
export const useAuthContext = () => useContext(AuthContext)

// armazena os tokens do usuário criado no local storage
const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}
// remove os tokens do usuário do local storage
const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isInitializing, setIsInitializing] = useState(true)

  // signup mutation
  const signupMutation = useSignup()
  const signup = async (data) => {
    try {
      const createdUser = await signupMutation.mutateAsync(data)
      setUser(createdUser)
      setTokens(createdUser.tokens)
      toast.success('Conta criada com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar conta! Por favor, tente novamente')
    }
  }

  // login mutation
  const loginMutation = useLogin()
  const login = async (data) => {
    try {
      const loggedUser = await loginMutation.mutateAsync(data)
      setUser(loggedUser)
      setTokens(loggedUser.tokens)
      toast.success('Usuário logado com sucesso')
    } catch (error) {
      console.error(error)
      toast.error('Usuário inválido! Por favor, tente novamente')
    }
  }

  // faz logout
  const logout = () => {
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
        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        // remove o state de usuário caso os tokens sejam inválidos
        console.error(error)
        setUser(null)
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
        logout,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
