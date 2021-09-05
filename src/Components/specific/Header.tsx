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
  display: flex;
  height: 3rem;
  align-items: center;
  padding-left: 1rem;
  /* border: 1px solid lightgrey; */
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: black;
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
  font-size: 0.8rem;
`;

export default Header
