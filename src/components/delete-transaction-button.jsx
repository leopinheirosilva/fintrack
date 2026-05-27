import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteTransaction } from '@/api/hooks/transaction'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

const DeleteTransactionButton = ({
  transactionId,
  onSuccess,
  isSubmitting,
}) => {
  const { mutate } = useDeleteTransaction(transactionId)

  const handleClick = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success('Transação deletada com sucesso')
        onSuccess()
      },
      onError: (error) => {
        console.error(error)
        toast.error('Erro ao deletar tarefa')
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          type="button"
          disabled={isSubmitting}
          className="font-bold text-primary-red"
        >
          Deletar transação
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar essa transação?
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
  )
}

export default DeleteTransactionButton
