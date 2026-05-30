import { Loader2Icon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useCreateTransactionForm } from '@/forms/hooks/transaction'

import TransactionTypeSelect from './transaction-type-select'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { ForwardedNumericFormat } from './ui/forwarded-numeric-format'
import { Input } from './ui/input'

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const { form, handleSubmit } = useCreateTransactionForm({
    onSuccess: () => {
      setDialogIsOpen(false)
      toast.success('Transação criada com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao criar transação!')
    },
  })

  return (
    <div>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon /> Nova transação
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex items-center">
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label>Nome</label>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Digite o nome da transação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Valor */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <label>Valor</label>
                    <FormControl>
                      <ForwardedNumericFormat
                        disabled={form.formState.isSubmitting}
                        placeholder="Digite o valor da transação"
                        {...field}
                        onChange={() => {}}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Data */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <label>Data</label>
                    <FormControl>
                      <DatePicker
                        disabled={form.formState.isSubmitting}
                        placeholder="Selectione a data da transação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tipo da transação (EARNING, EXPENSE ou INVESTMENT) */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TransactionTypeSelect
                        disabled={form.formState.isSubmitting}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Botões de adicionar e cancelar */}
              <DialogFooter className="sm:space-x-4">
                <DialogClose asChild>
                  <Button
                    type="reset"
                    variant="secondary"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddTransactionButton
