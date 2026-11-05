import { formatMoney } from '../hooks/useTransactions'

export default function SummaryCards({ totals }) {
  const items = [
    { label: 'Баланс', value: totals.balance, color: totals.balance < 0 ? 'text-expense' : 'text-ink' },
    { label: 'Доходы', value: totals.income, color: 'text-income' },
    { label: 'Расходы', value: totals.expense, color: 'text-expense' },
  ]
  return (
    <section className="grid gap-4 sm:grid-cols-3" aria-label="Сводка">
      {items.map((i) => (
        <div key={i.label} className="panel">
          <p className="text-sm text-ink/70">{i.label}</p>
          <p className={`mt-1 text-2xl font-extrabold tabular-nums ${i.color}`}>
            {formatMoney(i.value)}
          </p>
        </div>
      ))}
    </section>
  )
}
