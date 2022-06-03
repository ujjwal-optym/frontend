import { useState, useMemo } from 'react'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'
type columnType = string[];
let col: columnType = [];
type rowType = any
let row: rowType = [];

type propsType = {
    columns: any
    rows: any
}
const Table = ({ columns, rows }: propsType) => {
  const [activePage, setActivePage] = useState<number>(1)
  const [filters, setFilters] = useState<any>({})
  const [sort, setSort] = useState<any>({ order: 'asc', orderBy: 'id' })
  const rowsPerPage = 3

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)

  const count = filteredRows.length
  const totalPages = Math.ceil(count / rowsPerPage)

  const handleSearch = (value: any, accessor: any) => {
    setActivePage(1)

    if (value) {
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        [accessor]: value,
      }))
    } else {
      setFilters((prevFilters: any) => {
        const updatedFilters : any= { ...prevFilters }
        delete updatedFilters[accessor]
        return updatedFilters
      })
    }
  }

  const handleSort = (accessor: any) => {
    setActivePage(1)
    setSort((prevSort: any) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }))
  }

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column: any) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return '⬆️'
                  }
                  return '⬇️'
                } else {
                  return '️↕️'
                }
              }
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                </th>
              )
            })}
          </tr>
          <tr>
            {columns.map((column: any) => {
              return (
                <th>
                  <input
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) => handleSearch(event.target.value, column.accessor)}
                  />
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map((column: any) => {
                  if (column.format) {
                    return <td key={column.accessor}>{column.format(row[column.accessor])}</td>
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p>No data found</p>
      )}

      <div>
        <p>
          <button onClick={clearAll}>Clear all</button>
        </p>
      </div>
    </>
  )
}

export default Table;