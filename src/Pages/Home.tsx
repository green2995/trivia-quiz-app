import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import CategoryList from '../Components/specific/CategoryList';
import TriviaSummary from '../Components/specific/TriviaSummary';
import { categoriesSlice } from '../Store/trivia/categories/slice';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.trivia.categories);

  React.useEffect(() => {
    if (!categories.data) {
      dispatch(categoriesSlice.actions.loadCategories());
    }
  }, [])

  return (
    <Container>
      <ContentContainer>
        <TriviaSummary />
        {categories.data !== undefined && (
          <CategoryList items={categories.data} />
        )}
      </ContentContainer>
    </Container>
  )
}

const Container = styled.main`
  &::before {
    background: url("https://i.ibb.co/Df4HGyN/pattern.png");
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
