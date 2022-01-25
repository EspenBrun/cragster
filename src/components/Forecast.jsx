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

function Forecast(name, latitude, longitude, altitude) {
  const [weatherDataList, setWeatherDataList] = useState(null);
  const [showAdvancedForecast, setShowAdvancedForecast] = useState(false);
  
  useEffect(()=>{
    const url = 'https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=' + latitude + '&lon=' + longitude + '&altitude=' + altitude;
    fetch(url)
      .then(response => response.json())
      .then(function(result) {
        setWeatherDataList(result);
        return console.log(result)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <ListItem>
      <LocationName> {name} </LocationName>
    </ListItem>
  );
}

export default Forecast;
