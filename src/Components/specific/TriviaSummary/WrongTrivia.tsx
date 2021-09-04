import React from 'react'
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { Trivia } from '../../../Interfaces/TriviaQuestion'
import TinyTrivia, { TinyTriviaProps } from '../TinyTrivia';

const WrongTrivia = (props: WrongTriviaProps) => {
  return (
    <Container>
      <Title>
        최근에 <span style={{color: "red"}}>틀린</span> 문제
      </Title>
      <TinyTrivia {...props} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 1rem;
`;

const Title = styled.div`
  font-family: ${Fonts.어그로체L};
  margin-left: 1rem;
  margin-bottom: 0.3rem;
`;

type WrongTriviaProps = TinyTriviaProps & {
  
};

export default WrongTrivia
