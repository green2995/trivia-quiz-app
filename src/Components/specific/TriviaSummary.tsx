import React from 'react'
import styled from 'styled-components';
import { TriviaFileSystem } from '../../System';
import { TriviaSummarySlice } from './TriviaSummary/slice';
import TriviaStat from './TriviaSummary/TriviaStat';
import WrongTrivia from './TriviaSummary/WrongTrivia';

const TriviaSummray = () => {
  const [state, dispatch] = React.useReducer(TriviaSummarySlice.reducer, TriviaSummarySlice.initialState);

  React.useEffect(() => {
    // TriviaFileSystem.clearAll();

    TriviaFileSystem.getInccorectAnswers().then((answers) => {
      dispatch(TriviaSummarySlice.actions.setFailedTrivias(answers))
    });

    TriviaFileSystem.getTriviaResults().then((results) => {
      dispatch(TriviaSummarySlice.actions.setTriviaResults(results))
    });
  }, [])

  const trivia = state.failedTrivias[state.failedTriviaIndex]?.trivia;

  return (
    <Container>
      <TriviaStat triviaResults={state.triviaResults} />
      {trivia && (
        <WrongTrivia
          onPressCorrect={() => { }}
          onPressWrong={() => { }}
          {...trivia}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;


export default TriviaSummray
