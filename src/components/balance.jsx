import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetUserBalance } from '@/api/hooks/user'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') // YYY-MM-DD
  const to = searchParams.get('to') // YYY-MM-DD
  const { data } = useGetUserBalance({ from, to })

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      {/* saldo */}
      <BalanceItem
        label="Saldo"
        amount={data?.balance}
        icon={<WalletIcon size={16} />}
      />
      {/* ganhos */}
      <BalanceItem
        label="Ganhos"
        amount={data?.earnings}
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
      />
      {/* despesas */}
      <BalanceItem
        label="Despesas"
        amount={data?.expenses}
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
      />
      {/* investimentos */}
      <BalanceItem
        label="Investimentos"
        amount={data?.investments}
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
      />
    </div>
  )
}

export default Balance
