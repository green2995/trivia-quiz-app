import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import { RootState } from '../store';
import TriviaChat from '../Components/specific/TriviaChat';
import { categoriesSlice } from '../Store/trivia/categories/slice';
import TriviaPageTestIds from './Trivia/testid';

const Trivia = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const triviaState = useSelector((state: RootState) => state.trivia);
  const search = new URLSearchParams(location.search);
  const category = search.get("category");
  const matching = (() => {
    if (!triviaState.categories.data) return undefined;
    const existing = triviaState.categories.data.find((item) => item.name === category);
    return existing || {
      name: "Random",
      id: undefined,
    };
  })();

  React.useEffect(() => {
    if (!triviaState.categories.data) {
      dispatch(categoriesSlice.actions.loadCategories());
    }
  }, [])

  return (
    <Container data-testid={TriviaPageTestIds.container}>
      {matching !== undefined && (
        <TriviaChat category={matching} />
      )}
    </Container>
  )
}

const Container = styled.div`
  &::before {
    background: url("https://i.ibb.co/Df4HGyN/pattern.png");
    position: fixed;
    filter: blur(0.5rem);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    z-index: -1;
  }
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// type SearchQuery = {
//   category: string
// }

export default Trivia
