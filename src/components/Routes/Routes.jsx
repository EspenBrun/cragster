import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { matchSorter } from 'match-sorter'

const ListItem = styled.div`
  background-color: #2F333C;
  border-radius: 0.5rem;

  padding: 0.6rem;
  margin: 0rem 0rem 0.4rem 0rem;
`;

const LocationName = styled.h4`
  color: white;
  padding: 0.2rem;
  width: 40%;
`;

function parseColumns(){
  return (
    [
      {
        Header: 'Felt',
        accessor: 'col0',
        filter: 'fuzzyText',
      },
      {
        Header: '*',
        accessor: 'col1',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Navn',
        accessor: 'col2',
        filter: 'fuzzyText',
      },
      {
        Header: 'Bestiger',
        accessor: 'col3',
        filter: 'fuzzyText',
      },
      {
        Header: 'År',
        accessor: 'col4',
        filter: 'fuzzyText',
      },
      {
        Header: 'Sikring',
        accessor: 'col5',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ]
  )
}

function parseData(response){
  if (response) {
    let parser = new DOMParser();
    const doc = parser.parseFromString(response, 'text/html');
    console.log(doc)

    const tableTags = doc.getElementsByTagName('table')
    const tableTag = tableTags[0]
    console.log(tableTag.tHead)

    const dataPre = 
      Array.from(tableTag.tBodies[0].rows).map(row => {
        const cells = row.cells;
        let array = Array.from(cells).map((cell,i) => ['col'+i, cell.innerText])
        let dataEntry = Object.fromEntries(array)
        return dataEntry
      })
    console.log(dataPre)
    return dataPre
  }
  return (
    [{
      col1: 'Hello'
    }]
  )
}

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}

function Routes(grade) {
  grade = grade.replace('+', '%2B')
  grade = grade.replace('/', '%2F')
  const [response, setResponse] = useState('');

  useEffect(()=>{
    if(grade) {
      const url = 'https://obscure-lake-19547.herokuapp.com/https://ute.bergenklatreklubb.no/forere/cragdatabase/grad.php?Grad=' + grade;
      const requestOptions = {
        method: 'GET',
        headers: {    
            'Accept': 'text/html',
            'Access-Control-Allow-Origin': '*' }}
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(function(result) {
          setResponse(result);
          console.log('got result')
        })
    } else {
      setResponse('')
    }
    
    },[grade])
  
  const columns = useMemo(() => parseColumns(), [])
  const data = useMemo(() => parseData(response), [response])

  return (
    <>
      <ListItem>
        <LocationName>{grade}</LocationName>
      </ListItem>
      <Table columns={columns} data={data} />
    </>
  );
}

export default Routes;
