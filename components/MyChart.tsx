import * as React from 'react'
import Paper from '@mui/material/Paper'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

type propsType = {
    data : any
}

const MyChart  = ( { data } : propsType) => {
    const chartData : any = {
        labels: ['Stationary', 'Utils', 'Food', 'Equipment', 'Electronics'],
        datasets: [{
        label: 'dataset',
        data: data,
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
               ],
        borderWidth: 1
        }]
       };

    
    return (
        <div style={{margin: '4rem'}}>
            <Paper elevation={3} style= {{padding: '3rem'}}>
            <Doughnut
                data={chartData}
                height="500px"
                width= "500px"
                options={{maintainAspectRatio: false}}
            />
            </Paper>
        </div>
        
    )
}
export default MyChart;