import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import dynamic from "next/dynamic"

type PropsType = {
    rows: any
}
const MyChart = dynamic(()=> import ('./MyChart'), {ssr:false})

const Summary = ({ rows }: PropsType) => {
    function totalProductsRequired() : number {
        let total = 0;
        rows.forEach((row: any) => {
            if(row.inventory === 'Required') total += 1;
        })
        return total;   
    }

    function totalPurchasePrice(): number {
        let total = 0;
        rows.forEach((row: any) => {
            if(row.inventory === 'Required') total += row.price;
        })
        return total;
    }
    // ['Stationary', 'Utils', 'Food', 'Equipment', 'Electronics']
    // console.log(rows);
    const data = [
        rows.filter((col : any) => col.category === 'Stationary').length,
        rows.filter((col : any) => col.category === 'Utils').length,
        rows.filter((col : any) => col.category === 'Food').length,
        rows.filter((col : any) => col.category === 'Equipment').length,
        rows.filter((col : any) => col.category === 'Electronics').length,
    ]
    return (
        <div style={{marginBottom: '3%'}}>
            <Grid container direction = 'row' margin = '2%'>
                <Grid item sm = {4}  marginLeft = '5%' marginRight = '3%'>
                    <Paper elevation={3} style = {{padding: '1%'}}>
                        <Typography variant="h5"  margin = '3%'>Total Products Required = {totalProductsRequired().toLocaleString()}</Typography>
                    </Paper>
                </Grid>
                <Grid item sm = {4}>
                    <Paper elevation={3} style = {{padding: '1%'}}>
                        <Typography variant="h5" margin = '3%'>Total Purchase Price = {totalPurchasePrice().toLocaleString()}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid>
                <MyChart data = {data} />
            </Grid>            
        </div>
    )
}

export default Summary;