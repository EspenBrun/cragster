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
// fetch("https://ute.bergenklatreklubb.no/forere/cragdatabase/felt.php?Felt_id=31", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     "accept-language": "nb-NO,nb;q=0.9,en-GB;q=0.8,en;q=0.7,no;q=0.6,nn;q=0.5,en-US;q=0.4",
//     "cache-control": "max-age=0",
//     "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "none",
//     "sec-fetch-user": "?1",
//     "upgrade-insecure-requests": "1",
//     "cookie": "phpbb3_qabj8_u=1; phpbb3_qabj8_k=; phpbb3_qabj8_sid=cc4b9ce4af4a3cea7b0c31d0ad071f81; _pk_id.1.934a=6b09690ab0aa2e02.1643145041.; _pk_ses.1.934a=1; cb-enabled=enabled"
//   },
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": null,
//   "method": "GET"
// });
function BKK(cragId) {
  const [weatherDataList, setWeatherDataList] = useState(null);
  const [showAdvancedForecast, setShowAdvancedForecast] = useState(false);
  
  useEffect(()=>{
    const url = 'https://cors-anywhere.herokuapp.com/https://ute.bergenklatreklubb.no/forere/cragdatabase/felt.php?Felt_id=' + cragId;
    const requestOptions = {
      method: 'GET',
      headers: {    
          'Accept': 'text/html',
          'Access-Control-Allow-Origin': '*' }}
    fetch(url, requestOptions)
      // .then(response => response.json())
      .then(function(result) {
        setWeatherDataList(result);
        return console.log(result);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <>
      <p>Bruker en proxy for å få data fra bergenklatreklubb. Her er link <a href="https://github.com/Rob--W/cors-anywhere/">https://github.com/Rob--W/cors-anywhere/</a>, du må spørre om access for at det funker fra din maksin!</p>
      <ListItem>
        <LocationName> {cragId} </LocationName>
      </ListItem>
    </>
  );
}

export default BKK;
