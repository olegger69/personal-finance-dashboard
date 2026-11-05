import React from 'react';

const SummaryCards = ({ summary }) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Общий доход</h3>
          <p className="text-3xl font-bold text-green-600">
            ${summary.income.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Общие расходы</h3>
          <p className="text-3xl font-bold text-red-600">
            ${summary.expenses.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Текущий баланс</h3>
          <p className={`text-3xl font-bold ${summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            ${summary.balance.toFixed(2)}
          </p>
        </div>
      </div>
  );
};

export default SummaryCards;