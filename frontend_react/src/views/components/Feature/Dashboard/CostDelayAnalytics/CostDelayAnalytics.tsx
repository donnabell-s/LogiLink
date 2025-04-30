// import { useEffect, useRef } from 'react';
// import { Chart, registerables } from 'chart.js';
// import './CostDelayAnalytics.css';

// const demandForecastData = {
//     labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
//     datasets: [
//         {
//             label: 'Actual Demand (Historical)',
//             data: [4000, 3000, 2000, 2780, 1890, 2390, 3490, null, null, null],
//             borderColor: '#4BC0C0', // Green
//             backgroundColor: '#4BC0C0',
//             borderWidth: 2,
//             tension: 0.4,
//             fill: false,
//         },
//         {
//             label: 'Forecasted Demand',
//             data: [null, null, null, null, null, null, null, 3000, 3500, 4000],
//             borderColor: '#36A2EB', // Blue
//             backgroundColor: '#36A2EB',
//             borderWidth: 2,
//             borderDash: [6, 4],
//             tension: 0.4,
//             fill: false,
//         },
//         {
//             label: 'Trend Line',
//             data: [4000, 3500, 3000, 2500, 2000, 2000, 2500, 3000, 3500, 4000],
//             borderColor: '#C9CBCE', // Grey
//             backgroundColor: '#C9CBCE',
//             borderWidth: 2,
//             borderDash: [2, 2],
//             tension: 0.2,
//             fill: false,
//         },
//         {
//             label: 'Seasonal Trend',
//             data: [null, null, null, 3000, 4000, 3500, 4500, 4000, 3000, 3500],
//             borderColor: '#FF6384', // Red
//             backgroundColor: '#FF6384',
//             borderWidth: 2,
//             borderDash: [8, 4],
//             tension: 0.4,
//             fill: false,
//         },
//         // Confidence Interval - Lower Bound
//         {
//             label: 'Confidence Interval Lower',
//             data: [null, null, null, 2500, 3500, 3000, 4000, 3500, 4500, 4000],
//             borderColor: 'transparent',
//             backgroundColor: 'rgba(75, 192, 192, 0.1)',
//             pointRadius: 0,
//             borderWidth: 0,
//             fill: '+1',
//         },
//         // Confidence Interval - Upper Bound
//         {
//             label: 'Confidence Interval Upper',
//             data: [null, null, null, 3500, 4500, 4000, 5000, 4500, 5500, 5000],
//             borderColor: 'transparent',
//             backgroundColor: 'rgba(75, 192, 192, 0.1)',
//             pointRadius: 0,
//             borderWidth: 0,
//             fill: false,
//         },
//     ],
// };

// export const CostDelayAnalytics = () => {
//     const chartRef = useRef<HTMLCanvasElement | null>(null);
//     const chartInstanceRef = useRef<Chart | null>(null);

//     useEffect(() => {
//         Chart.register(...registerables);

//         if (chartRef.current) {
//             const ctx = chartRef.current.getContext('2d');
//             if (ctx) {
//                 if (chartInstanceRef.current) {
//                     chartInstanceRef.current.destroy();
//                 }

//                 chartInstanceRef.current = new Chart(ctx, {
//                     type: 'line',
//                     data: demandForecastData,
//                     options: {
//                         responsive: true,
//                         plugins: {
//                             title: {
//                                 display: false,
//                                 text: 'Demand Forecast with Trends and Confidence Intervals',
//                             },
//                             legend: {
//                                 display: false,
//                                 position: 'bottom',
//                             },
//                             tooltip: {
//                                 mode: 'index',
//                                 intersect: false,
//                             },
//                         },
//                         interaction: {
//                             mode: 'nearest',
//                             axis: 'x',
//                             intersect: false,
//                         },
//                         scales: {
//                             x: {
//                                 ticks: {
//                                     display: false, // Hide the tick labels (e.g., Week 1, Week 2...)
//                                 },
//                                 grid: {
//                                     display: false, // Optional: also hide grid lines if you want a cleaner look
//                                 },
//                                 title: {
//                                     display: false,
//                                 },
//                             },                            
//                             y: {
//                                 beginAtZero: true,
//                                 title: {
//                                     display: true,
//                                     text: '',
//                                 },
//                             },
//                         },
//                     },
//                 });
//             }
//         }

//         return () => {
//             if (chartInstanceRef.current) {
//                 chartInstanceRef.current.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div className="cost-delay-analytics d-flex flex-column justify-content-center gap-2">
//             <div><h6>Demand Forecast</h6></div>
//             <canvas ref={chartRef} />
//         </div>
//     );
// };


import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { fetchForecast, ForecastInput } from '../../../../../services/apiService';
import './CostDelayAnalytics.css';

const historicalData: ForecastInput[] = [
    { ds: "2024-04-01", y: 4000 },
    { ds: "2024-04-02", y: 3000 },
    { ds: "2024-04-03", y: 2000 },
    { ds: "2024-04-04", y: 2780 },
    { ds: "2024-04-05", y: 1890 },
    { ds: "2024-04-06", y: 2390 },
    { ds: "2024-04-07", y: 3490 },
];

const forecastPeriods = 3; // Fetch 3 days forecast

export const CostDelayAnalytics = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        Chart.register(...registerables);

        const loadData = async () => {
            const result = await fetchForecast(historicalData, forecastPeriods);

            if ('error' in result) {
                console.error('Forecast error:', result.error);
                return;
            }

            const allDates = [...historicalData.map(d => d.ds), ...result.map(f => f.ds)];
            const actualData = [...historicalData.map(d => d.y), ...Array(result.length).fill(null)];
            const forecastedData = [
                ...Array(historicalData.length).fill(null),
                ...result.map(f => Math.round(f.yhat)) // Optional: round for display
            ];

            const chartData = {
                labels: allDates.map((_, i) => `Day ${i + 1}`),
                datasets: [
                    {
                        label: 'Actual Demand (Historical)',
                        data: actualData,
                        borderColor: '#4BC0C0',
                        backgroundColor: '#4BC0C0',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                    },
                    {
                        label: 'Forecasted Demand',
                        data: forecastedData,
                        borderColor: '#36A2EB',
                        backgroundColor: '#36A2EB',
                        borderWidth: 2,
                        borderDash: [6, 4],
                        tension: 0.4,
                        fill: false,
                    }
                ]
            };

            if (chartRef.current) {
                const ctx = chartRef.current.getContext('2d');
                if (ctx) {
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }

                    chartInstanceRef.current = new Chart(ctx, {
                        type: 'line',
                        data: chartData,
                        options: {
                            responsive: true,
                            plugins: {
                                title: { display: false },
                                legend: { display: false, position: 'bottom' },
                                tooltip: { mode: 'index', intersect: false },
                            },
                            interaction: {
                                mode: 'nearest',
                                axis: 'x',
                                intersect: false,
                            },
                            scales: {
                                x: {
                                    ticks: { display: false },
                                    grid: { display: false },
                                    title: { display: false },
                                },
                                y: {
                                    beginAtZero: true,
                                    title: { display: false, text: 'Demand' },
                                },
                            },
                        },
                    });
                }
            }
        };

        loadData();

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="cost-delay-analytics d-flex flex-column justify-content-center gap-2">
            <div><h6>Demand Forecast</h6></div>
            <canvas ref={chartRef} />
        </div>
    );
};
