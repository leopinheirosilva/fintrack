import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { formatCurrency } from '@/helpers/currency'

import EditTransactionButton from './edit-transaction-button'
import TransactionTypeBadge from './transaction-type-badge'
import { DataTable } from './ui/data-table'
import { ScrollArea } from './ui/scroll-area'

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type} />
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    // formata o valor em reais
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount)
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    // formata a data usando o date-fns
    cell: ({ row: { original: transaction } }) => {
      return (
        <span className="text-muted-foreground">
          {format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
            locale: ptBR,
          })}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />
    },
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })
  if (!transactions) return null
  return (
    <div className="border bg-card">
      <h2 className="p-6 text-xl font-bold">Transações</h2>
      <ScrollArea className="h-[450px] max-h-[450px] border">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </div>
  )
}

export default TransactionsTable
