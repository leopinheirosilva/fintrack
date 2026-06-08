import { cva } from 'class-variance-authority'
import { CircleIcon } from 'lucide-react'

const typeVariants = cva(
  'flex w-fit items-center gap-1.5 rounded-full bg-muted px-2 py-[2px] text-xs font-bold',
  {
    variants: {
      variant: {
        EARNING: 'text-primary-green fill-primary-green',
        EXPENSE: 'text-primary-red fill-primary-red',
        INVESTMENT: 'text-primary-blue fill-primary-blue',
      },
    },
  }
)

const getText = (variant) => {
  switch (variant) {
    case 'EARNING':
      return 'Ganho'
    case 'EXPENSE':
      return 'Gasto'
    case 'INVESTMENT':
      return 'Investimento'
    default:
      return ''
  }
}

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={typeVariants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getText(variant)}
    </div>
  )
}

export default TransactionTypeBadge
