import React from 'react'
import styled from 'styled-components';
import { TriviaFileSystem } from '../../System';
import TinyTrivia from './TriviaSummary/TinyTrivia';
import TriviaStat from './TriviaSummary/TriviaStat';
import TriviaSummrayReducer from './TriviaSummary/reducer';

const TriviaSummray = () => {
  const [state, dispatch] = React.useReducer(TriviaSummrayReducer.reducer, TriviaSummrayReducer.initialState);

  React.useEffect(() => {
    // TriviaFileSystem.clearAll();

    TriviaFileSystem.getInccorectAnswers().then((answers) => {
      dispatch(TriviaSummrayReducer.actions.setIncorrectAnswers(answers))
    });

    TriviaFileSystem.getTriviaResults().then((results) => {
      dispatch(TriviaSummrayReducer.actions.setTriviaResults(results))
    });
  }, [])

  return (
    <Container>
      <TriviaStat state={state} />
      <TinyTrivia type={"incorrect"} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1rem;
`;


export default TriviaSummray
