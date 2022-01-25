import React, {useEffect, useState } from 'react';
import styled from 'styled-components';

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
function BKK(cragId) {
  const [cragTitle, setCragTitle] = useState(null);
  
  useEffect(()=>{
    const url = 'https://cors-anywhere.herokuapp.com/https://ute.bergenklatreklubb.no/forere/cragdatabase/felt.php?Felt_id=' + cragId;
    const requestOptions = {
      method: 'GET',
      headers: {    
          'Accept': 'text/html',
          'Access-Control-Allow-Origin': '*' }}
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(function(result) {
        let parser = new DOMParser();
        const doc = parser.parseFromString(result, 'text/html');
        const titleTag = doc.getElementsByTagName('title')
        const title = titleTag[0].innerHTML
        setCragTitle(title);
        return console.log(title);
        // return title
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <>
      <p>Bruker en proxy for å få data fra bergenklatreklubb. Her er link <a href="https://github.com/Rob--W/cors-anywhere/">https://github.com/Rob--W/cors-anywhere/</a>, du må spørre om access for at det funker fra din maksin!</p>
      <ListItem>
        <LocationName> {cragId} {cragTitle} </LocationName>
      </ListItem>
    </>
  );
}

export default BKK;
