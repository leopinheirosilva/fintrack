import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import logo from '@/assets/icons/logo.svg'
import { useAuthContext } from '@/contexts/auth'

import DeleteUserButton from './delete-user-button'
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
  const { user, logout } = useAuthContext()

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
                    <AvatarImage src="/"></AvatarImage>
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
                    onClick={logout}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DeleteUserButton />
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
