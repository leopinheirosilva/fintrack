import { Link } from 'react-router'

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
import { Input } from '@/components/ui/input'

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira os seus dados abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Inputs */}
          <Input placeholder="Digite o seu nome" />
          <Input placeholder="Digite o seu sobrenome" />
          <Input placeholder="Digite o seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Digite sua senha novamente" />
          {/* Termos e Condições */}
          <div className="items-top flex space-x-2 pt-3">
            <Checkbox id="terms" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-xs font-medium leading-none text-muted-foreground opacity-75 peer-disabled:cursor-not-allowed"
              >
                Ao clicar em &quot;Criar conta&quot;, você aceita{' '}
                <a href="#" className="text-white underline">
                  nosso termo de uso e política de privacidade
                </a>
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
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
