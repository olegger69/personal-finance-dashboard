import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Транзакции</h2>
                <p className="text-gray-500 text-center py-8">Нет транзакций за этот месяц</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Транзакции</h2>
            <div className="space-y-2">
                {transactions.map(transaction => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                                <span className="font-medium">{transaction.description}</span>
                                <span className="text-sm text-gray-500">({transaction.category})</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                {new Date(transaction.date).toLocaleDateString('ru-RU')}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
              <span className={`font-bold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
                            <button
                                onClick={() => onDelete(transaction.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                                aria-label="Удалить транзакцию"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;