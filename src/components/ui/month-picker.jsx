'use client'

import { endOfMonth, format, startOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const MonthPicker = ({
  value,
  onChange,
  className,
  placeholder = 'Selecione um mês',
}) => {
  const [displayDate, setDisplayDate] = useState(new Date())

  const handleMonthSelect = (date) => {
    const from = startOfMonth(date)
    const to = endOfMonth(date)
    onChange({ from, to })
  }

  const handlePrevYear = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear() - 1, displayDate.getMonth())
    )
  }

  const handleNextYear = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear() + 1, displayDate.getMonth())
    )
  }

  const months = Array.from(
    { length: 12 },
    (_, i) => new Date(displayDate.getFullYear(), i)
  )

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="month-picker"
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarDaysIcon />
            {value?.from ? (
              format(value.from, 'MMMM', {
                locale: ptBR,
              })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevYear}
                className="h-7 w-7 p-0"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <h2 className="font-semibold">{format(displayDate, 'yyyy')}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextYear}
                className="h-7 w-7 p-0"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((date) => (
                <Button
                  key={date.getMonth()}
                  variant={
                    value?.from &&
                    date.getMonth() === value.from.getMonth() &&
                    date.getFullYear() === value.from.getFullYear()
                      ? 'default'
                      : 'outline'
                  }
                  size="sm"
                  onClick={() => handleMonthSelect(date)}
                  className="h-9"
                >
                  {format(date, 'MMM', { locale: ptBR })}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
