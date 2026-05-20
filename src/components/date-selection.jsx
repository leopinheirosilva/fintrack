import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/contexts/auth'

import { DatePickerWithRange } from './ui/date-picker-with-range'

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd')

const getInitialDateState = (searchParams) => {
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  }
  // se o "from" e o "to" não existirem, retorna default
  if (!from || !to) {
    return defaultDate
  }
  // se o "from" e o "to" não forem válidos, retorna default
  if (!isValid(new Date(from)) || !isValid(new Date(to))) {
    return defaultDate
  }
  // se o "from" e o "to" forem válidos, retorna a data selecionada
  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  }
}

const DateSelection = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  const [date, setDate] = useState(getInitialDateState(searchParams))

  // persiste o state "date" na URL (?from&to=) e atualiza o state com esse valor quando a página é carregada
  useEffect(() => {
    // early return
    if (!date?.from || !date?.to) return

    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDateToQueryParam(date.from))
    queryParams.set('to', formatDateToQueryParam(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
    })
  }, [navigate, date, queryClient, user.id])

  return <DatePickerWithRange value={date} onChange={setDate} />
}

export default DateSelection
