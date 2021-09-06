import React from 'react'
import _ from 'lodash'
import { a, useSpring } from '@react-spring/web';
import styled from 'styled-components';
import { Fonts } from '../../../Constants';
import { Trivia } from '../../../Interfaces/TriviaQuestion'
import { Flex } from '../../../Styled/Generic';

const TinyTrivia = (props: TinyTriviaProps) => {

  function onClick(choice: string) {
    props.onPressChoice(choice);
  }

  return (
    <Container>
      <Title>
        <Flex horizontal>
          <span style={{ fontFamily: Fonts.어그로체B, marginRight: "0.5rem" }}>Q.</span>{props.question}
        </Flex>
      </Title>
      <ChoicesContainer>
        {props.answers.map((choice, i) => {
          return (
            <div key={i}>
              {(i > 0) && (
                <div style={{ height: 1, backgroundColor: "white" }} />
              )}
              <SelectButton
                key={i}
                children={choice}
                shouldCareChosen={!!props.chosen}
                shouldCareCorrect={!!props.correct_answer}
                chosen={choice === props.chosen}
                correct={choice === props.correct_answer}
                // style={{backgroundColor, fontSize, color, cursor}}
                onClick={onClick.bind(null, choice)}
              />
            </div>
          )
        })}
      </ChoicesContainer>
    </Container>
  )
}

const Container = styled.div`
  user-select: none;
`;

const Title = styled.div`
  background-color: black;
  padding: 1rem;
  border-radius: 1rem 1rem 0 0;
  color: white;
`;

const ChoicesContainer = styled.div`
  background-color: lightgray;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
  box-shadow: 0 0.8rem 2rem 0 rgba(0,0,0,0.2);
`;

export const SelectButton = styled.button<{
  shouldCareChosen?: boolean
  shouldCareCorrect?: boolean
  chosen?: boolean
  correct?: boolean
  }>`
  outline: none;
  border: none;
  padding: 1rem;
  min-width: 100%;
  box-shadow: inset 0 0 0 0.5px white;
  color: white;
  cursor: pointer;
  font-family: ${Fonts.어그로체B};
  font-size: 1rem;
  transition-property: background-color, color, font-size;
  transition-duration: 100ms;
  /* height: 3rem; */
  
  &:active {
    transition: none;
  }
  
  ${({ shouldCareCorrect, shouldCareChosen, chosen, correct }) => {
    // not yet selected any
    if (!shouldCareChosen && !chosen) return `
    background-color: blue;
    // &:hover { background-color: navy; }
    &:active { background-color: blueviolet; }
    `;
  
    // selected some, but there's no correct answer
    if (shouldCareChosen && !shouldCareCorrect) {
      const backgroundColor = (() => {
        if (!chosen) return "grey";
        return "blue";
      })();
  
      const color = (() => {
        if (!chosen) return "lightgrey";
        return "auto";
      })();
  
      return `
      cursor: auto;
      background-color: ${backgroundColor};
      color: ${color};
      transition-duration: 1000ms;
      `;
    }
  
    // selected some, and there's correct answer
    if (shouldCareChosen && shouldCareCorrect) {
      const backgroundColor = (() => {
        if (correct) return "mediumseagreen";
        if (!chosen) return "grey";
        if (!correct) return "tomato";
      })();
  
      const color = (() => {
        if (correct) return "auto";
        if (!chosen) return "lightgrey";        
        return "auto";
      })();
  
      const boxShadow = (() => {
        if (correct) return `inset 0 0 1rem 0.1rem cyan`;
        if (!chosen) return "none";
        if (!correct) return `inset 0 0 1rem 0.1rem crimson`;
      })();
  
      return `
      cursor: auto;
      background-color: ${backgroundColor};
      color: ${color};
      transition-duration: 1000ms;
      font-size: ${correct ? 1.2 : 0.8}rem;
      box-shadow: ${boxShadow};
      `;
    }
  }}
  `;

export type TinyTriviaProps = Omit<Trivia, "incorrect_answers"> & {
  answers: string[];
  onPressChoice: (choice: string) => void;
  chosen?: string;
}

export default TinyTrivia
