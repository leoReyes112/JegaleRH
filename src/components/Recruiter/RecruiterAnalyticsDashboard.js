import React, { useEffect, useState, useMemo } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import DB from '../../mock/database';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const RecruiterAnalyticsDashboard = ({ vacancies, candidates }) => {
  const [metrics, setMetrics] = useState({
    totalVacancies: 0,
    totalApplications: 0,
    applicationStatusCounts: {},
  });

  useEffect(() => {
  // Normaliza los estados a español
  const statusMap = {
    accepted: 'Aceptadas',
    Aceptadas: 'Aceptadas',
    rejected: 'Rechazadas',
    Rechazadas: 'Rechazadas',
    pending: 'Por definirse',
    'Por definirse': 'Por definirse',
  };

  const statusCounts = candidates.reduce((acc, app) => {
    const estado = statusMap[app.status] || 'Por definirse';
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  setMetrics({
    totalVacancies: vacancies.length,
    totalApplications: candidates.length,
    applicationStatusCounts: statusCounts,
  });
}, [vacancies, candidates]);

  //aqui 

  // Colors: accepted (green), rejected (yellow), pending (red)
  const defaultColors = ['#16a34a', '#fbbf24', '#dc2626'];

  // Memoriza los datos para evitar recrearlos en cada render
  const barData = useMemo(() => ({
    labels: ['Vacantes', 'Solicitudes'],
    datasets: [
      {
        label: 'Cantidad',
        data: [metrics.totalVacancies, metrics.totalApplications],
        backgroundColor: [defaultColors[0], defaultColors[1]],
      },
    ],
  }), [metrics, defaultColors]);

  const barOptions = useMemo(() => ({
    responsive: true,
    animation: {
      duration: 800,
      loop: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return context.parsed.y + ' items';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  }), []);

  const pieData = useMemo(() => {
 // Siempre muestra los tres estados en el mismo orden
  const labels = ['Aceptadas', 'Rechazadas', 'Por definirse'];
  const data = [
    metrics.applicationStatusCounts['Aceptadas'] || 0,
    metrics.applicationStatusCounts['Rechazadas'] || 0,
    metrics.applicationStatusCounts['Por definirse'] || 0,
  ];
  const backgroundColor = [defaultColors[0], defaultColors[1], defaultColors[2]];

  // Si no hay datos, muestra "Sin datos"
  if (data.every(v => v === 0)) {
    return {
      labels: ['Sin datos'],
      datasets: [{
        data: [1],
        backgroundColor: ['#d1d5db'],
      }],
    };
  }

  return {
    labels,
    datasets: [{
      data,
    backgroundColor,
    }],
  };
}, [metrics, defaultColors]);


  const pieOptions = useMemo(() => ({
    responsive: true,
    animation: {
      duration: 800,
      loop: false,
    },
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + ' solicitudes';
          }
        }
      }
    },
  }), []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Panel de Análisis de Vacantes y Solicitudes</h2>
      <p className="mb-6 text-center text-gray-600">
        Este panel muestra un resumen visual de las vacantes y solicitudes, incluyendo el estado de las solicitudes.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">Vacantes y Solicitudes</h3>
          <Bar data={barData} options={barOptions} height={250} />
          <p className="mt-4 text-center text-sm text-gray-500">
            El gráfico de barras muestra la cantidad total de vacantes y solicitudes activas.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">Estado de Solicitudes</h3>
          <Pie data={pieData} options={pieOptions} height={250} />
          <p className="mt-4 text-center text-sm text-gray-500">
            El gráfico circular representa la distribución de las solicitudes según su estado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterAnalyticsDashboard;
