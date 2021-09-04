import _ from 'lodash'
import React from 'react'
import styled from 'styled-components';
import { Fonts } from '../../Constants';
import { useCurrent } from '../../Hooks/useCurrent';
import { Trivia } from '../../Interfaces/TriviaQuestion'

const TinyTrivia = (props: TinyTriviaProps) => {
  const choices = useCurrent(_.shuffle([...props.incorrect_answers, props.correct_answer]));

  function onClick(choice: string) {
    if (props.correct_answer === choice) {
      props.onPressCorrect();
    } else {
      props.onPressWrong();
    }
  }

  return (
    <Container>
      <Title>
        <span style={{ fontFamily: Fonts.어그로체B }}>Q. </span>{props.question}
      </Title>
      <ChoicesContainer>
        {choices.map((choice, i) => (
          <div>
            {(i > 0) && (
              <div style={{ height: 1, backgroundColor: "white" }} />
            )}
            <Choice onClick={onClick.bind(null, choice)} key={i}>
              {choice}
            </Choice>
          </div>
        ))}
      </ChoicesContainer>
    </Container>
  )
}

const Container = styled.div`
  user-select: none;
`;

const Title = styled.div`
  background-color: slategray;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  color: white;
`;

const ChoicesContainer = styled.div`
  background-color: lightgray;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
`;

const Choice = styled.div`
  font-family: ${Fonts.어그로체B};
  color: white;
  background-color: blue;
  padding: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: navy;
  }

  &:active {
    background-color: blueviolet;
  }
`;

export type TinyTriviaProps = Trivia & {
  onPressCorrect: () => void
  onPressWrong: () => void
}

export default TinyTrivia
