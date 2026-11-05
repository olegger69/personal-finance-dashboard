import { useState, useEffect, useMemo } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => loadTransactions());
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
      return transactionMonth === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  const summary = useMemo(() => {
    const income = filteredTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = filteredTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance };
  }, [filteredTransactions]);

  const chartData = useMemo(() => {
    const incomeVsExpenses = [
      { name: 'Доходы', value: summary.income, fill: '#10b981' },
      { name: 'Расходы', value: summary.expenses, fill: '#ef4444' },
    ];

    const categoryMap = {};
    filteredTransactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
          categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

    const expenseByCategory = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));

    return { incomeVsExpenses, expenseByCategory };
  }, [filteredTransactions, summary]);

  const availableMonths = useMemo(() => {
    const months = new Set();
    transactions.forEach(t => {
      const date = new Date(t.date);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(month);
    });
    return Array.from(months).sort().reverse();
  }, [transactions]);

  return {
    transactions: filteredTransactions,
    summary,
    chartData,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    addTransaction,
    deleteTransaction,
  };
};