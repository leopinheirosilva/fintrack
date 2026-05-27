import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

import { Button } from './ui/button'

const TransactionTypeSelect = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Ganho */}
      <Button
        type="button"
        variant={value == 'EARNING' ? 'secondary' : 'outline'}
        onClick={() => onChange('EARNING')}
      >
        <TrendingUpIcon className="text-primary-green" />
        Ganho
      </Button>
      {/* Gasto */}
      <Button
        type="button"
        variant={value == 'EXPENSE' ? 'secondary' : 'outline'}
        onClick={() => onChange('EXPENSE')}
      >
        <TrendingDownIcon className="text-primary-red" />
        Gasto
      </Button>
      {/* Investimento */}
      <Button
        type="button"
        variant={value == 'INVESTMENT' ? 'secondary' : 'outline'}
        onClick={() => onChange('INVESTMENT')}
      >
        <PiggyBankIcon className="text-primary-blue" />
        Investimento
      </Button>
    </div>
  )
}

export default TransactionTypeSelect
