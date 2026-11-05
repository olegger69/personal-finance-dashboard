import { useState } from 'react'
import { CATEGORIES } from '../hooks/useTransactions'

const today = () => new Date().toISOString().slice(0, 10)

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES.expense[0])
  const [date, setDate] = useState(today())
  const [note, setNote] = useState('')

  const changeType = (t) => {
    setType(t)
    setCategory(CATEGORIES[t][0])
  }

  const submit = (e) => {
    e.preventDefault()
    const value = parseFloat(amount)
    if (!value || value <= 0) return
    onAdd({ type, amount: value, category, date, note: note.trim() })
    setAmount('')
    setNote('')
  }

  return (
    <form onSubmit={submit} className="panel space-y-3 self-start">
      <h2 className="font-bold">Новая операция</h2>
      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Тип операции">
        {[['expense', 'Расход'], ['income', 'Доход']].map(([v, label]) => (
          <button
            key={v}
            type="button"
            onClick={() => changeType(v)}
            aria-pressed={type === v}
            className={`rounded-md border py-2 text-sm font-medium ${
              type === v ? 'border-ink bg-ink text-white' : 'border-ink/20 bg-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <input className="field" type="number" min="0" step="0.01" placeholder="Сумма, ₽"
        aria-label="Сумма" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <select className="field" aria-label="Категория" value={category}
        onChange={(e) => setCategory(e.target.value)}>
        {CATEGORIES[type].map((c) => <option key={c}>{c}</option>)}
      </select>
      <input className="field" type="date" aria-label="Дата" value={date}
        onChange={(e) => setDate(e.target.value)} required />
      <input className="field" type="text" placeholder="Комментарий (необязательно)"
        aria-label="Комментарий" value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit" className="w-full rounded-md bg-income py-2 font-medium text-white hover:opacity-90">
        Добавить
      </button>
    </form>
  )
}
