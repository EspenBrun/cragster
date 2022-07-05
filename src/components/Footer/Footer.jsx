import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  padding: 1rem;
  color: #7B7E83;
  text-align: center;
  font-size: 0.8em;

  @media (max-width: 640px) {
    font-size: 0.7em;
  }
`;

const Footer = () => { 
  return (
    <Text> Read more on <a style= {{color: '#7B7E83'}} href="https://github.com/EspenBrun/cragster">GitHub</a></Text>
  );
};

export default Footer;