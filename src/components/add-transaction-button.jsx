import { zodResolver } from '@hookform/resolvers/zod'
import {
  PiggyBank,
  PlusIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { toast } from 'sonner'
import z from 'zod'

import { useCreateTransaction } from '@/api/hooks/transaction'
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

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

// regras para validaçõo de campos do formulário com zod
const transactionSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z.number({
    required_error: 'O valor é obrigatório',
  }),
  date: z.date({
    required_error: 'Selecione uma data',
  }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    message: 'Selecione o tipo da transação',
  }),
})

const AddTransactionButton = () => {
  const { mutateAsync: craeteTransaction } = useCreateTransaction()

  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  // validação do zod para o React Hook Form
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })

  const handleSubmit = async (data) => {
    try {
      await craeteTransaction(data)
      setDialogIsOpen(false)
      toast.success('Transação criada com sucesso!')
    } catch (error) {
      console.error(error)
    }
  }

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
                          variant={
                            field.value == 'INVESTMENT'
                              ? 'secondary'
                              : 'outline'
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
              {/* Botões de adicionar e cancelar */}
              <DialogFooter className="sm:space-x-4">
                <DialogClose asChild>
                  <Button type="reset" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
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
