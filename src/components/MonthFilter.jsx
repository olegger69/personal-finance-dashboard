export default function MonthFilter({ month, setMonth }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="month" className="text-sm text-ink/70">Период</label>
      <input
        id="month"
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="field w-auto"
      />
      {month && (
        <button onClick={() => setMonth('')} className="text-sm text-income underline">
          Показать всё время
        </button>
      )}
    </div>
  )
}
