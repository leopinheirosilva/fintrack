import { ExternalLinkIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useEditTransactionForm } from '@/forms/hooks/transaction'

import DeleteTransactionButton from './delete-transaction-button'
import TransactionTypeSelect from './transaction-type-select'
import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { ForwardedNumericFormat } from './ui/forwarded-numeric-format'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false)

  const { form, handleSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      setSheetIsOpen(false)
      toast.success('Transação editada com sucesso')
    },
    onError: () => {
      toast.error('Ocorreu um erro ao ediar a transação')
    },
  })

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ExternalLinkIcon className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex min-w-[450px] flex-col">
        <SheetTitle className="mb-3 text-center">Editar Transação</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-1 flex-col"
          >
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex-1 space-y-8">
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
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <DeleteTransactionButton
                    transactionId={transaction.id}
                    onSuccess={() => setSheetIsOpen(false)}
                    isSubmitting={form.formState.isSubmitting}
                  />
                </div>
              </div>
              <div>
                {/* Botões de salvar e cancelar */}
                <SheetFooter className="sm:space-x-4">
                  <SheetClose asChild>
                    <Button
                      type="reset"
                      variant="secondary"
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      Cancelar
                    </Button>
                  </SheetClose>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting && (
                      <Loader2Icon className="animate-spin" />
                    )}
                    Salvar
                  </Button>
                </SheetFooter>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
