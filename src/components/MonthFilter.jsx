import React from 'react';

const MonthFilter = ({ selectedMonth, setSelectedMonth, availableMonths }) => {
    const formatMonth = (monthStr) => {
        const [year, month] = monthStr.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Фильтр по месяцу
            </label>
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {availableMonths.length === 0 ? (
                    <option value={selectedMonth}>{formatMonth(selectedMonth)}</option>
                ) : (
                    availableMonths.map(month => (
                        <option key={month} value={month}>
                            {formatMonth(month)}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
};

export default MonthFilter;