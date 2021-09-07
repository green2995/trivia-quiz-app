import { observer } from 'mobx-react';
import React from 'react'
import styled from 'styled-components';
import CategoryList from '../Components/specific/CategoryList';
import TriviaSummary from '../Components/specific/TriviaSummary';
import { useGlobal } from '../State/Global/Global';

const Home = observer(() => {
  const global = useGlobal();

  React.useEffect(() => {
    if (!global.categories.data) {
      global.fetchCategories();
    }
  }, [])

  return (
    <Container>
      <ContentContainer>
        <TriviaSummary />
        {global.categories.data !== undefined && (
          <CategoryList items={global.categories.data} />
        )}
      </ContentContainer>
    </Container>
  )
})

const Container = styled.main`
  &::before {
    background: url("https://i.ibb.co/Df4HGyN/pattern.png");
    filter: blur(1rem);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
    z-index: -1;
  }

  background-color: rgba(255,255,255,0.7);
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10rem;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

export default Home
