import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    Plugin,
} from 'chart.js';
import './NormalChart.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

interface NormalChartProps {
    data: { waste: number; consumption: number; title: string, label1: string, label2: string };
}

const NormalChart: React.FC<NormalChartProps> = ({ data }) => {
    const chartData = {
        labels: [data.label1, data.label2],
        datasets: [
            {
                data: [data.waste, data.consumption],
                backgroundColor: ['#FA4032', '#09B96D'],
                hoverBackgroundColor: ['#FA4032', '#09B96D'],
                borderRadius: 5,
            },
        ],
    };

    const chartOptions: ChartOptions<'doughnut'> = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
        },
        cutout: '70%',
    };

    const centerTextPlugin: Plugin<'doughnut'> = {
        id: 'centerText',
        beforeDraw(chart) {
            const { width } = chart;
            const { height } = chart;
            const ctx = chart.ctx;
            const text = data?.title;
            const fontSize = 16;
            const fontWeight = 500;

            ctx.save();
            ctx.font = `${fontWeight} ${fontSize}px Arial`;
            ctx.fillStyle = '#636363';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, width / 2, height / 2);
            ctx.restore();
        },
    };

    return (
        <div className='doughnut-main'>
            <Doughnut
                data={chartData}
                options={chartOptions}
                plugins={[centerTextPlugin]}
            />
        </div>

    );
};

export default NormalChart;
