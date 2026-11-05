import { useTransactions } from './hooks/useTransactions'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Charts from './components/Charts'
import MonthFilter from './components/MonthFilter'

export default function App() {
  const { transactions, filtered, totals, month, setMonth, add, remove } = useTransactions()

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Мои финансы</h1>
        <MonthFilter month={month} setMonth={setMonth} />
      </header>

      <SummaryCards totals={totals} />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <TransactionForm onAdd={add} />
        <TransactionList items={filtered} onRemove={remove} />
      </div>

      <Charts filtered={filtered} all={transactions} />
    </div>
  )
}
