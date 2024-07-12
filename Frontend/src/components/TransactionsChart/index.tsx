import React from 'react';
import { Line } from 'react-chartjs-2';
import { ITransactionsChartProps } from '../../interfaces/ITransactions';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TransactionsChart: React.FC<ITransactionsChartProps> = ({ transactions }) => {
  const data = {
    labels: transactions.map((_, index) => `Transaction ${index + 1}`),
    datasets: [
      {
        label: 'Transaction Value in USD',
        data: transactions.map((transaction) => transaction.value / 10 ** 18), // Conversão exemplo
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Transactions Over Time',
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionsChart;
