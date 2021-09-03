import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '..';
import CategoryList from '../Components/specific/CategoryList';
import TriviaSummary from '../Components/specific/TriviaSummary';
import { categoriesSlice } from '../Store/trivia/categories/slice';

const Home = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.trivia.categories);

  React.useEffect(() => {
    if (categories.data === null) {
      dispatch(categoriesSlice.actions.loadCategories());
    }
  }, [])

  return (
    <Container>
      <ContentContainer>
        <TriviaSummary />
        {categories.data !== null && (
          <CategoryList items={categories.data} />
        )}
      </ContentContainer>
    </Container>
  )
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
`;

export default Home
