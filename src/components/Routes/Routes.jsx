import React, {useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ReactTable from './ReactTable';

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
      },
      {
        Header: '*',
        accessor: 'col1',
      },
      {
        Header: 'Navn',
        accessor: 'col2',
      },
      {
        Header: 'Bestiger',
        accessor: 'col3',
      },
      {
        Header: 'År',
        accessor: 'col4',
      },
      {
        Header: 'Sikring',
        accessor: 'col5',
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

function Routes(grade) {
  grade = grade.replace('+', '%2B')
  grade = grade.replace('/', '%2F')
  const [response, setResponse] = useState('');
  
  useEffect(()=>{
    const url = 'https://cors-anywhere.herokuapp.com/https://ute.bergenklatreklubb.no/forere/cragdatabase/grad.php?Grad=' + grade;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[grade])
  
  const columns = useMemo(() => parseColumns(response), [response])
  const data = useMemo(() => parseData(response), [response])

  return (
    <>
      <ListItem>
        <LocationName>{grade}</LocationName>
      </ListItem>
      {ReactTable(columns, data)}
    </>
  );
}

export default Routes;
