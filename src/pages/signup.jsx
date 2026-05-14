import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

import PasswordInput from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthContext } from '@/contexts/auth'

// regras para validação de campos do formulário com zod
const signupSchema = z
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

const SignupPage = () => {
  const { user, signup } = useContext(AuthContext)

  // validação do zod para o React Hook Form
  const form = useForm({
    resolver: zodResolver(signupSchema),
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

  if (user) {
    return <h1>Olá, {user.first_name} </h1>
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle>Crie a sua conta</CardTitle>
              <CardDescription>Insira os seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Nome */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <label>Nome</label>
                    <FormControl>
                      <Input placeholder="Digite o seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Sobrenome */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <label>Sobrenome</label>
                    <FormControl>
                      <Input placeholder="Digite o seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label>Email</label>
                    <FormControl>
                      <Input placeholder="Digite um e-mail válido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Senha */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <label>Senha</label>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Confirmação de senha */}
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <label>Confirmação de Senha</label>
                    <FormControl>
                      <PasswordInput
                        placeholder="Digite sua senha novamente"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Termos e Condições */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex space-x-2 space-y-0 pt-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className={
                          form.formState.errors.terms && 'border-red-500'
                        }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <label
                        htmlFor="terms"
                        className={`text-xs font-medium leading-none text-muted-foreground opacity-75 ${form.formState.errors.terms && 'text-red-500'}`}
                      >
                        Ao clicar em &quot;Criar conta&quot;, você aceita{' '}
                        <a
                          href="#"
                          className={`underline ${form.formState.errors.terms && 'text-red-500'}`}
                        >
                          nosso termo de uso e política de privacidade
                        </a>
                      </label>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              {/* Criar conta */}
              <Button className="w-full">Criar conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {/* Login */}
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ja possui uma conta?</p>
        <Button variant="link" asChild className="p-2">
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
