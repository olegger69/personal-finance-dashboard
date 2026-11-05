import { formatMoney } from '../hooks/useTransactions'

export default function TransactionList({ items, onRemove }) {
  return (
    <section className="panel">
      <h2 className="mb-3 font-bold">Операции</h2>
      {items.length === 0 ? (
        <p className="text-sm text-ink/70">
          За выбранный период операций нет. Добавьте первую в форме слева.
        </p>
      ) : (
        <ul className="divide-y divide-ink/10">
          {items.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{t.category}</p>
                <p className="truncate text-xs text-ink/60">
                  {new Date(t.date).toLocaleDateString('ru-RU')}
                  {t.note && ` — ${t.note}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold tabular-nums ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  {t.type === 'income' ? '+' : '−'}{formatMoney(t.amount)}
                </span>
                <button onClick={() => onRemove(t.id)} aria-label={`Удалить операцию: ${t.category}`}
                  className="text-sm text-ink/50 hover:text-expense">
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
