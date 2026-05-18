import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import logo from '@/assets/icons/logo.svg'
import { useAuthContext } from '@/contexts/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Header = () => {
  const { user, signout } = useAuthContext()

  return (
    <div>
      <Card>
        <CardContent className="flex items-center justify-between px-8 py-4">
          <div>
            <img src={logo} alt="FinTrack logo" />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="space-x-1 py-6">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4"></AvatarImage>
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full justify-start"
                    onClick={signout}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
