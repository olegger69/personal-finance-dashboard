import React from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import MonthFilter from './components/MonthFilter';
import { useTransactions } from './hooks/useTransactions';

function App() {
    const {
        transactions,
        summary,
        chartData,
        selectedMonth,
        setSelectedMonth,
        availableMonths,
        addTransaction,
        deleteTransaction,
    } = useTransactions();

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Личный финансовый дашборд</h1>
                    <p className="text-gray-600 mt-2">Отслеживайте свои доходы и расходы</p>
                </header>

                <SummaryCards summary={summary} />

                <MonthFilter
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    availableMonths={availableMonths}
                />

                <Charts chartData={chartData} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TransactionForm onAdd={addTransaction} />
                    <TransactionList transactions={transactions} onDelete={deleteTransaction} />
                </div>
            </div>
        </div>
    );
}

export default App;