import * as React from 'react'
import { DataGrid, GridColDef} from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { useState } from 'react'
import _ from 'lodash'
import Grid from '@mui/material/Grid'
import { faker } from '@faker-js/faker';
import dynamic from "next/dynamic"
const Summary = dynamic(()=> import ('./Summary'), {ssr:false})


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'product', headerName: 'Product', width: 300 },
  { field: 'price', headerName: 'Price', width: 200, },
  { field: 'category', headerName: 'category', width: 300 },
  { field: 'inventory', headerName: 'Inventory', width: 300 }
];

let rows : any= []// { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
for(let i = 1; i <= 300; i++) {
  rows.push({
    id: i,
    product: faker.commerce.product(),
    price: faker.datatype.number({'min': 10,'max': 50}),
    category: faker.helpers.arrayElement(['Stationary', 'Utils', 'Food', 'Equipment', 'Electronics']),
    inventory: faker.helpers.arrayElement(['Available', 'Required'])
  })
}


const findRows = (filter: any) : any => {
  if(_.isEmpty(filter)) {
    return rows;
  }
  let res = []
  for(let key in filter) {
    if(filter[key]) {
      res.push(rows[Number(key)]);
    }
  }
  return res;
}

export default function DataTable() {

    const [summaryRows, setSummaryRows]= useState(rows);
    let filteredRows: any = null

    const handleStateChange : any = (newState: any) => {
        if(! _.isEqual(filteredRows, newState.filter.filteredRowsLookup)){
            // console.log(newState);
            filteredRows = newState.filter.filteredRowsLookup
            setSummaryRows(findRows(filteredRows))
        }
    }

    return (
        <div style={{ width: '100%', margin : 'auto' }}>
        <Grid>
          <Grid>
            <Summary rows = {summaryRows}/>
          </Grid>
          <Grid>
              <DataGrid
                // sx={{ m: 5 }} 
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                autoHeight
                paginationMode = 'client'
                filterMode = 'client'
                sortingMode = 'client'
                onStateChange={handleStateChange}
              />
          </Grid>
        </Grid>
        
        </div>
    );
}