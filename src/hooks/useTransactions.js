import { useEffect, useMemo, useState } from 'react'
import { loadTransactions, saveTransactions } from '../utils/storage'

export const CATEGORIES = {
  expense: ['Еда', 'Жильё', 'Транспорт', 'Здоровье', 'Развлечения', 'Покупки', 'Прочее'],
  income: ['Зарплата', 'Подработка', 'Подарки', 'Прочее'],
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(loadTransactions)
  const [month, setMonth] = useState('') // '' = всё время, иначе 'YYYY-MM'

  useEffect(() => saveTransactions(transactions), [transactions])

  const add = (t) =>
    setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev])
  const remove = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id))

  const filtered = useMemo(
    () =>
      transactions
        .filter((t) => !month || t.date.startsWith(month))
        .sort((a, b) => b.date.localeCompare(a.date)),
    [transactions, month]
  )

  const totals = useMemo(() => {
    const income = filtered.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = filtered.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [filtered])

  return { transactions, filtered, totals, month, setMonth, add, remove }
}

export const formatMoney = (n) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)
