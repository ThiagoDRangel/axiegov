import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ITransactionsChartProps } from '../../interfaces/ITransactions';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type ValueRangeKey = '0 - 1 USD' | '2 - 50 USD' | '51 - 100 USD' | 'Above 100 USD';

interface ValueRange {
  count: number;
  total: number;
}

const TransactionsPieChart: React.FC<ITransactionsChartProps> = ({ transactions }) => {
  const valueRanges: Record<ValueRangeKey, ValueRange> = {
    '0 - 1 USD': { count: 0, total: 0 },
    '2 - 50 USD': { count: 0, total: 0 },
    '51 - 100 USD': { count: 0, total: 0 },
    'Above 100 USD': { count: 0, total: 0 },
  };

  transactions.forEach((transaction) => {
    const valueInUsd = transaction.value / 10 ** 18;

    if (valueInUsd <= 1) {
      valueRanges['0 - 1 USD'].count++;
      valueRanges['0 - 1 USD'].total += valueInUsd;
    } else if (valueInUsd <= 50) {
      valueRanges['2 - 50 USD'].count++;
      valueRanges['2 - 50 USD'].total += valueInUsd;
    } else if (valueInUsd <= 100) {
      valueRanges['51 - 100 USD'].count++;
      valueRanges['51 - 100 USD'].total += valueInUsd;
    } else {
      valueRanges['Above 100 USD'].count++;
      valueRanges['Above 100 USD'].total += valueInUsd;
    }
  });

  const data = {
    labels: Object.keys(valueRanges).map(key => `${valueRanges[key as ValueRangeKey].count} operations of ${key}`),
    datasets: [
      {
        label: 'Transaction Value Ranges',
        data: Object.values(valueRanges).map(range => range.count),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  };

  const totalOperations = transactions.length;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: `Transaction Value Distribution (Total: ${totalOperations} operations)`,
      },
    },
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default TransactionsPieChart;
