import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useAuthContext } from '@/contexts/auth'

import { loginFormSchema, signupFormSchema } from '../schemas/user'

export const useLoginForm = () => {
  const { login } = useAuthContext()

  // validação do zod para o React Hook Form
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  // chama o login do AuthContext
  const handleSubmit = (data) => login(data)

  return { form, handleSubmit }
}

export const useSignupForm = () => {
  const { signup } = useAuthContext()

  // validação do zod para o React Hook Form
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })
  // chama o signup do AuthContext
  const handleSubmit = (data) => signup(data)

  return { form, handleSubmit }
}
