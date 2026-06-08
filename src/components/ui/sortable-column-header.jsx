import { ArrowUpDownIcon } from 'lucide-react'

import { Button } from './button'

const SortableColumnHeader = ({ column, children }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <ArrowUpDownIcon />
    </Button>
  )
}

export default SortableColumnHeader
