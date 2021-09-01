import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Fonts } from '../../Constants';

const Header = () => {
  return (
    <Container>
      <Link to={"/home"}>
        <Title>
          ConCon
        </Title>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  background-color: black;
  display: flex;
  height: 4rem;
  align-items: center;
  padding-left: 1rem;
`;

const Title = styled.div`
  font-family: ${Fonts.어그로체B};
  color: white;
  background-color: dodgerblue;
  width: min-content;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 2rem;
`;

export default Header
