import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'

const DeleteUserButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { deleteUser } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    deleteUser()
    navigate('/login')
  }

  return (
    <div>
      <Button
        type="button"
        variant="ghost"
        size="small"
        className="w-full justify-start text-primary-red"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Trash2Icon />
        Remover Conta
      </Button>
      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja remover o usuário logado?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não poderá ser desfeita! Todos os dados serão perdidos
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-primary-red hover:bg-red-800"
              onClick={handleClick}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteUserButton
