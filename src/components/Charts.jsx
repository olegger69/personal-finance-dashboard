import { useMemo } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid,
} from 'recharts'
import { formatMoney } from '../hooks/useTransactions'

const COLORS = ['#0f766e', '#be3a4b', '#c28a1b', '#3b5b8c', '#7a5c99', '#5f8f3e', '#8a8f98']

export default function Charts({ filtered, all }) {
  const byCategory = useMemo(() => {
    const map = {}
    filtered.filter((t) => t.type === 'expense').forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [filtered])

  const byMonth = useMemo(() => {
    const map = {}
    all.forEach((t) => {
      const m = t.date.slice(0, 7)
      map[m] ||= { month: m, Доходы: 0, Расходы: 0 }
      map[m][t.type === 'income' ? 'Доходы' : 'Расходы'] += t.amount
    })
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month)).slice(-6)
  }, [all])

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="panel">
        <h2 className="mb-3 font-bold">Расходы по категориям</h2>
        {byCategory.length === 0 ? (
          <p className="text-sm text-ink/70">Пока нет расходов для диаграммы.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95}>
                {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={formatMoney} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="panel">
        <h2 className="mb-3 font-bold">Доходы и расходы по месяцам</h2>
        {byMonth.length === 0 ? (
          <p className="text-sm text-ink/70">Данные появятся после первых операций.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byMonth}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={formatMoney} />
              <Legend />
              <Bar dataKey="Доходы" fill="#0f766e" />
              <Bar dataKey="Расходы" fill="#be3a4b" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  )
}
