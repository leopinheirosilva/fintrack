// funcão helper para converter a data da transação para uma string
export const getTransactionDate = (transaction) => {
  return new Date(transaction.date.split('T')[0] + 'T00:00:00')
}
