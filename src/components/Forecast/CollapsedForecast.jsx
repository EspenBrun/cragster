import React from 'react';
import styled from 'styled-components';

// Icons
import AngleRightIcon from './../../assets/icons/AngleRightIcon.svg';

// Weather symbols
const reqSvgs = require.context ( './../../assets/weather_symbols/', true, /\.svg$/ )
const paths = reqSvgs.keys ()
const svgs = paths.map( path => reqSvgs ( path ) )

const LocationName = styled.h4`
  color: white;
  padding: 0.2rem;
  width: 40%;
`;

const ForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
  width: 20%;
`;

const Time = styled.p`
  margin: 0.2rem 0rem 0rem 0.4rem;
  color: white;
  font-size: 0.8rem;
`;

const Symbol = styled.img`
  width: 2.5rem;
`;

const Temperature = styled.p`
  margin: 0.2rem 0rem 0rem 0.2rem;
  color: white;
`;

const StatusArrow = styled.img`
  width: 2rem;

  @media (max-width: 400px) {
    display: none;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

function getSymbolIndex(symbol_code) {
  return paths.findIndex(obj => obj === "./" + symbol_code + ".svg");
}

function CollapsedForecast(name, weatherDataList) {

  return (
    <RowWrapper>
      <LocationName> {name} </LocationName>
      {weatherDataList.properties.timeseries && weatherDataList.properties.timeseries.slice(2, 5).map((forecast, index) => (
        <ForecastContainer key={index}>
          <Time>
            {forecast.time.slice(11,13)}
          </Time>
          <RowWrapper>
            <Symbol src={svgs[getSymbolIndex(forecast.data.next_1_hours.summary.symbol_code)]}/>
            <Temperature  
              style={{color: Math.round(forecast.data.instant.details.air_temperature) <= 0 ? "#03A9F1" : "#E42C64"}}
            >
              {Math.round(forecast.data.instant.details.air_temperature)}°
            </Temperature>
          </RowWrapper>
        </ForecastContainer>
      ))}
      <StatusArrow src={AngleRightIcon}/>
    </RowWrapper>
  );
}

export default CollapsedForecast;
