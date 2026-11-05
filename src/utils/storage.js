const KEY = 'finance-dashboard:transactions'

export function loadTransactions() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveTransactions(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* хранилище недоступно — работаем в памяти */
  }
}
