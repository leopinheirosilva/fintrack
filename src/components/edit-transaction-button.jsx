import {
  ExternalLinkIcon,
  Loader2Icon,
  PiggyBank,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'

import { useEditTransactionForm } from '@/forms/hooks/transaction'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
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
      <SheetContent className="min-w-[450px]">
        <SheetTitle className="mb-3 text-center">Editar Transação</SheetTitle>
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
                    <NumericFormat
                      disabled={form.formState.isSubmitting}
                      placeholder="Digite o valor da transação"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$"
                      allowNegative={false}
                      customInput={Input}
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
                    <div className="grid grid-cols-3 gap-4">
                      {/* Ganho */}
                      <Button
                        type="button"
                        disabled={form.formState.isSubmitting}
                        variant={
                          field.value == 'EARNING' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EARNING')}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      {/* Gasto */}
                      <Button
                        type="button"
                        disabled={form.formState.isSubmitting}
                        variant={
                          field.value == 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EXPENSE')}
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      {/* Investimento */}
                      <Button
                        type="button"
                        disabled={form.formState.isSubmitting}
                        variant={
                          field.value == 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBank className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
