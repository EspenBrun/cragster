import React from 'react';
import styled from 'styled-components';


const NavBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 6rem;
  padding: 2rem;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Name = styled.p`
  color: #1499ff;
  font-size: 1.5em;
  margin-block-start: 0em;
  margin-block-end: 0em;

  @media (max-width: 640px) {
    font-size: 1.17em;
  }
`;

const Location = styled.p`
  color: #012541;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

const Header = () => { 
  return (
  <NavBarContainer>
    <Profile>
      <Name> Cragster </Name>
      <Location> Cool text about crags here </Location>
    </Profile>
  </NavBarContainer>
  );
};

export default Header;