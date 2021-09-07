import React from 'react'
import { useLocation } from 'react-router';
import styled from 'styled-components';
import TriviaPageTestIds from './Trivia/testid';
import TriviaChat from '../Components/specific/TriviaChat';
import { useGlobal } from '../State/Global/Global';
import { observer } from 'mobx-react';

const Trivia = observer(() => {
  const global = useGlobal();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const category = search.get("category");
  const matching = (() => {
    if (!global.categories.data) return undefined;
    const existing = global.categories.data.find((item) => item.name === category);
    return existing || {
      name: "Random",
      id: undefined,
    };
  })();

  React.useEffect(() => {
    if (!global.categories.data) {
      global.fetchCategories();
    }
  }, [])

  return (
    <Container data-testid={TriviaPageTestIds.container}>
      {matching !== undefined && (
        <TriviaChat category={matching} />
      )}
    </Container>
  )
})

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
  background-color: rgba(255,255,255,0.5);
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
