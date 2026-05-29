import { Loader2Icon } from 'lucide-react'
import { Link, Navigate } from 'react-router'
import { toast } from 'sonner'

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
import { useAuthContext } from '@/contexts/auth'
import { useSignupForm } from '@/forms/hooks/user'

const SignupPage = () => {
  const { user, isInitializing } = useAuthContext()
  const { form, handleSubmit } = useSignupForm()

  const handleButtonClick = () => {
    // verifica se a checkbox está selectionada
    if (form.formState.errors.terms) {
      return toast.error('Aceite os termos e condições para criar conta')
    }
    form.handleSubmit(handleSubmit)()
  }

  if (isInitializing) return null

  if (user) {
    return <Navigate to="/" />
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
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Digite o seu nome"
                        {...field}
                      />
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
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Digite o seu sobrenome"
                        {...field}
                      />
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
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Digite um e-mail válido"
                        {...field}
                      />
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
                        disabled={form.formState.isSubmitting}
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
                        disabled={form.formState.isSubmitting}
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
                        disabled={form.formState.isSubmitting}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-xs font-medium leading-none text-muted-foreground opacity-75"
                      >
                        Ao clicar em &quot;Criar conta&quot;, você aceita
                        <a href="#" className="ml-1 text-white underline">
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
              <Button
                type="button"
                className="w-full"
                onClick={handleButtonClick}
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
                Criar conta
              </Button>
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
