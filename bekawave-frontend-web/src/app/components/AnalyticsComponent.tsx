"use client";
import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Define types for chart data
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string[];
        borderColor?: string;
        fill?: boolean;
    }[];
}

const AnalyticsComponent: React.FC = () => {
    const pieData: ChartData = {
        labels: ['West', 'Marurui', 'Home'],
        datasets: [
            {
                label: 'Stock Distribution',
                data: [300, 150, 200],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    // @ts-ignore
    const lineData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Stock Levels Over Time',
                data: [120, 200, 150, 80, 70, 220, 300],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Stock Levels Over Time',
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="h-full w-full p-6 rounded-md">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Stock Distribution</h2>
                <Pie data={pieData} options={pieOptions} />
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-center">Stock Levels Over Time</h2>
                <Line data={lineData} options={lineOptions} />
            </div>
        </div>
    );
};

export default AnalyticsComponent;
